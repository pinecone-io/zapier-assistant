const listFiles = {
  key: 'files',
  noun: 'File List',

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
        url: `https://prod-1-data.ke.pinecone.io/assistant/files/${bundle.inputData.assistant_name}`,
        headers: {
          'Api-Key': bundle.authData.api_key,
          'X-Pinecone-Api-Version': '2025-04',
          'User-Agent': 'source_tag=zapier:assistant'
        },
        params: params
      });

      return promise.then((response) => {
        const files = response.json.files || [];
        return files.map(file => ({
          id: file.id,
          label: file.name
        }));
      });
    },

    sample: {
      assistant_name: 'example-assistant',
      filter: '{"category": "documentation"}'
    }
  }
};

module.exports = listFiles;
