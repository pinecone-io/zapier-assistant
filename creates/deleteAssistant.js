const deleteAssistant = {
  key: 'deleteAssistant',
  noun: 'Assistant',

  display: {
    label: 'Delete Assistant',
    description: 'Deletes an existing assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to delete'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'DELETE',
        url: `https://api.pinecone.io/assistant/assistants/${bundle.inputData.assistant_name}`
      });

      return promise.then((response) => {
        return {
          success: true,
          message: 'Assistant deleted successfully',
          assistant_name: bundle.inputData.assistant_name
        };
      });
    },

    sample: {
      assistant_name: 'example-assistant'
    }
  }
};

module.exports = deleteAssistant;
