const newFile = {
  key: 'newFile',
  noun: 'New File',

  display: {
    label: 'New File',
    description: 'Triggers when a new file is uploaded to an assistant.'
  },

  operation: {
    type: 'polling',

    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to monitor for new files'
      }
    ],

    perform: (z, bundle) => {
      const promise = z.request({
        method: 'GET',
        url: `https://prod-1-data.ke.pinecone.io/assistant/files/${bundle.inputData.assistant_name}`,
        headers: {
          'Api-Key': bundle.authData.api_key,
          'X-Pinecone-Api-Version': '2025-04',
          'User-Agent': 'source_tag=zapier:assistant'
        }
      });

      return promise.then((response) => {
        const files = response.json.files || [];
        
        // For polling triggers, we need to return only new items
        // Since this is a simple implementation, we'll return all files
        // In a real implementation, you'd want to track timestamps or IDs
        return files.map(file => ({
          ...file,
          id: file.id, // Use file ID for deduplication
          file_id: file.id, // Provide file_id field for dynamic connection
          created_on: file.created_on,
          updated_on: file.updated_on
        }));
      });
    },

    sample: {
      assistant_name: 'example-assistant',
      id: '3c90c3cc-0d44-4b50-8888-8dd25736052a',
      file_id: '3c90c3cc-0d44-4b50-8888-8dd25736052a',
      name: 'document.pdf',
      metadata: {},
      created_on: '2023-11-07T05:31:56Z',
      updated_on: '2023-11-07T05:31:56Z',
      status: 'Available',
      percent_done: 100,
      signed_url: 'https://storage.googleapis.com/bucket/file.pdf?...',
      error_message: null
    }
  }
};

module.exports = newFile;
