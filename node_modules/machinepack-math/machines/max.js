module.exports = {


  friendlyName: 'Get maximum value',


  description: 'Return the largest value in an array of numbers.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    numbers: {
      description: 'The array of numbers to return the largest value of.',
      example: [123.45],
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Max value',
      outputDescription: 'The largest number contained in the specified array.',
      outputExample: 123.45
    },

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Get the max value and return it through the `success` exit.
    return exits.success(_.max(inputs.numbers));

  },



};
