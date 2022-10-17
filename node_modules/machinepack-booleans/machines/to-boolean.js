module.exports = {


  friendlyName: 'Convert string to boolean',


  description: 'Convert the given string value to a boolean.',


  extendedDescription: 'This machine specifically converts the strings \'true\' and \'1\' to the boolean `true`, and the strings \'false\', \'0\' and \'\' (the empty string) to the boolean `false`.  All other string values will trigger an error.  To simply determine whether a given string is "truthy", use the `Is truthy?` machine.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    string: {
      description: 'The string to convert to a boolean.',
      example: 'foo',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Boolean',
      outputDescription: 'The value obtained by converting the input value to a boolean.',
      outputExample: true
    }

  },


  fn: function(inputs, exits) {

    // Return `true` through the `success` exit for "true" and "1".
    if (inputs.string === 'true' || inputs.string === '1') {
      return exits.success(true);
    }

    // Return `false` through the `success` exit for "false" and "0" and "".
    if (inputs.string === 'false' || inputs.string === '0' || inputs.string === '') {
      return exits.success(false);
    }

    // Otherwise thrown an error
    return exits.error(new Error('The given value could not be converted to a boolean.'));

  },



};
