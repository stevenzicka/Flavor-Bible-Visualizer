module.exports = {


  friendlyName: 'E',


  description: 'Get the value of E (the mathematical constant).',


  extendedDescription: 'Returns the value of Euler\'s number, which is the base of the natural logarithm.',


  moreInfoUrl: 'https://en.wikipedia.org/wiki/E_(mathematical_constant)',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'E',
      outputDescription: 'The mathematical constant `e`.',
      outputExample: 2.718281828459045
    },

  },


  fn: function (inputs,exits) {

    // Return the constant `E` through the success exit.
    return exits.success(Math.E);

  },



};
