module.exports = {


  friendlyName: 'Subtract (-)',


  description: 'Subtract one number from another and return the difference.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    a: {
      friendlyName: 'Minuend (first number)',
      description: 'The number to subtract from.',
      example: -20,
      required: true
    },

    b: {
      friendlyName: 'Subtrahend (second number)',
      description: 'The number to subtract.',
      example: 2.2,
      required: true
    }

  },


  exits: {

    success: {
      outputDescription: 'The value obtained by subtracting input `b` from input `a`.',
      outputFriendlyName: 'Difference',
      outputExample: -22.2
    }

  },


  fn: function(inputs, exits) {

    // Subtract input `b` from input `a` and return the result
    // through the `success` exit.
    return exits.success(inputs.a - inputs.b);
  }


};
