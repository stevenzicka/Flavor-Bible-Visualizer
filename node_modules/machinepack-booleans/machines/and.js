module.exports = {


  friendlyName: 'And (&&)',


  description: 'Get the result of performing a boolean AND operation on two values.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    a: {
      friendlyName: 'First value',
      description: 'The first value, which will be ANDed to the second.',
      extendedDescription: 'A value of any type may be provided.',
      example: '==='
    },

    b: {
      friendlyName: 'Second value',
      description: 'The second value, which will be ANDed to the first.',
      extendedDescription: 'A value of any type may be provided.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Result of AND',
      outputDescription: 'The value obtained from performing a boolean AND using the two provided inputs.',
      outputExample: true
    },

  },


  fn: function(inputs, exits) {

    // Cast the two values to booleans and AND the results,
    // passing the final result through the `success` exit.
    return exits.success(!!inputs.a && !!inputs.b);

  },



};
