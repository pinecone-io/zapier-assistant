const chatAssistant = {
  key: 'chat',
  noun: 'Chat',

  display: {
    label: 'Chat With Assistant',
    description: 'Chat with an assistant and get back citations in structured form.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to chat with'
      },
      {
        key: 'message',
        required: true,
        type: 'text',
        label: 'Message',
        helpText: 'The message to send to the assistant'
      },
      {
        key: 'model',
        required: false,
        type: 'string',
        label: 'Model',
        helpText: 'The large language model to use for answer generation',
        choices: {
          'gpt-4o': 'GPT-4o',
          'gpt-4.1': 'GPT-4.1',
          'o4-mini': 'O4-mini',
          'claude-3-5-sonnet': 'Claude 3.5 Sonnet',
          'claude-3-7-sonnet': 'Claude 3.7 Sonnet',
          'gemini-2.5-pro': 'Gemini 2.5 Pro'
        },
        default: 'gpt-4o'
      },
      {
        key: 'temperature',
        required: false,
        type: 'number',
        label: 'Temperature',
        helpText: 'Controls randomness: 0 = deterministic, higher = more creative',
        default: '0'
      },
      {
        key: 'stream',
        required: false,
        type: 'boolean',
        label: 'Stream Response',
        helpText: 'If true, returns a stream of responses',
        default: 'false'
      },
      {
        key: 'json_response',
        required: false,
        type: 'boolean',
        label: 'JSON Response',
        helpText: 'If true, assistant will return a JSON response',
        default: 'false'
      },
      {
        key: 'include_highlights',
        required: false,
        type: 'boolean',
        label: 'Include Highlights',
        helpText: 'If true, returns highlights from referenced documents',
        default: 'false'
      },
      {
        key: 'filter',
        required: false,
        type: 'string',
        label: 'Document Filter',
        helpText: 'JSON filter to limit which documents can be retrieved'
      }
    ],

    perform: (z, bundle) => {
      const body = {
        messages: [
          {
            role: 'user',
            content: bundle.inputData.message
          }
        ]
      };

      // Add optional parameters
      if (bundle.inputData.model) {
        body.model = bundle.inputData.model;
      }
      if (bundle.inputData.temperature !== undefined) {
        body.temperature = bundle.inputData.temperature;
      }
      if (bundle.inputData.stream !== undefined) {
        body.stream = bundle.inputData.stream;
      }
      if (bundle.inputData.json_response !== undefined) {
        body.json_response = bundle.inputData.json_response;
      }
      if (bundle.inputData.include_highlights !== undefined) {
        body.include_highlights = bundle.inputData.include_highlights;
      }
      if (bundle.inputData.filter) {
        body.filter = JSON.parse(bundle.inputData.filter);
      }

      const promise = z.request({
        method: 'POST',
        url: `https://api.pinecone.io/assistant/chat/${bundle.inputData.assistant_name}`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });

      return promise.then((response) => {
        return response.json;
      });
    },

    sample: {
      assistant_name: 'example-assistant',
      message: 'What is the inciting incident of Pride and Prejudice?',
      model: 'gpt-4o',
      temperature: 0,
      stream: false,
      json_response: false,
      include_highlights: false
    }
  }
};

module.exports = chatAssistant;
