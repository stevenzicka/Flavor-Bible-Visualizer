module.exports = {


  friendlyName: 'Is undefined?',


  description: 'Determine whether the value is undefined.',


  extendedDescription: 'Returns `false` for any value other than `undefined`.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to check.',
      extendedDescription: 'A value of any type may be provided.  If it evaluates to `undefined`, the machine will return `true`.  Otherwise it will return `false`.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is undefined?',
      outputDescription: 'A boolean indicating whether the input value is undefined.',
      outputExample: true
    },

  },


  fn: function(inputs, exits, env) {

    // If the input valid is undefined, return `true` through the `success` exit.
    if (typeof(inputs.value) === 'undefined') {
      return exits.success(true);
    }

    // Otherwise return `false` through the `success` exit.
    return exits.success(false);
  }

};
