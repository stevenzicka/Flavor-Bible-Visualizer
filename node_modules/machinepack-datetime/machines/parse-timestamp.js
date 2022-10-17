module.exports = {


  friendlyName: 'Parse JS timestamp',


  description: 'Expand a JS timestamp into a dictionary of date/time information.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    timestamp: {
      friendlyName: 'Timestamp (JS)',
      description: 'An epoch offset (in milliseconds).',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000,
      required: true
    },

    timezone: {
      description: 'The name of the timezone of interest (human-readable).',
      extendedDescription: 'Supports any of the timezone names supported by `moment-timezone`.',
      example: 'America/Chicago',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Parsed timestamp',
      outputDescription: 'A dictionary containing information about the specified timestamp.',
      extendedDescription: '`year` is the full calendar year, `date` is 1-indexed, `month` is 1-indexed, and `dayOfWeek` is a string like "Sunday".  `hour` (0-23), `minute` (0-59), `second` (0-59), and `millisecond` (0-999) are all 0-indexed.',
      outputExample: {
        month: 12,
        date: 25,
        year: 2015,
        dayOfWeek: 'Monday',
        hour: 14,
        minute: 30,
        second: 0,
        millisecond: 0,
        timezone: 'America/Chicago'
      }
    },

    unknownTimezone: {
      friendlyName: 'Invalid timezone',
      description: 'The provided timezone was not recognized.'
    },

    couldNotParse: {
      description: 'Could not build a valid date/time from the provided timestamp + timezone combination.',
    },

  },


  fn: function (inputs,exits) {

    // Import `lodash` and `moment-timezone`.
    var _ = require('lodash');
    var MomentTz = require('moment-timezone');

    // Try to find a known timezone matching the `timezone` input (case-insensitive).
    var foundTimezone = _.find(MomentTz.tz.names(), function (timezoneName){
      if (inputs.timezone.toLowerCase().match(timezoneName.toLowerCase())) {
        return timezoneName;
      }
    });

    // If none is found, leave through the `unknownTimezone` exit.
    if (!foundTimezone) {
      return exits.unknownTimezone();
    }

    // Build Moment object using appropriate timezone.
    var momentObj = MomentTz.tz(inputs.timestamp, foundTimezone);

    // If a valid Moment object could not be created, leave through
    // the `couldNotParse` exit.
    if (!momentObj.isValid()) {
      return exits.couldNotParse();
    }

    // Build a dictionary of information about the date and time, and
    // output it through the `success` exit.
    return exits.success({
      month: momentObj.month()+1,
      date: momentObj.date(),
      year: momentObj.year(),
      dayOfWeek: momentObj.format('dddd'),
      hour: momentObj.hour(),
      minute: momentObj.minute(),
      second: momentObj.second(),
      millisecond: momentObj.millisecond(),
      timezone: foundTimezone
    });
  }

};
