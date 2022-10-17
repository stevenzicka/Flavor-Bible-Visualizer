module.exports = {


  friendlyName: 'Is greater than? (>)',


  description: 'Determine whether the first value is greater than the second.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    a: {
      friendlyName: 'Greater value',
      description: 'The first value to check (expected to be greater than the second).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    },

    b: {
      friendlyName: 'Other value',
      description: 'The second value to check (expected to be less than the first).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    },

    isInclusive: {
      friendlyName: 'Inclusive? (>=)',
      description: 'Whether to return \'true\' if both values are equal.',
      defaultsTo: false,
      example: true,
      extendedDescription: 'If set, this machine will use the >= operator for comparison.'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Is greater than?',
      outputDescription: 'A boolean indicating whether the first value is greater than (or equal to, if `Inclusive?` was set) the second.',
      outputExample: true
    }

  },


  'fn': function(inputs, exits, env) {

    // If using the `isInclusive` flag, check whether a >= b.
    if (inputs.isInclusive){

      // If so, return `true` through the `success` exit.
      if (inputs.a >= inputs.b) {
        return exits.success(true);
      }

      // Otherwise, return `false` through the `success` exit.
      return exits.success(false);
    }

    // If not using the `isInclusive` flag, check whether a > b.
    // If so, return `true` through the `success` exit.
    if (inputs.a > inputs.b) {
      return exits.success(true);
    }

    // Otherwise, return `false` through the `success` exit.
    return exits.success(false);
  }

};
