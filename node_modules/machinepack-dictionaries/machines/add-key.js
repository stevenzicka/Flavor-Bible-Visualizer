module.exports = {


  friendlyName: 'Add new dictionary key',


  description: 'Add a new key to a dictionary.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary to which the new key will be added.',
      example: {},
      required: true
    },

    newKey: {
      description: 'The name for the new key.',
      example: 'twitterUsername',
      required: true,
      constant: true
    },

    value: {
      description: 'The value to associate with the new key.',
      example: '*',
      required: true
    },

    force: {
      friendlyName: 'Overwrite?',
      description: 'Whether to overwrite an existing key with the same name if there is a conflict.',
      example: true,
      defaultsTo: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Dictionary with key added',
      outputDescription: 'The result of adding the specified key to the given dictionary.',
      getExample: function (inputs, env){
        var _ = env._;

        // If no `dictionary` or `newKey` is available yet, the best we can do
        // is set the exit example to `{}`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary) || _.isUndefined(inputs.newKey)) {
          return {};
        }

        // If `force` is undefined, we aren't sure yet whether or not the new key
        // will replace the old.  So whether or not an old key exists, we must fall
        // back to sending down a `{}` (because the old key/value could have fallen
        // back to `undefined` because it was indeterminate, which means it MIGHT be
        // there)
        if (_.isUndefined(inputs.force)) {
          return {};
        }

        // If `value` is undefined, we aren't sure yet what type it will be, so
        // the best we can do is send back a `{}`.
        if (_.isUndefined(inputs.value)) {
          return {};
        }

        // If `force` is true, we know for sure that the new key will exist, even
        // if there is an old key in the way.
        if (inputs.force) {
          inputs.dictionary[inputs.newKey] = inputs.value;
          return env.rttc.coerceExemplar(inputs.dictionary, false, false, true);
        }

        // If force is `false` and the key DOES NOT already exist, we may think the
        // resulting dictionary will have the new key value, but it is also possible
        // that the existing value at that key is just not available yet either.
        // So the best we can do is send back `{}`.
        if (!inputs.force && _.isUndefined(inputs.dictionary[inputs.newKey])) {
          return {};
        }

        // If force is `false` and the key already exists, this exit should
        // not be traversed, so we don't need to worry about it.
        return;
      }
    },


    keyAlreadyExists: {
      description: 'An existing key in the input dictionary was already using the specified name for the new key.',
      extendedDescription: 'You can force this machine to overwrite the existing key by enabling the `force` input.'
    },


  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // If the "force" option isn't used, and there is already a kew with the
    // specified name, return through the `keyAlreadyExists` exit.
    if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }

    // Otherwise add the new key/value pair and return the resulting dictionary
    // through the `success` exit.
    inputs.dictionary[inputs.newKey] = inputs.value;
    return exits.success(inputs.dictionary);

  }

};
