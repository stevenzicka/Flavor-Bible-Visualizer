module.exports = {


  friendlyName: 'Add (+)',


  description: 'Add two numbers together and return the sum.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    a: {
      friendlyName: 'Augend (first number)',
      description: 'The first number.',
      example: 2,
      required: true
    },

    b: {
      friendlyName: 'Addend (second number)',
      description: 'The second number.',
      example: 2.2,
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Sum',
      outputDescription: 'The sum of the two inputs.',
      outputExample: 4.2
    }

  },


  fn: function(inputs, exits) {

    // Add the two input numbers and return the result
    // through the `success` exit.
    return exits.success(inputs.a + inputs.b);

  }


};
