const describeFile = {
  key: 'fileStatus',
  noun: 'File Status',

  display: {
    label: 'Describe File',
    description: 'Gets the status and metadata of a specific file uploaded to an assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant that contains the file',
        dynamic: 'listAssistants.id.name'
      },
      {
        key: 'file_id',
        required: true,
        type: 'string',
        label: 'File ID',
        helpText: 'The UUID of the file to describe',
        dynamic: 'listFiles.id.file_id'
      },
      {
        key: 'include_url',
        required: false,
        type: 'boolean',
        label: 'Include Signed URL',
        helpText: 'Include the signed URL of the file in the response',
        default: 'false'
      }
    ],

    perform: (z, bundle) => {
      const params = {};
      if (bundle.inputData.include_url) {
        params.include_url = bundle.inputData.include_url.toString();
      }

      const promise = z.request({
        method: 'GET',
        url: `https://prod-1-data.ke.pinecone.io/assistant/files/${bundle.inputData.assistant_name}/${bundle.inputData.file_id}`,
        headers: {
          'Api-Key': bundle.authData.api_key,
          'X-Pinecone-Api-Version': '2025-04',
          'sourceTag': 'zapier:assistant'
        },
        params: params
      });

      return promise.then((response) => {
        return [response.json];
      });
    },

    sample: {
      assistant_name: 'example-assistant',
      file_id: '3c90c3cc-0d44-4b50-8888-8dd25736052a',
      include_url: true
    }
  }
};

module.exports = describeFile;
