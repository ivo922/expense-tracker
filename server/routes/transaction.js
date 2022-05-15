const express = require('express');

// transactionRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /transaction.
const transactionRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

/**
 * Get all transactions.
 */
transactionRoutes.route('/transaction').get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection('transactions')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

/**
 * Get transaction by ID.
 */
transactionRoutes.route('/transaction/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db_connect.collection('transactions').findOne(query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

/**
 * Create transaction.
 */
transactionRoutes.route('/transaction/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let values = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection('transactions').insertOne(values, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

/**
 * Update transaction by ID.
 */
transactionRoutes.route('/update/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  let values = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };

  db_connect
    .collection('transactions')
    .updateOne(query, values, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
    });
});

/**
 * Delete transaction by ID.
 */
transactionRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db_connect.collection('transactions').deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});

module.exports = transactionRoutes;
