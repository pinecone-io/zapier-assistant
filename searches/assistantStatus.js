const describeAssistant = {
  key: 'assistantStatus',
  noun: 'Assistant Status',

  display: {
    label: 'Check Assistant Status',
    description: 'Gets the status and details of a specific assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to check status for'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'GET',
        url: `https://api.pinecone.io/assistant/assistants/${bundle.inputData.name}`
      });

      return promise.then((response) => {
        // Zapier expects search results to be an array, so wrap the single assistant in an array
        return [response.json];
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
