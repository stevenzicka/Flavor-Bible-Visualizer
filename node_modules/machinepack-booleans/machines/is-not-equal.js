module.exports = {


  friendlyName: 'Is not equal? (!==)',


  description: 'Determine whether the first value is not equivalent to the second.',


  extendedDescription: 'Note that this machine performs a deep equality check by value.  That is, it doesn\'t care about memory addresses or things like that-- it\'s only interested in the actual semantic value of the data.  Basically, this is like what you would get if you stringified two JSON values and compared the resulting strings.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    a: {
      friendlyName: 'First value',
      description: 'The first value to check (expected to not be equal to the second).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    },

    b: {
      friendlyName: 'Second value',
      description: 'The second value to check (expected to not be equal to the first).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is not equal?',
      outputExample: true,
      outputDescription: 'A boolean indicating whether the first value is not equal to the second.'
    }

  },


  fn: function(inputs, exits, env) {

    // Import `lodash`.
    var _ = require('lodash');

    // If the two input values are semantically equal, return `false`
    // through the `success` exit.
    if (_.isEqual(inputs.a, inputs.b)) {
      return exits.success(false);
    }

    // Otherwise return `true` through the `success` exit.
    return exits.success(true);
  }

};
