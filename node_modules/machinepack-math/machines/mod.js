module.exports = {


  friendlyName: 'Modulo (%)',


  description: 'Divide one number by another and return the remainder.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    a: {
      friendlyName: 'Dividend (first number)',
      description: 'The number to divide.',
      example: 10,
      required: true
    },

    b: {
      friendlyName: 'Divisor (second number)',
      description: 'The number to divide by.',
      example: 3,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Remainder',
      outputDescription: 'The value obtained by dividing input `a` by input `b`.',
      outputExample: 1
    },

    invalidDenominator: {
      description: 'The denominator was provided as 0, but computers haven\'t learned how to divide by zero (yet).'
    },


  },


  fn: function(inputs, exits) {

    // If the denominator is zero, return through the `invalidDenominator` exit.
    if (inputs.b === 0) {
      return exits.invalidDenominator();
    }

    // Divide the input `a` by input `b` and return the remainder
    // through the `success` exit.
    return exits.success(inputs.a % inputs.b);
  }


};
