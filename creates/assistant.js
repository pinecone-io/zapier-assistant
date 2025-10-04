const { getPostHeaders } = require('../utils/headers');

const createAssistant = {
  key: 'assistant',
  noun: 'Assistant',

  display: {
    label: 'Create Assistant',
    description: 'Creates a new Pinecone Assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'A descriptive name for your assistant'
      },
      {
        key: 'instructions',
        required: true,
        type: 'text',
        label: 'Custom Instructions',
        helpText: 'Custom instructions to tailor the assistant\'s behavior'
      },
      {
        key: 'region',
        required: true,
        type: 'string',
        label: 'Region',
        helpText: 'The region to create the assistant in',
        choices: {
          'us': 'US',
          'eu': 'EU'
        }
      },
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'POST',
        url: 'https://api.pinecone.io/assistant/assistants',
        headers: getPostHeaders(bundle),
        body: {
          name: bundle.inputData.name,
          instructions: bundle.inputData.instructions,
          region: bundle.inputData.region,
        }
      });

      return promise.then((response) => {
        return response.json;
      });
    },

    sample: {
      name: 'Customer Support Assistant',
      instructions: 'You are a helpful customer support assistant. Answer questions based on the provided documentation.',
      region: 'us'
    }
  }
};

module.exports = createAssistant;
