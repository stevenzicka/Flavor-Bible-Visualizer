module.exports = {


  friendlyName: 'Get absolute value',


  description: 'Return the absolute value of a given number.',


  extendedDescription: 'The absolute value of a number is its distance from zero. For example, the absolute value of both -6 and 6 is 6.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    number: {
      description: 'The number to return the absolute value of.',
      example: -100,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Absolute value',
      outputDescription: 'The absolute value of the input number.',
      outputExample: 100
    },

  },


  fn: function(inputs, exits) {
    // Return the absolute value of `inputs.number`
    // through the `success` exit.
    return exits.success(Math.abs(inputs.number));
  },



};
