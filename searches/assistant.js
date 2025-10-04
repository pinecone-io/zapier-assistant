const listAssistants = {
  key: 'assistant',
  noun: 'Assistant',

  display: {
    label: 'List Assistants',
    description: 'Lists all available assistants in your project.'
  },

  operation: {
    inputFields: [
      {
        key: 'limit',
        required: false,
        type: 'integer',
        label: 'Limit',
        helpText: 'Maximum number of assistants to return',
        default: '50'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'GET',
        url: 'https://api.pinecone.io/assistant/assistants'
      });

      return promise.then((response) => {
        const assistants = response.json.assistants || [];
        return assistants.map(assistant => ({
          id: assistant.name,
          label: assistant.name
        }));
      });
    },

    sample: {
      name: 'example-assistant',
      instructions: 'You are a helpful assistant that answers questions based on provided documentation.',
      metadata: {},
      status: 'Ready',
      host: 'us-east-1',
      created_at: '2023-11-07T05:31:56Z',
      updated_at: '2023-11-07T05:31:56Z'
    }
  }
};

module.exports = listAssistants;
