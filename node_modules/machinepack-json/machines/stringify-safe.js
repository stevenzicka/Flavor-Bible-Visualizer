module.exports = {


  friendlyName: 'Stringify (safe)',


  description: 'Encode the specified value into a JSON string, but tolerate recursive objects and preserve functions, errors, and regexps.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    value: {
      friendlyName: 'Data',
      description: 'The data to encode as a JSON string.',
      example: '*',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'JSON string',
      outputDescription: 'The resulting JSON from stringifying from stringifying the input.',
      outputExample: '{"some stringified json": "like this"}'
    }

  },


  fn: function (inputs,exits) {

    // Backwards compat for Node v0.10 (which doesn't have `util.is*()` qualifiers)
    var isFunction = require('lodash.isfunction');
    var isRegExp = require('lodash.isregexp');
    var isError = require('lodash.iserror');


    /**
     * This was modified by @mikermcneil from @isaacs' json-stringify-safe
     * (see https://github.com/isaacs/json-stringify-safe/commit/02cfafd45f06d076ac4bf0dd28be6738a07a72f9#diff-c3fcfbed30e93682746088e2ce1a4a24)
     */
    function serializer() {
      var stack = [];
      var keys = [];

      // Function to replace circular references with a string describing the reference.
      // Used by the custom stringify function below.
      var cycleReplacer = function(key, value) {
        if (stack[0] === value) return '[Circular ~]';
        return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
      };

      // Return a custom stringify function to be used as the second argument
      // to the native JSON.stringify.
      return function(key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
        }
        else stack.push(value);

        // Do some advanced serialization
        if (isError(value)){
          value = value.stack;
        }
        else if (isRegExp(value)){
          value = value.toString();
        }
        else if (isFunction(value)){
          value = value.toString();
        }

        return value;
      };
    }

    // Serialize the string and return through the `success` exit.
    var jsonString = JSON.stringify(inputs.value, serializer());
    return exits.success(jsonString);

  }


};
