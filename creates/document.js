const http = require('https'); // require('http') if your URL is not https

const FormData = require('form-data');

const makeDownloadStream = (url, z) =>
  new Promise((resolve, reject) => {
    http
      .request(url, (res) => {
        // We can risk missing the first n bytes if we don't pause!
        res.pause();
        resolve(res);
      })
      .on('error', reject)
      .end();
  });

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
        key: 'name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to upload the document to',
        dynamic: 'listAssistants.id.name'
      },
      {
        key: 'file',
        required: true,
        type: 'file',
        label: 'Document File',
        helpText: 'The document file to upload (PDF, TXT, DOCX, etc.)'
      },
      {
        key: 'filename',
        required: true,
        type: 'string',
        label: 'Filename',
        helpText: 'The filename for the uploaded document'
      },
      {
        key: 'metadata',
        required: false,
        type: 'string',
        label: 'Metadata',
        helpText: 'Optional JSON metadata for the document'
      }
    ],

    perform: async (z, bundle) => {
      // Follow the exact Zapier example pattern
      // bundle.inputData.file will be a URL where the file data can be downloaded from
      const stream = await makeDownloadStream(bundle.inputData.file, z);

      const form = new FormData();
      form.append('file', stream, bundle.inputData.filename);
      
      if (bundle.inputData.metadata) {
        form.append('metadata', bundle.inputData.metadata);
      }

      // All set! Resume the stream
      stream.resume();

      const response = await z.request({
        url: `https://prod-1-data.ke.pinecone.io/assistant/files/${bundle.inputData.name}`,
        method: 'POST',
        body: form,
        headers: {
          'Api-Key': bundle.authData.api_key,
          'X-Pinecone-Api-Version': '2025-04',
          'sourceTag': 'zapier:assistant'
        }
      });

      return response.data;
    },

    sample: {
      name: 'asst_1234567890',
      file: 'document.pdf',
      filename: 'document.pdf',
      metadata: '{"category": "support", "version": "1.0"}'
    }
  }
};

module.exports = uploadDocument;
