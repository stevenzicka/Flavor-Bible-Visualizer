module.exports = {


  friendlyName: 'Parse date string',


  description: 'Parse a string containing a human-readable date.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    monthDayYear: {
      friendlyName: 'Date string',
      description: 'A string containing a human-readable date (but not a time or timezone).',
      example: 'December 25, 2015',
      required: true
    }

  },


  exits: {

    success: {
      extendedDescription: '`year` is the full calendar year, `date` is 1-indexed, `month` is 1-indexed, and `dayOfWeek` is a string like "Sunday".',
      outputExample: {
        month: 12,
        date: 25,
        year: 2015,
        dayOfWeek: 'Monday',
      },
      outputFriendlyName: 'Parsed date',
      outputDescription: 'A dictionary containing information about the specified date.'
    },

    couldNotParse: {
      description: 'Could not parse a date from the provided string.',
    }

  },


  fn: function (inputs,exits) {

    // Import `moment`.
    var Moment = require('moment');

    // Attempt to create a new Moment object with the provided `monthDayYear` string.
    var momentObj = Moment(Date.parse(inputs.monthDayYear));

    // If no valid object could be created, leave through the `couldNotParse` exit.
    if (!momentObj.isValid()) {
      return exits.couldNotParse();
    }

    // Construct a dictionary of information about the date and pass it through
    // the `success` exit.
    return exits.success({
      month: momentObj.month()+1,
      date: momentObj.date(),
      year: momentObj.year(),
      dayOfWeek: momentObj.format('dddd')
    });
  }

};
