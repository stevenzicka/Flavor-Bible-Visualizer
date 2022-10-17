module.exports = {


  friendlyName: 'Ceiling',


  description: 'Round a number up to a specified number of decimal places.',


  extendedDescription: 'Defaults to 0 decimal places, meaning that the number will be rounded up to the next whole number if it has any fractional component.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    number: {
      description: 'The number to return the ceiling of.',
      example: 123.01,
      required: true
    },

    precision: {
      friendlyName:'Number of decimal places',
      description: 'The number of decimal places to round up.',
      extendedDescription: 'Must be a non-negative integer.',
      example: 0,
      defaultsTo: 0
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Ceiling',
      outputDescription: 'The input number rounded up to the specified number of decimal places.',
      outputExample: 124
    }

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // If the precision is negative or not a whole number, return through the `invalidPrecision` exit.
    if (inputs.precision < 0 || (Math.floor(inputs.precision) !== inputs.precision)) {
      return exits.error(new Error('The specified number of decimal places was invalid.'));
    }

    // Calculate the ceiling of the input number to the specified precision
    // and return it through the `success` exit.
    return exits.success(_.ceil(inputs.number, inputs.precision));
  },



};
