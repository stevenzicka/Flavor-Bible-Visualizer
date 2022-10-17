module.exports = {


  friendlyName: 'Is falsy?',


  description: 'Determine whether the value is "falsy".',


  extendedDescription: 'In Javascript, only the values `0`, `null`, `undefined`, `false`, `NaN` and the empty string are "falsy".',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to check.',
      extendedDescription: 'A value of any type may be provided.  If it is a falsy value, the machine will return `true`.  Otherwise it will return `false`.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is falsy?',
      outputDescription: 'A boolean indicating whether the input value is falsy.',
      outputExample: true
    },

  },


  fn: function(inputs, exits, env) {

    // If the input valid is falsy, return `true` through the `success` exit.
    if (!inputs.value) {
      return exits.success(true);
    }

    // Otherwise return `false` through the `success` exit.
    return exits.success(false);
  }

};
