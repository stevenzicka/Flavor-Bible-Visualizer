module.exports = {


  friendlyName: 'Rename dictionary key',


  description: 'Rename a key in a dictionary and return the result (a new dictionary).',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary to rename the key in.',
      example: {},
      required: true
    },

    originalKey: {
      description: 'The key to rename.',
      example: 'studentName',
      required: true,
      constant: true
    },

    newKey: {
      description: 'The new name for the key.',
      example: 'studentFullName',
      required: true,
      constant: true
    },

    force: {
      friendlyName: 'Overwrite?',
      description: 'Whether to overwrite an existing key with the same name if there is a conflict.',
      example: true,
      defaultsTo: true,
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Dictionary with renamed key',
      outputDescription: 'The input dictionary with the specifed key renamed.',
      getExample: function (inputs, env){

        var _ = env._;

        // If `dictionary` is not available yet, the best we can do is set the
        // exit example to `{}`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary)) {
          return {};
        }

        // If `originalKey` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // we don't know which key will be replaced in the results.
        if (_.isUndefined(inputs.originalKey)) {
          return {};
        }

        // If `newKey` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // and which key is being removed, we don't know the name of the key to add.
        if (_.isUndefined(inputs.newKey)) {
          return {};
        }

        // If `dictionary[originalKey]` is undefined, we aren't sure yet what type
        // it will be, so we don't know what value to make the new type, which means
        // the best we can do is send back a `{}`.  It's also possible `noSuchKey` will
        // trigger instead.
        if (_.isUndefined(inputs.dictionary[inputs.originalKey])) {
          return {};
        }

        // If `force` is true, we know for sure that the new key will exist, even
        // if there is an old key in the way.
        if (inputs.force) {
          inputs.dictionary[inputs.newKey] = inputs.dictionary[inputs.originalKey];
          delete inputs.dictionary[inputs.originalKey];
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

    noSuchKey: {
      description: 'No key with the specified name could be found in the input dictionary.'
    },

    keyAlreadyExists: {
      description: 'An existing key in the input dictionary was already using the specified name for the new key.',
      extendedDescription: 'You can force this machine to overwrite the existing key by enabling the `force` input.'
    },

  },


  fn: function(inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Try to find the value of the key we're trying to rename.
    var value = inputs.dictionary[inputs.originalKey];

    // If we can't find it, leave through the `noSuchKey` exit.
    if (_.isUndefined(value)) {
      return exits.noSuchKey();
    }

    // Delete the key we're trying to rename.
    delete inputs.dictionary[inputs.originalKey];

    // If `force` is not set, and there is an existing key with the name that
    // we want to rename our original key to, then leave through the `keyAlreadyExists` exit.
    if (!inputs.force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }

    // Otherwise set the new key name to the old key's value, and return the
    // resulting dictionary through the `success` exit.
    inputs.dictionary[inputs.newKey] = value;
    return exits.success(inputs.dictionary);
  }

};
