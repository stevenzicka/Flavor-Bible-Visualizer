module.exports = {


  friendlyName: 'Parse path',


  description: 'Parse a path to determine its component parts.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    path: {
      description: 'The path to parse.',
      example: 'C:\\\\a\\b\\index.html',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Parsed path',
      outputDescription: 'The various components of the provided path.',
      outputExample: {
        root: 'C:\\',
        dir: 'C:\\a\\b',
        base: 'index.html',
        ext: '.html',
        name: 'index'
      }
    }

  },


  fn: function (inputs,exits) {

    // Use `path-parse` polyfill for Node <= 0.12
    var pathParse = require('path-parse');

    // Parse the input path into a dictionary and return it
    // through the `success` exit.
    return exits.success(pathParse(inputs.path));
  }


};
