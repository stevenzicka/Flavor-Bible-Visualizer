module.exports = {


  friendlyName: 'Copy dictionary key',


  description: 'Copy a key in a dictionary (giving it a new name) and return the result (a new dictionary).',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary within which the key will be copied.',
      example: {},
      required: true
    },

    originalKey: {
      friendlyName: 'Existing key',
      description: 'The name of the existing key whose value will be copied.',
      example: 'githubUsername',
      required: true,
      constant: true
    },

    newKey: {
      description: 'The name for the new key.',
      example: 'twitterUsername',
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
      outputFriendlyName: 'Dictionary with copied key',
      outputDescription: 'The destination dictionary, with the specified key from the source dictionary added.',
      getExample: function (inputs, env){
        var _ = env._;

        // If `dictionary` is not available yet, the best we can do is set the
        // exit example to `{}`, since we don't have enough information.
        if (_.isUndefined(inputs.dictionary)) {
          return {};
        }

        // If `originalKey` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // we don't know what type of value the original key had.
        if (_.isUndefined(inputs.originalKey)) {
          return {};
        }

        // If `newKey` is not available yet, the best we can do is set exit example
        // to `{}` because, although we know the initial properties of the dictionary,
        // and which key is being copied, we don't know the name of the key to add.
        if (_.isUndefined(inputs.newKey)) {
          return {};
        }

        // If `dictionary[originalKey]` is undefined, we aren't sure yet what type
        // it will be, so we don't know what type to make the new value, which means
        // the best we can do is send back a `{}`.  It's also possible `noSuchKey` will
        // trigger instead.
        if (_.isUndefined(inputs.dictionary[inputs.originalKey])) {
          return {};
        }

        // If `force` is true, we know for sure that the new key will exist, even
        // if there is an old key in the way.
        if (inputs.force) {
          inputs.dictionary[inputs.newKey] = inputs.dictionary[inputs.originalKey];
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

    // First, try to the value of the key we're trying to copy.
    var value = inputs.dictionary[inputs.originalKey];

    // If it doesn't exist in the input dictionary, return through the
    // `noSuchKey` exit.
    if (_.isUndefined(value)) {
      return exits.noSuchKey();
    }

    // If the `force` option is not specified, and a key with the specified
    // `newKey` name already exists, return through the `keyAlreadyExits` exit.
    var force = _.isUndefined(inputs.force) ? true : inputs.force;
    if (!force && !_.isUndefined(inputs.dictionary[inputs.newKey])) {
      return exits.keyAlreadyExists();
    }

    // Add the new key, using the value from the key we're copying.
    inputs.dictionary[inputs.newKey] = value;

    // Return the new dictionary through the `success` exit.
    return exits.success(inputs.dictionary);
  }

};
