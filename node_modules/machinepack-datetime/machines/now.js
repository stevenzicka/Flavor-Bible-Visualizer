module.exports = {


  friendlyName: 'Get current JS timestamp (Now)',


  description: 'Construct a new JS timestamp from the current time.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {},


  exits: {

    success: {
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      outputExample: 1318781876000,
      outputFriendlyName: 'Current timestamp',
      outputDescription: 'A Javascript timestamp representing the current time.'
    }

  },


  fn: function (inputs,exits) {

    // Create a new Javascript Date object, run `.getTime()` to get a JS timestamp
    // (in milliseconds) and return it through the `success` exit.
    return exits.success((new Date()).getTime());

  }


};
