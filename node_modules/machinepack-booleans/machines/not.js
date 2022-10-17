module.exports = {


  friendlyName: 'Not (!)',


  description: 'Get the result of performing a boolean NOT operation on a value.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to be negated.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Result of NOT',
      outputDescription: 'The value obtained from performing a boolean NOT on the provided input.',
      outputExample: true
    },

  },


  fn: function(inputs, exits) {

    // Negate the value and return the result through the `success` exit.
    return exits.success(!inputs.value);

  },



};
