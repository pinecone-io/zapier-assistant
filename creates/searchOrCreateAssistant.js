const { getPostHeaders, getGetHeaders } = require('../utils/headers');

const searchOrCreateAssistant = {
  key: 'searchOrCreateAssistant',
  noun: 'Assistant',

  display: {
    label: 'Search or Create Assistant',
    description: 'Searches for an assistant by name. If found, returns the existing assistant. If not found, creates a new assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The unique name for the assistant'
      },
      {
        key: 'instructions',
        required: false,
        type: 'text',
        label: 'Instructions',
        helpText: 'Instructions for the assistant (optional, only used when creating)'
      },
      {
        key: 'metadata',
        required: false,
        type: 'string',
        label: 'Metadata',
        helpText: 'JSON string of metadata for the assistant (optional, only used when creating)'
      }
    ],

    perform: async (z, bundle) => {
      const assistantName = bundle.inputData.name;
      
      try {
        // First, try to get the assistant to see if it exists
        const getResponse = await z.request({
          method: 'GET',
          url: `https://api.pinecone.io/assistant/assistants/${assistantName}`,
          headers: getGetHeaders(bundle)
        });

        // If we get here, the assistant exists
        return {
          ...getResponse.json,
          id: getResponse.json.name,
          assistant_id: getResponse.json.name,
          action: 'found',
          message: 'Assistant found'
        };

      } catch (error) {
        // If the assistant doesn't exist (404), create it
        if (error.status === 404) {
          const createData = {
            name: assistantName,
            instructions: bundle.inputData.instructions || 'You are a helpful assistant that answers questions based on provided documentation.',
            metadata: bundle.inputData.metadata ? JSON.parse(bundle.inputData.metadata) : {}
          };

          const createResponse = await z.request({
            method: 'POST',
            url: 'https://api.pinecone.io/assistant/assistants',
            headers: getPostHeaders(bundle),
            body: createData
          });

          return {
            ...createResponse.json,
            id: createResponse.json.name,
            assistant_id: createResponse.json.name,
            action: 'created',
            message: 'Assistant created successfully'
          };
        }

        // If it's not a 404 error, re-throw it
        throw error;
      }
    },

    sample: {
      id: 'example-assistant',
      assistant_id: 'example-assistant',
      name: 'example-assistant',
      instructions: 'You are a helpful assistant that answers questions based on provided documentation.',
      metadata: {},
      status: 'Ready',
      host: 'us-east-1',
      created_at: '2023-11-07T05:31:56Z',
      updated_at: '2023-11-07T05:31:56Z',
      action: 'found',
      message: 'Assistant found'
    }
  }
};

module.exports = searchOrCreateAssistant;
