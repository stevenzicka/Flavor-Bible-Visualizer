module.exports = {


  friendlyName: 'Sum',


  description: 'Calculate the sum of an array of numbers.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    numbers: {
      description: 'The array of numbers to calculate the sum of.',
      example: [123.45],
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Sum',
      outputDescription: 'The sum of the numbers contained in the specified array.',
      outputExample: 123.45
    },

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Calculate the sum and return it through the `success` exit.
    return exits.success(_.sum(inputs.numbers));

  },



};
