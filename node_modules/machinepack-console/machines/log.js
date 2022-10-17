module.exports = {


  friendlyName: 'Log to stdout',


  description: 'Output a message to stdout (standard output).',


  extendedDescription: 'Note that a newline will be automatically appended to the message.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value that will be written to stdout.',
      example: '===',
      required: true
    }

  },


  fn: function(inputs, exits) {
    console.log(inputs.value);
    return exits.success();
  }

};
