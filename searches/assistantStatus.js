const describeAssistant = {
  key: 'assistantStatus',
  noun: 'Assistant',

  display: {
    label: 'Check Assistant Status',
    description: 'Gets the status and details of a specific assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to check status for'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'GET',
        url: `https://api.pinecone.io/assistant/assistants/${bundle.inputData.assistant_name}`
      });

      return promise.then((response) => {
        return response.json;
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

module.exports = describeAssistant;
