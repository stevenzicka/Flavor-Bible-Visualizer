module.exports = {


  friendlyName: 'Natural logarithm (ln)',


  description: 'Calculate the natural logarithm of a number.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    number: {
      description: 'The number to calculate the natural log of.',
      example: 2.718281828459045,
      required: true
    }

  },


  exits: {

    success: {
      outputExample: 1,
      outputFriendlyName: 'Natural logarithm',
      outputDescription: 'The natural logarithm of the input number.'
    }

  },


  fn: function (inputs,exits) {

    // If the input is negative, return through the `invalidLog` exit.
    if (inputs.number <= 0) {
      return exits.error(new Error('Could not calculate the natural logarithm of the input number (because the input was a negative number).'));
    }

    // Calculate the natural log of the input number and return it
    // through the `success` exit.
    return exits.success(Math.log(inputs.number));

  },



};
