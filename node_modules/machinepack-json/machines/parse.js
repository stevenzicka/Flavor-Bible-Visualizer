module.exports = {


  friendlyName: 'Parse JSON string',


  description: 'Parse data from a JSON-encoded string.',


  extendedDescription: 'Takes a JSON string and transforms it (if valid) into a Javascript dictionary, array or literal matching the provided schema.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    json: {
      friendlyName: 'JSON string',
      description: 'The JSON string to parse.',
      example: '{"some json": "like this"}',
      required: true
    },

    schema: {
      friendlyName: 'Example result',
      description: 'A representative example (RTTC exemplar) of what the resulting data should look like.',
      moreInfoUrl: 'http://github.com/node-machine/rttc',
      example: '*',
      isExemplar: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Parsed JSON',
      outputDescription: 'The resulting Javascript dictionary, array or literal from parsing the input string.',
      like: 'schema'
    },

    couldNotParse: {
      description: 'Could not parse provided string, because it was not valid JSON.',
      extendedDescription: 'Oftentimes this error is a result of not using double-quotes.  Refer to the official JSON specification at http://www.json.org/ for more information.'
    },


  },


  fn: function(inputs, exits) {

    // Declare a var to hold the parsed JSON.
    var parsedJson;

    // Attempt to parse the JSON string.
    try {
      parsedJson = JSON.parse(inputs.json);
    }

    // If there are any problems, use the `couldNotParse` exit,
    // sending the error as output.
    catch (e){
      return exits.couldNotParse(e);
    }

    // Return the new Javascript dictionary, array or literal through
    // the `success` exit.  RTTC will take care of coercing it to
    // match the specified `schema` automatically.
    return exits.success(parsedJson);

  }

};
