const listAssistants = {
  key: 'listAssistants',
  noun: 'Assistant List',

  display: {
    label: 'List Assistants',
    description: 'Lists all assistants in your project.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: false,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'Filter assistants by name (optional)'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'GET',
        url: 'https://api.pinecone.io/assistant/assistants'
      });

      return promise.then((response) => {
        const assistants = response.json.assistants || [];
        
        // Return assistants with proper structure for dynamic dropdown
        return assistants.map(assistant => ({
          ...assistant,
          id: assistant.name, // Use name as ID for deduplication
          assistant_id: assistant.name, // Provide assistant_id field for dynamic connection
          name: assistant.name,
          instructions: assistant.instructions,
          status: assistant.status,
          created_at: assistant.created_at,
          updated_at: assistant.updated_at
        }));
      });
    },

    sample: {
      name: 'example-assistant',
      id: 'example-assistant',
      assistant_id: 'example-assistant',
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
