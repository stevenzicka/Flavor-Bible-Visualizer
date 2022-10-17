module.exports = {


  friendlyName: 'Join paths',


  description: 'Combine multiple path segments into a single result path.',


  extendedDescription: 'This machine returns "." for an empty array of paths.',


  moreInfoUrl: 'https://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    paths: {
      description: 'The paths to join, in left-to-right order.',
      example: [ 'lib/node_modules' ],
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Joined path',
      outputDescription: 'The combined path.',
      outputExample: 'lib/node_modules/sails/bin/sails.js'
    }

  },


  fn: function (inputs,exits) {

    // Import `path`.
    var Path = require('path');

    // Since "join" takes the paths to join as a variable number of arguments,
    // we'll use `apply` to feed our array of strings in.
    var joinedPath = Path.join.apply(Path, inputs.paths);

    // Return the resulting path through the `success` exit.
    return exits.success(joinedPath);

  }


};
