module.exports = {


  friendlyName: 'Exponent (^)',


  description: 'Raise a number to a power.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    number: {
      description: 'The number to raise to a power.',
      example: 8,
      required: true
    },

    exponent: {
      description: 'The exponent to raise the other number to.',
      example: 2,
      required: true
    }

  },


  exits: {

    success: {
      outputExample: 64,
      outputFriendlyName: 'Exponential result',
      outputDescription: 'The value obtained by raising the input number to the specified power.'
    },

    imaginary: {
      outputFriendlyName: 'Imaginary factor',
      outputExample: 8,
      outputDescription: 'The number which, if multiplied by √-1, would represent the number raised to the specified fractional power.',
      description: 'Could not calculate a real result for a negative number raised to a fractional exponent, so an imaginary result was returned instead.'
    },

  },


  fn: function (inputs,exits) {

    // If the number is negative, and it's being raised to a
    // fractional power, we'll calculate the imaginary factor instead.
    if (inputs.number < 0 && Math.floor(inputs.exponent) !== inputs.exponent) {
      // Return the imaginary factor through the `imaginary` exit.
      return exits.imaginary(Math.pow(-1*inputs.number, inputs.exponent));
    }

    // Otherwise raise the number to the specified power and return the result
    // through the `success` exit.
    return exits.success(Math.pow(inputs.number, inputs.exponent));

  },



};
