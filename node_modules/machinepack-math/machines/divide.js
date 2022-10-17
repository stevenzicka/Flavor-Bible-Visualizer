module.exports = {


  friendlyName: 'Divide (÷)',


  description: 'Divide one number by another and return the quotient.',


  extendedDescription: 'Note that this is **not** integer division-- e.g. `5/2` will result in `2.5`, not `2`.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    a: {
      friendlyName: 'Numerator (first number)',
      description: 'The number to divide (aka "dividend").',
      example: 5,
      required: true
    },

    b: {
      friendlyName: 'Denominator (second number)',
      description: 'The number to divide by (aka "divisor").',
      example: -2,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Quotient',
      outputDescription: 'The value obtained by dividing input `a` by input `b`.',
      outputExample: -2.5
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

    // Divide the input `a` by input `b` and return the result
    // through the `success` exit.
    return exits.success(inputs.a / inputs.b);
  }


};
