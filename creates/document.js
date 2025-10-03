const uploadDocument = {
  key: 'document',
  noun: 'Document',

  display: {
    label: 'Upload Document',
    description: 'Uploads a document to a Pinecone Assistant.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_id',
        required: true,
        type: 'string',
        label: 'Assistant ID',
        helpText: 'The ID of the assistant to upload the document to'
      },
      {
        key: 'file',
        required: true,
        type: 'file',
        label: 'Document File',
        helpText: 'The document file to upload (PDF, TXT, DOCX, etc.)'
      },
      {
        key: 'metadata',
        required: false,
        type: 'string',
        label: 'Metadata',
        helpText: 'Optional JSON metadata for the document'
      }
    ],

    perform: (z, bundle) => {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', bundle.inputData.file);
      
      if (bundle.inputData.metadata) {
        formData.append('metadata', bundle.inputData.metadata);
      }

      const promise = z.request({
        method: 'POST',
        url: `https://api.pinecone.io/assistant/assistants/${bundle.inputData.assistant_id}/files`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      });

      return promise.then((response) => {
        return response.json;
      });
    },

    sample: {
      assistant_id: 'asst_1234567890',
      file: 'document.pdf',
      metadata: '{"category": "support", "version": "1.0"}'
    }
  }
};

module.exports = uploadDocument;
