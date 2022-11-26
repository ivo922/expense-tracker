const express = require('express');

/**
 * router is an instance of the express router.
 * We use it to define our routes.
 * The router will be added as a middleware and will take control of requests.
 */
const router = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// Google auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Get user by ID.
 * TODO: test delete
 */
router.route('/api/users/:id')
  .get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect.collection('users').findOne(query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  })
  .delete((req, response) => {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    db_connect.collection('users').deleteOne(query, function (err, obj) {
      if (err) throw err;
      console.log('1 document deleted');
      response.json(obj);
    });
  });

/**
 * Create user account.
 * TODO: test get
 */
router.route('/api/users/:id/accounts')
  .get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = {
      _id: ObjectId(req.params.id),
      projection: { accounts: 1 },
    };

    db_connect.collection('users').findOne(query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  })
  .post(function (req, response) {
    let db_connect = dbo.getDb();
    let query = { _id: ObjectId(req.params.id) };
    let values = {
      $push: {
        accounts: { _id: ObjectId(), ...req.body.account },
      },
    };

    // Update user by adding a new account.
    db_connect.collection('users').updateOne(query, values, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
    });

    // Get updated user.
    db_connect.collection('users').findOne(query, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
  });

/**
 * User account.
 * TODO: test get
 */
router.route('/api/users/:id/accounts/:accountId')
  .get(function (req, response) {
    let db_connect = dbo.getDb();
    let query = {
      _id: ObjectId(req.params.id),
      'accounts._id': ObjectId(req.params.accountId),
    };

    db_connect.collection('users').findOne(query, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
  })
  .put(function (req, response) {
    const db_connect = dbo.getDb();
    const users = db_connect.collection('users');

    const updatedAccount = {
      _id: ObjectId(req.params.accountId),
      name: req.body.name,
      balance: req.body.balance,
      categories: req.body.categories,
    }

    const query = {
      _id: ObjectId(req.params.id),
      'accounts._id': ObjectId(req.params.accountId),
    };
    const values = {
      $set: {
        'accounts.$': updatedAccount,
      },
    };

    // Update user account.
    users.updateOne(query, values, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
    });

    // Get updated user.
    db_connect.collection('users').findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
  })
  .delete(async (req, response) => {
    const db_connect = dbo.getDb();
    const users = db_connect.collection('users');

    const accountQuery = {
      _id: ObjectId(req.params.id),
      'accounts._id': ObjectId(req.params.accountId),
    };
    const userQuery = {
      _id: ObjectId(req.params.id),
    }
    const options = {
      $pull: {
        accounts: { _id: ObjectId(req.params.accountId) }
      }
    }

    try {
      // Delete account from user.
      await users.updateOne(accountQuery, options);

      // Get updated user.
      const result = await users.findOne(userQuery);

      response.json(result);
    } catch (error) {
      throw err;
    }
  });

/**
 * TODO:
 * Create user transactions by user ID.
 */
router.route('/api/users/create/transaction/:id')
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
 * TODO:
 * Updates transaction by ID and updates account balance.
 */
router.route('/api/users/update/transaction/:id')
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

    console.log(query, values, filters);

    // db_connect
    //   .collection('users')
    //   .updateOne(query, values, function (err, res) {
    //     if (err) throw err;
    //     console.log('1 document updated');
    //     response.json(res);
    //   });
  });

/**
 * Login/Register
 */
router.route('/api/v1/auth/google')
  .post(async (req, res) => {
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
              _id: ObjectId(),
              name: 'General',
              balance: 0,
              categories: {
                income: ['Salary', 'Loan', 'Other'],
                expense: [
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
