const GOOGLEAUTHCLIENTID = '61421899850-j9nl3fql5kqbj2ffruom3hs10mghhesm.apps.googleusercontent.com'
const GOOGLEAUTHCLIENTSECRET = 'sUUPyRPeY6g1POhrS3O7KfzS'
const DBRUI = 'mongodb://admin:admin@ds237855.mlab.com:37855/lionbooksdatabase'

const express = require('express');
const app  = express()
const port = 8080
const bodyParser  = require('body-parser')
//const mongodb = require('mongodb');
//const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./htmlcss'))
app.listen(port)
console.log('listening on port: ', port);
