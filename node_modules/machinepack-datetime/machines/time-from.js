module.exports = {


  friendlyName: 'Get elapsed time (time ago)',


  description: 'Format a JS timestamp (epoch ms) into a human-readable "time ago" format (e.g. "6 minutes ago" or "In 3 days").',


  extendedDescription: 'If the "To..." datetime is later than the "From...", the result will be a future-tensed string (e.g. "In a few seconds", "In 3 days").  Otherwise it will be a past-tensed string (e.g. "6 minutes ago").',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    toWhen: {
      friendlyName: 'To...',
      description: 'An epoch offset (in milliseconds).',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      example: 1318781876000,
      required: true
    },

    fromWhen: {
      friendlyName: 'From...',
      description: 'Another epoch offset (in milliseconds) to use as a reference when formatting the "time from" string.',
      extendedDescription: 'Defaults to current date/time.',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      example: 1318781870000
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Time from',
      outputDescription: 'A human-readable description of the amount of time elapsed between the given timestamps.',
      outputExample: '6 seconds ago',
    },

    invalidToWhen: {
      friendlyName: 'Invalid "to"',
      description: 'Could not build a date/time/zone from the provided "To..." timestamp.',
    },

    invalidFromWhen: {
      friendlyName: 'Invalid "from"',
      description: 'Could not build a date/time/zone from the provided "From..." timestamp.',
    },

  },


  fn: function (inputs,exits) {

    // Import `moment-timezone`.
    var MomentTz = require('moment-timezone');

    // Build Moment object from the `toWhen` input.
    var toWhenObj = MomentTz.tz(new Date(inputs.toWhen), 'Etc/Greenwich');

    // If a valid Moment object could not be created, leave through
    // the `invalidToWhen` exit.
    if (!toWhenObj.isValid()) {
      return exits.invalidToWhen();
    }

    // Build Moment object from the `fromWhen` input, defaulting to current
    // date/time if no `fromWhen` timestamp was provided.
    inputs.fromWhen = (typeof inputs.fromWhen === 'undefined') ? (new Date()).getTime() : inputs.fromWhen;
    var fromWhenObj = MomentTz.tz(new Date(inputs.fromWhen), 'Etc/Greenwich');

    // If a valid Moment object could not be created, leave through
    // the `invalidFromWhen` exit.
    if (!fromWhenObj.isValid()) {
      return exits.invalidFromWhen();
    }

    // Format final "time from" string and return it through the `success` exit.
    var resultStr = toWhenObj.from(fromWhenObj);
    return exits.success(resultStr);
  },



};
