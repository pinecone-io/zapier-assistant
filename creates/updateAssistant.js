const updateAssistant = {
  key: 'updateAssistant',
  noun: 'Updated Assistant',

  display: {
    label: 'Update Assistant',
    description: 'Updates an existing assistant with new instructions or metadata.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to update'
      },
      {
        key: 'instructions',
        required: true,
        type: 'text',
        label: 'Instructions',
        helpText: 'New instructions for the assistant'
      },
      {
        key: 'metadata',
        required: false,
        type: 'string',
        label: 'Metadata',
        helpText: 'JSON string of metadata to update'
      }
    ],

    perform: (z, bundle) => {
      const body = {};
      
      if (bundle.inputData.instructions) {
        body.instructions = bundle.inputData.instructions;
      }
      
      if (bundle.inputData.metadata) {
        body.metadata = JSON.parse(bundle.inputData.metadata);
      }

      const promise = z.request({
        method: 'PATCH',
        url: `https://api.pinecone.io/assistant/assistants/${bundle.inputData.name}`,
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
      name: 'test-assistant',
      instructions: 'Use American English for spelling and grammar.',
      metadata: '{"category": "support", "version": "2.0"}'
    }
  }
};

module.exports = updateAssistant;
