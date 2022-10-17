module.exports = {


  friendlyName: 'Stringify JS timestamp',


  description: 'Convert a JS timestamp into conventional JSON date/time format (ISO 8601).',


  sideEffects: 'cacheable',


  inputs: {

    timestamp: {
      description: 'An epoch offset (in milliseconds).',
      moreInfoUrl: 'http://momentjs.com/docs/#/parsing/unix-offset/',
      extendedDescription: 'The number of milliseconds since midnight (GMT/UTC) on January 1, 1970.',
      example: 1318781876000,
      required: true
    }

  },


  exits: {

    success: {
      outputExample: '2015-05-06T00:53:34.650Z',
      outputFriendlyName: 'Date string',
      outputDescription: 'A string representing the given timestamp.'
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

    // Build a Moment date object using appropriate timezone.
    var momentObj = MomentTz.tz(inputs.timestamp, 'Etc/Greenwich');

    // If a valid Moment object could not be created, leave through
    // the `invalidDatetime` exit.
    if (!momentObj.isValid()) {
      return exits.invalidDatetime();
    }

    // Format and stringify the date as an ISO8601 string, the return it
    // through the `success` exit.
    var resultStr = momentObj.toDate().toJSON();
    return exits.success(resultStr);
  }


};
