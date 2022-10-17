module.exports = {


  friendlyName: 'Get minimum value',


  description: 'Return the smallest value in an array of numbers.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    numbers: {
      description: 'The array of numbers to return the smallest value of.',
      example: [123.45],
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Min value',
      outputDescription: 'The smallest number contained in the specified array.',
      outputExample: 123.45
    },

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Get the minimum value and return it through the `success` exit.
    return exits.success(_.min(inputs.numbers));

  },



};
