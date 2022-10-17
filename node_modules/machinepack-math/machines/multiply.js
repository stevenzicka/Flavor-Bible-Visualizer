module.exports = {


  friendlyName: 'Multiply (✕)',


  description: 'Multiply two numbers and return the product.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    a: {
      friendlyName: 'Multiplicand (first number)',
      description: 'The first number.',
      example: 2,
      required: true
    },

    b: {
      friendlyName: 'Multiplier (second number)',
      description: 'The second number.',
      example: -10,
      required: true
    }

  },


  exits: {

    success: {
      outputDescription: 'The result of multiplying inputs `a` and `b`.',
      outputFriendlyName: 'Product',
      outputExample: -20
    }

  },


  fn: function(inputs, exits) {

    // Multiply the two inputs and return the result through
    // the `success` exit.
    return exits.success(inputs.a*inputs.b);

  }



};
