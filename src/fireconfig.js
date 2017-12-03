  var firebase = require('firebase/app')
  require('firebase/auth')
  require('firebase/database')

  var config = {
    apiKey: 'AIzaSyAbnWoOY5MpD7U0kVH9R0gGjj8LdSMPjEY',
    authDomain: 'team-sprite-project.firebaseapp.com',
    databaseURL: 'https://team-sprite-project.firebaseio.com',
    projectId: 'team-sprite-project',
    storageBucket: '',
    messagingSenderId: '716422527835'
  }
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

  module.exports = firebase.app()
