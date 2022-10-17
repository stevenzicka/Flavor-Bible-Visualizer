module.exports = {


  friendlyName: 'Floor',


  description: 'Round a number down to a specified number of decimal places.',


  extendedDescription: 'Defaults to 0 decimal places, meaning that the number will be rounded down to the nearest whole number.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    number: {
      description: 'The number to return the floor of.',
      example: 123.99,
      required: true
    },
    precision: {
      friendlyName:'Number of decimal places',
      description: 'The number of decimal places to round down.',
      extendedDescription: 'Must be a non-negative integer.',
      example: 0,
      defaultsTo: 0
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Floor',
      outputDescription: 'The input number rounded down to the specified number of decimal places.',
      outputExample: 123
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
    return exits.success(_.floor(inputs.number, inputs.precision));
  },



};
