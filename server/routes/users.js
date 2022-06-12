const express = require('express');

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests.
const router = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// Google auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * TODO
 * Get all users.
 */
router.route('/api/users').get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection('users')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/**
 * * DONE
 * Get user by ID.
 */
router.route('/api/users/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db_connect.collection('users').findOne(query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

/**
 * TODO
 * Create user.
 */
router.route('/transaction/create/account/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let values = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection('users').insertOne(values, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

/**
 * TODO: separate update and create. Follow transactions example!
 * Update user accounts by user ID.
 */
router.route('/api/users/update/account/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  let values = {
    $set: {
      accounts: req.body.accounts,
    },
  };

  db_connect.collection('users').updateOne(query, values, function (err, res) {
    if (err) throw err;
    console.log('1 document updated');
    response.json(res);
  });
});

/**
 * * DONE
 * Update user transactions by user ID.
 */
router
  .route('/api/users/create/transaction/:id')
  .post(function (req, response) {
    let db_connect = dbo.getDb();
    let query = {
      _id: ObjectId(req.params.id),
      'accounts.name': req.body.newAccount.name,
    };
    let values = {
      $set: {
        'accounts.$.balance': req.body.newAccount.balance,
      },
      $push: {
        transactions: { _id: ObjectId(), ...req.body.transaction },
      },
    };

    db_connect
      .collection('users')
      .updateOne(query, values, function (err, res) {
        if (err) throw err;
        console.log('1 document updated');
        response.json(res);
      });
  });

/**
 * TODO: Not tested! Update accounts to use _id not name.
 * Updates transaction by ID and updates account balance.
 */
router
  .route('/api/users/update/transaction/:id')
  .post(function (req, response) {
    let db_connect = dbo.getDb();
    let query = {
      _id: ObjectId(req.params.id),
    };
    let values = {
      $set: {
        "accounts.$[account].balance": req.body.newAccount.balance,
        "transactions.$[transaction]": req.body.transactions // Not sure if this works because of _id
      },
      $push: {
        transactions: { _id: ObjectId(), ...req.body.transaction },
      },
    };

    let filters = {
      arrayFilters: [
        { "account": { name: req.body.newAccount.name } },
        { "transaction": { _id: req.body.transaction._id } },
      ],
    };

    // db_connect
    //   .collection('users')
    //   .updateOne(query, values, function (err, res) {
    //     if (err) throw err;
    //     console.log('1 document updated');
    //     response.json(res);
    //   });
  });

/**
 * TODO
 * Delete user by ID.
 */
router.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db_connect.collection('users').deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});

/**
 * * DONE
 * Login/Register
 */
router.route('/api/v1/auth/google').post(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  const db_connect = dbo.getDb();
  const query = { email };
  db_connect.collection('users').findOne(query, function (err, result) {
    if (err) throw err;

    // If the user exists - return it.
    if (!!result) {
      res.status(200);
      res.json(result);

      // If the user doesn't exist - create a new one with base template.
    } else {
      const newUser = {
        email,
        name,
        picture,
        accounts: [
          {
            name: 'General',
            balance: '0',
            categories: {
              deposit: ['Salary', 'Loan', 'Other'],
              withdrawal: [
                'Food',
                'Entertainment',
                'Car',
                'Health',
                'Education',
                'Clothing',
                'Other',
              ],
            },
          },
        ],
        transactions: [],
      };

      db_connect.collection('users').insertOne(newUser, function (err, result) {
        if (err) throw err;
        res.status(201);
        res.json(result);
      });
    }
  });
});

module.exports = router;
