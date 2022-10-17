module.exports = {


  friendlyName: 'Is booleanish?',


  description: 'Determine whether a given string can be converted to a boolean.',


  extendedDescription: 'Returns `true` for the strings "0", "1", "true", "false" and the empty string ("").  Otherwise returns `false`.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    string: {
      description: 'The string to check.',
      example: 'true',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is numeric booleanish?',
      outputDescription: 'A boolean indicating whether the input string can be converted to a boolean.',
      outputExample: true
    },

  },

  fn: function(inputs, exits) {

    // Return `true` through the `success` exit for
    // "true" and "1", "false" and "0" and "".
    if (
      inputs.string === 'true' ||
      inputs.string === '1' ||
      inputs.string === 'false' ||
      inputs.string === '0' ||
      inputs.string === ''
    ) {
      return exits.success(true);
    }

    // Otherwise return `false` through the `success` exit.
    return exits.success(false);

  },



};
