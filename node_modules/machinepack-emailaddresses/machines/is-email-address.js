module.exports = {


  friendlyName: 'Is email address?',


  description: 'Determine whether or not the provided string is a valid email address.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    string: {
      example: 'foo@foobar.com',
      description: 'The candidate email address to validate.',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is valid email address?',
      outputDescription: 'Whether the provided string was a valid email address.',
      outputExample: true
    }

  },


  fn: function (inputs,exits) {

    // Import `validator`.
    var Validator = require('validator');

    // If the input string validates as an email, return `true`
    // through the `success` exit.
    if (Validator.isEmail(inputs.string)) {
      return exits.success(true);
    }

    // Otherwise return `false` through the `success` exit.
    return exits.success(false);

  },



};
