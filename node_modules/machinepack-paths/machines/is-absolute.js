module.exports = {


  friendlyName: 'Is path absolute?',


  description: 'Determine whether or not a path is absolute.',


  extendedDescription: 'An absolute (or "full") path points to the same location in a file system regardless of the current working directory (e.g. "/usr/local/foo.zip"). To do that, it must contain the root directory (`/`).  By contrast, a relative path starts from some given working directory, avoiding the need to provide the full absolute path (e.g. "foo/thumb.png" or "./bon-jovi.mov" or "../../hardcore.midi".)  The same principle applies when considering URL paths-- except that, instead of the root directory, they\'re absolute in the context of the web root ("/") or a particular domain (e.g. "google.com").  This machine works for filesystem paths (Mac, *nix, and Windows) as well as web-root-relative URL paths. It does not work for URLs that include other parts, such as the protocol (http://), domain (google.com), port (:1337), querystring (?foo=bar), or fragment (#itsme-again-hank-the-cowdog).',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    path: {
      description: 'The path to examine.',
      example: '/usr/bin',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is absolute path?',
      outputDescription: 'Whether the specified path is absolute or not.',
      outputExample: true
    },

  },


  fn: function (inputs,exits) {

    // Use `path-is-absolute` polyfill for Node <= 0.12
    var pathIsAbsolute = require('path-is-absolute');

    // If the path is absolute, return `true` through the `success` exit.
    if (pathIsAbsolute(inputs.path)) {
      return exits.success(true);
    }

    // Otherwise return `false` through the `success` exit.
    return exits.success(false);

  }


};
