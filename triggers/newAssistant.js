const newAssistant = {
  key: 'newAssistant',
  noun: 'Assistant',

  display: {
    label: 'New Assistant',
    description: 'Triggers when a new assistant is created.'
  },

  operation: {
    type: 'polling',

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'GET',
        url: 'https://api.pinecone.io/assistant/assistants'
      });

      return promise.then((response) => {
        const assistants = response.json.assistants || [];
        
        // For polling triggers, we need to return only new items
        // Since this is a simple implementation, we'll return all assistants
        // In a real implementation, you'd want to track timestamps or IDs
        return assistants.map(assistant => ({
          ...assistant,
          id: assistant.name, // Use name as ID for deduplication
          created_at: assistant.created_at
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
      updated_at: '2023-11-07T05:31:56Z',
      id: 'example-assistant'
    }
  }
};

module.exports = newAssistant;
