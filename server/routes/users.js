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
 * Get all users.
 */
router.route('/api/user').get(function (req, res) {
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
 * Get transaction by ID.
 */
router.route('/api/user/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db_connect.collection('users').findOne(query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

/**
 * Create transaction.
 */
router.route('/transaction/add').post(function (req, response) {
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
 * Update transaction by ID.
 */
router.route('/update/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  let values = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };

  db_connect.collection('users').updateOne(query, values, function (err, res) {
    if (err) throw err;
    console.log('1 document updated');
    response.json(res);
  });
});

/**
 * Delete transaction by ID.
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
 * Login
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
