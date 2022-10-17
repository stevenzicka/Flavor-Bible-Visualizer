module.exports = {


  friendlyName: 'Median',


  description: 'Calculate the median value of an array of numbers.',


  extendedDescription: 'The median value is the value which falls in the middle of a sorted array (for arrays of odd-numbered length), or the average of the two middle-most values (for arrays of even-numbered length).',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {
    numbers: {
      description: 'The array of numbers to calculate the median of.',
      example: [123.45],
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Median',
      outputDescription: 'The median value of the numbers contained in the specified array.',
      outputExample: 123.45
    },

  },


  fn: function(inputs, exits) {

    // Sort the input array.
    inputs.numbers.sort(function(a,b) {
      return a - b;
    });

    // Get the midpoint of the array
    var midpoint = Math.floor(inputs.numbers.length / 2);

    // If the array has an odd number of inputs.numbers, simply return the
    // value at the midpoint through the `success` exit.
    if(inputs.numbers.length % 2) {
      return exits.success(inputs.numbers[midpoint]);
    }

    // Otherwise calculate the average of the two numbers surrounding
    // the midpoint, and pass that through the `success` exit.
    return exits.success((inputs.numbers[midpoint-1] + inputs.numbers[midpoint]) / 2);

  },



};
