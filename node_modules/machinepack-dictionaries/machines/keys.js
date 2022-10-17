module.exports = {


  friendlyName: 'List dictionary keys',


  description: 'List all the keys in the provided dictionary.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    dictionary: {
      description: 'The dictionary whose keys will be listed.',
      example: {},
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Keys',
      outputDescription: 'The array of keys from the specified dictionary.',
      outputExample: ['email']
    }

  },


  fn: function(inputs, exits) {

    // Return an array of the input dictionary's keys through the `success` exit.
    return exits.success(Object.keys(inputs.dictionary));
  }

};
