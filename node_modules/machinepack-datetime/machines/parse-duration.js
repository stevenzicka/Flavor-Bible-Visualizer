module.exports = {


  friendlyName: 'Get elapsed time (duration)',


  description: 'Parse a JS timestamp (epoch ms) into a dictionary describing the duration from the timestamp to the current time.',


  extendedDescription: 'This machine breaks a duration down into hours, minutes, seconds and milliseconds.  If the "To..." datetime is later than the "From...", the "future" key of the dictionary will be `true`.  Otherwise it will be `false`.',


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
      outputFriendlyName: 'Duration',
      outputDescription: 'A dictionary describing the amount of time elapsed between the given timestamps.',
      outputExample: {
        hours: 4,
        minutes: 5,
        seconds: 26,
        milliseconds: 2,
        future: false
      }
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

    var MS_IN_HOUR = (60 * 60 * 1000);
    var MS_IN_MINUTE = (60 * 1000);
    var MS_IN_SECOND = 1000;

    // Default "from" time to now.
    inputs.fromWhen = (typeof inputs.fromWhen === 'undefined') ? (new Date()).getTime() : inputs.fromWhen;

    // Get the difference of "from" and "to"
    var duration = inputs.fromWhen - inputs.toWhen;
    var future = false;
    if (duration < 0) {
      future = true;
    }
    duration = Math.abs(duration);

    var hours = Math.floor(duration / MS_IN_HOUR);
    duration -= (hours * MS_IN_HOUR);
    var minutes = Math.floor(duration / MS_IN_MINUTE);
    duration -= (minutes * MS_IN_MINUTE);
    var seconds = Math.floor(duration / MS_IN_SECOND);
    duration -= (seconds * MS_IN_SECOND);
    var milliseconds = duration;

    return exits.success({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds,
      future: future
    });

  },

};
