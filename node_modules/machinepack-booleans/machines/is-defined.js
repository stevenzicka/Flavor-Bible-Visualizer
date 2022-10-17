module.exports = {


  friendlyName: 'Is defined?',


  description: 'Determine whether the value is defined.',


  extendedDescription: 'Returns `true` for any value other than `undefined`.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to check.',
      extendedDescription: 'A value of any type may be provided.  If it evaluates to `undefined`, the machine will return `false`.  Otherwise it will return `true`.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is defined?',
      outputDescription: 'A boolean indicating whether the input value is defined.',
      outputExample: true
    },

  },


  fn: function(inputs, exits, env) {

    // If the input valid is undefined, return `false` through the `success` exit.
    if (typeof(inputs.value) === 'undefined') {
      return exits.success(false);
    }

    // Otherwise return `true` through the `success` exit.
    return exits.success(true);
  }

};
