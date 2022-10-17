module.exports = {


  friendlyName: 'If...',


  description: 'Create a code branch, following "Success" if the value is truthy, otherwise "Else".',


  extendedDescription: 'The \'success\' exit will be triggered for any "truthy" value (everything except `0`, `\'\'`, `null`, `false`, `NaN` and `undefined`).',


  sideEffects: 'cacheable',


  sync: true,


  moreInfoUrl: 'https://www.sitepoint.com/javascript-truthy-falsy/',


  inputs: {

    value: {
      description: 'The value to check.',
      extendedDescription: 'A value of any type may be provided.  If it is "truthy", the \'success\' exit will be triggered.  Otherwise the \'otherwise\' exit will be triggered.',
      example: '===',
      required: true
    }

  },


  exits: {

    success: {
      description: 'The specified value was "truthy".',
    },

    otherwise: {
      friendlyName: 'Else',
      description: 'The specified value was "falsey".'
    }

  },


  fn: function(inputs, exits, env) {

    // If the input value is truthy, trigger the `success` exit.
    if (inputs.value) {
      return exits.success();
    }

    // Otherwise trigger the `otherwise` exit.
    return exits.otherwise();
  }

};
