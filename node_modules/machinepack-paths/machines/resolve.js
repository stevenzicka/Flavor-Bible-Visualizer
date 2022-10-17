module.exports = {


  friendlyName: 'Resolve path',


  description: 'Resolve and normalize a potentially-relative path into an absolute path.',


  extendedDescription: 'The resulting path is also normalized, and trailing slashes are removed unless the path gets resolved to the root directory.',


  moreInfoUrl: 'https://nodejs.org/docs/latest/api/path.html#path_path_resolve_from_to',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    path: {
      description: 'The path to be resolved to an absolute path.',
      extendedDescription: 'If first path is not absolute, it will be resolved from the process\'s present working directory (`pwd`).',
      example: 'node_modules/sails/bin/sails.js',
      required: true
    },

    from: {
      description: 'The working directory to resolve from.',
      extendedDescription: 'If omitted, the result path will be resolved from the process\'s present working directory (`pwd`). '+
      'If `from` is not absolute, then it will first be resolved from the present working directory itself before being used to resolve `path`.',
      example: '/usr/local/lib'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Resolved path',
      outputDescription: 'An absolute path obtained by resolving and normalizing the input base and relative paths.',
      outputExample: '/usr/local/lib/node_modules/sails/bin/sails.js'
    }

  },


  fn: function (inputs,exits) {

    // Declare a var to hold the resolved path.
    var resolvedPath;

    // If `from` was provided, resolve `path` from it.
    // (if `from` is a relative path it will be resolved relative to pwd first).
    if (inputs.from) {
      resolvedPath = require('path').resolve(inputs.from, inputs.path);
    }
    // Otherwise, use pwd.
    else {
      resolvedPath = require('path').resolve(inputs.path);
    }

    // Return the resolved path through the `success` exit.
    return exits.success(resolvedPath);
  }


};
