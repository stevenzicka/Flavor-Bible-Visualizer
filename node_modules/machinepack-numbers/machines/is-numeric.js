module.exports = {


  friendlyName: 'Is numeric string?',


  description: 'Determine whether a given string can be safely converted to a number.',


  extendedDescription: 'Returns `true` for any string that can be converted to a number (e.g. "123.45", "-5" and "1.23e+75").  Otherwise returns `false`.  Also returns false for "+Infinity" and "-Infinity".',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    string: {
      description: 'The string to check.',
      example: '123.45',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is numeric string?',
      outputDescription: 'Whether or not the input string is numeric.',
      outputExample: true
    },

  },


  fn: function(inputs, exits) {

    // Attempt to convert the input value to a number.
    var converted = +inputs.string;

    // If the result is NaN, Infinity or -Infinity, return `false` through the `success` exit.
    if (isNaN(converted) || converted === Infinity || converted === -Infinity) {
      return exits.success(false);
    }

    // Otherwise return `true` through the `success` exit.
    return exits.success(true);

  },



};
