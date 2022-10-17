module.exports = {


  friendlyName: 'Construct JS timestamp',


  description: 'Construct an absolute timestamp from structured date/time/timezone data.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    year: {
      description: 'The four-digit year.',
      example: 2015,
      required: true
    },

    month: {
      description: 'The month (numeric, 1-12).',
      example: 12,
      required: true
    },

    date: {
      friendlyName: 'Day',
      description: 'The day of the month (1-31).',
      example: 25,
      required: true
    },

    hour: {
      description: 'The hour of the day (0-23).',
      example: 14,
      required: true
    },

    minute: {
      description: 'The minute of the day (0-59).',
      example: 30,
      required: true
    },

    second: {
      description: 'The second within the minute (0-59).',
      example: 1,
      defaultsTo: 0
    },

    millisecond: {
      description: 'The precise millisecond within the second (0-999).',
      example: 1,
      defaultsTo: 0
    },

    timezone: {
      description: 'A human-readable timezone name.',
      example: 'America/Chicago',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Timestamp',
      outputDescription: 'A JS timestamp (milliseconds since midnight on Jan 1, 1970 GMT).',
      outputExample: 1430856000000
    },

    unknownTimezone: {
      friendlyName: 'Invalid timezone',
      description: 'The specified timezone was not recognized.'
    },

    invalidDatetime: {
      friendlyName: 'Invalid date/time',
      description: 'Could not build a date/time from the provided information.',
    },

  },


  fn: function (inputs,exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Import `moment-timezone`.
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

    // Build Moment date object using appropriate timezone.
    var momentObj = MomentTz.tz({
      hour: inputs.hour,
      minute: inputs.minute,
      second: inputs.second,
      millisecond: inputs.millisecond,
      day: inputs.date,
      month: inputs.month-1,
      year: inputs.year
    }, foundTimezone);

    // If no valid date could be constructed, leave through the `invalidDatetime` exit.
    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Extract the absolute JS timestamp.
    // (# of milliseconds since Jan 1, 1970 at midnight, GMT).
    var jsTimestamp = momentObj.valueOf();

    // Return it through the `success` exit.
    return exits.success(jsTimestamp);
  }


};
