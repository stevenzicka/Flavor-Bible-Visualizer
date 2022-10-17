module.exports = {


  friendlyName: 'Or (||)',


  description: 'Get the result of performing a boolean OR operation on two values.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    a: {
      friendlyName: 'First value',
      description: 'The first value, which will be ORed to the second.',
      extendedDescription: 'A value of any type may be provided.',
      example: '==='
    },

    b: {
      friendlyName: 'Second value',
      description: 'The second value, which will be ORed to the first.',
      extendedDescription: 'A value of any type may be provided.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Result of OR',
      outputDescription: 'The value obtained from performing a boolean OR using the two provided inputs.',
      outputExample: true
    },

  },


  fn: function(inputs, exits) {

    // Cast the two values to booleans and OR the results,
    // passing the final result through the `success` exit.
    return exits.success(!!inputs.a || !!inputs.b);

  },



};
