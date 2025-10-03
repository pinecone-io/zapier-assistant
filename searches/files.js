const listFiles = {
  key: 'files',
  noun: 'File',

  display: {
    label: 'List Files',
    description: 'Lists all files in a specific assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to list files for'
      },
      {
        key: 'filter',
        required: false,
        type: 'string',
        label: 'Metadata Filter',
        helpText: 'Optional JSON-encoded metadata filter for files'
      }
    ],

    perform: (z, bundle) => {
      const params = {};
      if (bundle.inputData.filter) {
        params.filter = bundle.inputData.filter;
      }

      const promise = z.request({
        method: 'GET',
        url: `https://api.pinecone.io/assistant/files/${bundle.inputData.assistant_name}`,
        params: params
      });

      return promise.then((response) => {
        return response.json.files || [];
      });
    },

    sample: {
      assistant_name: 'example-assistant',
      filter: '{"category": "documentation"}'
    }
  }
};

module.exports = listFiles;
