module.exports = {


  friendlyName: 'Has key?',


  description: 'Check that a dictionary contains a value at the specified key path.',


  extendedDescription: 'This machine will return `true` regardless of the _value_ assigned to the key at the specified path.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary to check.',
      example: {},
      required: true
    },

    keyPath: {
      description: 'The key path to check for in the input dictionary.',
      extendedDescription: 'Use dots to specify a deep key path (like `address.city`).',
      example: 'address.city',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Has key?',
      outputExample: true,
      outputDescription: 'A boolean indicating whether the specified key path exists in the input dictionary.'
    },

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Look for the key path in the input dictionary.
    var keyPathExists = _.has(inputs.dictionary, inputs.keyPath);

    // Return the boolean indicating whether the key path exists through the `success` exit.
    return exits.success(keyPathExists);

  },



};
