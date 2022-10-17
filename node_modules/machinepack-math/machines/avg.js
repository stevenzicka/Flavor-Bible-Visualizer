module.exports = {


  friendlyName: 'Average',


  description: 'Calculate the average (mean value) of an array of numbers.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    numbers: {
      description: 'The array of numbers to calculate the average of.',
      example: [123.45],
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Average',
      outputDescription: 'The average (mean value) of the numbers contained in the specified array.',
      outputExample: 123.45
    },

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // If the input array is empty, then return an average of 0
    // through the `success` exit.
    if (inputs.numbers.length === 0) {
      return exits.success(0);
    }

    // Calculate the average and return it through the `success` exit.
    return exits.success(_.sum(inputs.numbers) / inputs.numbers.length);

  },



};
