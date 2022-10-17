module.exports = {


  friendlyName: 'Logarithm (log)',


  description: 'Calculate the logarithm of a number at a particular base.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    number: {
      description: 'The number to calculate the log of.',
      example: 100,
      required: true
    },

    base: {
      description: 'The base of the logarithm.',
      example: 10,
      defaultsTo: 10
    }

  },


  exits: {

    success: {
      outputExample: 2,
      outputFriendlyName: 'Logarithm',
      outputDescription: 'The logarithm of the input value.'
    }

  },


  fn: function (inputs,exits) {

    // If the input is negative, return through the `invalidLog` exit.
    if (inputs.number <= 0) {
      return exits.error(new Error('Could not calculate the logarithm of the input number (because the input was a negative number).'));
    }

    // If the base is negative or 1, return through the `invalidBase` exit.
    if (inputs.base <= 0 || inputs.base === 1) {
      return exits.error(new Error('The `base` value was invalid (it must be a positive number and not 1).'));
    }

    // Calculate the log of the number at the given base and return it
    // through the `success` exit.
    return exits.success(Math.log(inputs.number) / Math.log(inputs.base));

  },


};
