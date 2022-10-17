module.exports = {


  friendlyName: 'Format JS timestamp',


  description: 'Convert a JS timestamp and timezone into a human readable date/time.',


  sideEffects: 'cacheable',


  inputs: {

    timestamp: {
      description: 'An epoch offset (in milliseconds).',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000,
      required: true
    },

    timezone: {
      description: 'A human-readable timezone name.',
      example: 'America/Chicago',
      required: true
    },

    formatString: {
      friendlyName: 'Format',
      description: 'A format string that will be used to format the date.',
      extendedDescription: 'YYYY represents the year, "MM" the month (0-11), "DD" the date (0-indexed), "HH" the hour (0-23), "mm" the minute (0-59), "ss" the second (0-59), and "Z" the timezone difference from GMT/UTC.',
      whereToGet: {
        url: 'http://momentjs.com/docs/#/displaying/format',
        description: 'Full reference for date/time formatting options.',
      },
      example: 'YYYY-MM-DD HH:mm:ss Z',
      defaultsTo: 'YYYY-MM-DD HH:mm:ss Z'
    }
  },


  exits: {

    success: {
      outputExample: '2011-10-16 16:17:56 +00:00',
      outputFriendlyName: 'Formatted datetime',
      outputDescription: 'A human-readable string representing the specified timestamp.'
    },

    unknownTimezone: {
      friendlyName: 'Invalid timezone',
      description: 'The specified timezone was not recognized.'
    },

    invalidDatetime: {
      friendlyName: 'Invalid date/time/zone',
      description: 'Could not build a date/time/zone from the provided timestamp.',
    }

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

    // Build moment date using appropriate timezone.
    var momentObj = MomentTz.tz(inputs.timestamp, foundTimezone);

    // If no valid date could be constructed, leave through the `invalidDatetime` exit.
    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Format the constructed date object using the provided `formatString`.
    var resultStr = momentObj.format(inputs.formatString);

    // Return the resulting human-readable datetime through the `success` exit.
    return exits.success(resultStr);
  }


};
