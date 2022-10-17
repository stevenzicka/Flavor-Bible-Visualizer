module.exports = {


  friendlyName: 'Home (~)',


  description: 'Get the absolute path to your home directory on this computer (OS-agnostic).',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {},


  exits: {

    success: {
      outputFriendlyName: 'Path to home dir',
      outputDescription: 'The path to the home directory.',
      outputExample: '/Users/mikermcneil'
    }

  },


  fn: function(inputs, exits) {

    // Import `path` module.
    var path = require('path');

    // Get the home directory from the environment, using the appropriate
    // environment variable for the current platform.
    var envVarToCheck;
    if (process.platform == 'win32') {
      envVarToCheck = 'USERPROFILE';
    }
    else {
      envVarToCheck = 'HOME';
    }
    var homeDirPath = process.env[envVarToCheck];

    // If our attempt to look up a home directory failed, throw a semantic error.
    if (!homeDirPath) {
      throw new Error('Could not determine the path to the home directory (tried to use the `'+envVarToCheck+'` environment variable).  If encountering this error when running within a child process, try passing in the absolute path to the home directory as the `'+envVarToCheck+'` environment variable when you spawn the child process (/execute the command).');
    }

    // Use the `path` package's `.resolve()` to get an OS-appropriate
    // absolute path for the home directory, and return it through
    // the `success` exit.
    return exits.success(
      require('path').resolve(homeDirPath)
    );
  },

};
