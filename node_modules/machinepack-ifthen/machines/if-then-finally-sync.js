module.exports = {


  friendlyName: 'If..Then..Finally... (sync)',


  description: 'If the provided value is true, then run the \'then\' circuit.  Otherwise run the \'else\' circuit.  Either way, exit \'success\'.',


  sync: true,


  inputs: {

    bool: {
      friendlyName: 'Condition',
      description: 'The true/false value to check.',
      example: '===',
      required: true
    },

    then: {
      friendlyName: 'Then...',
      description: 'The code to run if the condition is truthy.',
      example: '->',
      contract: {
        sync: true,
        inputs: {},
        exits: {
          success: {
            outputFriendlyName: 'Data',
            outputDescription: 'The result (if any) of executing the `Then...` branch.',
            like: 'expectedOutput',
            description: 'The `Then...` branch finished executing.',
          }
        }
      },
      required: true
    },

    orElse: {
      friendlyName: 'Or else...',
      description: 'The code to run if the condition is NOT truthy.',
      extendedDescription: 'If no value is provided for this input, and the condition is not truthy, the \'success\' exit of the machine will be called immediately.',
      example: '->',
      contract: {
        sync: true,
        inputs: {},
        exits: {
          success: {
            outputFriendlyName: 'Data',
            outputDescription: 'The result (if any) of executing the `Or else...` branch.',
            like: 'expectedOutput',
            description: 'The `Or else...` branch finished executing.'
          }
        }
      }
    },

    expectedOutput: {
      friendlyName: 'Example result',
      description: 'An example of what the output data will look like.',
      extendedDescription: 'If specified, this should be written in RTTC exemplar notation.  It will be used '+
      'for determining the expected data type of the return value from either `then` or `orElse`, whichever ends up '+
      'getting run.  By default, this is `*`, meaning any JSON-compatible value is accepted.',
      isExemplar: true,
      defaultsTo: '*'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Data',
      outputDescription: 'The data returned from either `then` or `orElse` (if relevant).',
      like: 'expectedOutput'
    },

  },


  fn: function (inputs,exits) {

    // Declare a variable to hold the result (if any)
    var result;

    // If the condition is truthy...
    if (inputs.bool) {
      // Set the result to the value returned by `then`, if any.
      result = inputs.then();
    }

    // If the result is falsy and an `orElse` function was defined...
    else if (typeof inputs.orElse !== 'undefined') {
      // Set the result to the value returned by `orElse`, if any.
      result = inputs.orElse();
    }

    // Finally, return the result (if any) through the `success` exit.
    return exits.success(result);

  }


};
