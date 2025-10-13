const deleteAssistant = {
  key: 'deleteAssistant',
  noun: 'Delete Assistant',

  display: {
    label: 'Delete Assistant',
    description: 'Deletes an existing assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to delete'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'DELETE',
        url: `https://api.pinecone.io/assistant/assistants/${bundle.inputData.name}`
      });

      return promise.then((response) => {
        return {
          success: true,
          message: 'Assistant deleted successfully',
          name: bundle.inputData.name
        };
      });
    },

    sample: {
      name: 'example-assistant'
    }
  }
};

module.exports = deleteAssistant;
