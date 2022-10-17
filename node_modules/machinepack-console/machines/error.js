module.exports = {


  friendlyName: 'Log to stderr',


  description: 'Output a message to stderr (standard error).',


  extendedDescription: 'Note that a newline will be automatically appended to the message.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value that will be written to stderr.',
      example: '===',
      required: true
    }

  },


  fn: function(inputs, exits) {
    console.error(inputs.value);
    return exits.success();
  }

};
