module.exports = {


  friendlyName: 'If..Then..Finally...',


  description: 'If the provided value is true, then run the \'then\' circuit.  Otherwise run the \'else\' circuit.  Either way, exit \'success\'.',


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

    // If the condition is truthy...
    if (inputs.bool) {
      // Call `then`, then trigger our success exit with its result.
      // The appropriate base value will be used if it doesn't have a result.
      inputs.then().exec({
        error: exits.error,
        success: function (result){
          return exits.success(result);
        }
      });
    }

    // If the condition is falsy...
    else {
      // If no `orElse` was provided, then we're done-- just trigger our success exit with no result.
      // The appropriate base value will be used.
      if (typeof inputs.orElse === 'undefined') {
        return exits.success();
      }

      // Otherwise, call `orElse`, then trigger our success exit with its result.
      // The appropriate base value will be used if it doesn't have a result.
      inputs.orElse().exec({
        error: exits.error,
        success: function (result){
          return exits.success(result);
        }
      });
    }
  },



};
