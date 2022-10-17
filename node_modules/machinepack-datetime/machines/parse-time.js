module.exports = {


  friendlyName: 'Parse time string',


  description: 'Parse a string containing a human-readable time.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    timeString: {
      description: 'A string containing a human-readable time (but not a date or timezone).',
      example: '2:30 PM',
      required: true
    }

  },


  exits: {

    success: {
      extendedDescription: '`hour` (0-23), `minute` (0-59), `second` (0-59), and `millisecond` (0-999) are all 0-indexed.',
      outputExample: {
        hour: 14,
        minute: 30,
        second: 0,
        millisecond: 0
      },
      outputFriendlyName: 'Parsed time',
      outputDescription: 'A dictionary containing information about the specified time.'
    },

    couldNotParse: {
      description: 'Could not parse a time from the provided string.',
    }

  },


  fn: function (inputs,exits) {

    // Import `moment`.
    var Moment = require('moment');

    // Parse the time string as an hour of a particularly boring day
    // and timezone (January 1, 2000 GMT) for simplicity
    var momentObj = Moment(Date.parse('1/1/0000 ' + inputs.timeString + ' GMT-0000'));

    // If no valid object could be created, leave through the `couldNotParse` exit.
    if (!momentObj.isValid()) {
      return exits.couldNotParse();
    }

    // Switch the moment object to "UTC" mode
    // (see http://momentjs.com/docs/#/parsing/utc/)
    momentObj.utc();

    // Construct a dictionary of information about the time and pass it through
    // the `success` exit.
    return exits.success({
      hour: momentObj.hour(),
      minute: momentObj.minute(),
      second: momentObj.second(),
      millisecond: momentObj.millisecond()
    });

  }

};
