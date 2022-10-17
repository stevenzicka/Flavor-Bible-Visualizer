module.exports = {


  friendlyName: 'Pi (π)',


  description: 'Get the value of π (the mathematical constant).',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'Pi (π)',
      outputDescription: 'The mathematical constant pi (π).',
      outputExample: 3.141592653589793
    },

  },


  fn: function (inputs,exits) {

    // Return the constant `PI` through the `success` exit.
    return exits.success(Math.PI);

  },



};
