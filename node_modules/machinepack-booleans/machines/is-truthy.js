module.exports = {


  friendlyName: 'Is truthy?',


  description: 'Determine whether the value is "truthy".',


  extendedDescription: 'In Javascript, all values besides `0`, `null`, `undefined`, `false`, `NaN` and the empty string are "truthy".',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to check.',
      extendedDescription: 'A value of any type may be provided.  If it is a truthy value, the machine will return `true`.  Otherwise it will return `false`.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is truthy?',
      outputDescription: 'A boolean indicating whether the input value is truthy.',
      outputExample: true
    },

  },


  fn: function(inputs, exits, env) {

    // If the input valid is truthy, return `true` through the `success` exit.
    if (inputs.value) {
      return exits.success(true);
    }

    // Otherwise return `false` through the `success` exit.
    return exits.success(false);
  }

};
