"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const name = "sample";

const schema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number
});

module.exports = (dbAdapter) => {
    return dbAdapter.getModel(name, schema);
}
