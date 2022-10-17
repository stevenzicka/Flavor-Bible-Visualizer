module.exports = {


  friendlyName: 'Generate random number',


  description: 'Generate a random number within the specified range.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    min: {
      friendlyName: 'Minimum value (>=)',
      example: 1,
      description: 'The minimum acceptable number to generate.',
      defaultsTo: 0
    },

    max: {
      friendlyName: 'Maximum value (<=)',
      example: 1,
      description: 'The maximum acceptable number to generate.',
      defaultsTo: 1
    },

    floating: {
      friendlyName: 'Floating point?',
      description: 'Whether or not the generated number should be a floating point number (decimal).',
      defaultsTo: false,
      example: true
    }

  },


  exits: {

    success: {
      outputExample: 1,
      outputFriendlyName: 'Random number',
      outputDescription: 'A randomly generated number.'
    }

  },


  fn: function (inputs, exits) {

    var _ = require('lodash');

    // If `inputs.floating` is false, ensure that the `start` and `end`
    // inputs are rounded down to whole numbers to avoid inadvertently
    // enabling floating-point results. (because by default, _.random()
    // will understand floating-point `min` or `max`, indicating a license
    // to make the result floating-point, which we've decided to make more
    // explicit here).
    if (!inputs.floating) {
      inputs.min = Math.floor(inputs.min);
      inputs.max = Math.floor(inputs.max);
    }

    // Generate a random number using the given constraints.
    var result = _.random(inputs.min, inputs.max, inputs.floating);

    // Return the number through the `success` exit.
    return exits.success(result);
  }


};
