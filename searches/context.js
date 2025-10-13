const retrieveContext = {
  key: 'context',
  noun: 'Context Result',

  display: {
    label: 'Retrieve Context Snippets',
    description: 'Retrieve context snippets from an assistant to use as part of RAG or any agentic flow.'
  },

  operation: {
    inputFields: [
      {
        key: 'assistant_name',
        required: true,
        type: 'string',
        label: 'Assistant Name',
        helpText: 'The name of the assistant to retrieve context from'
      },
      {
        key: 'query',
        required: false,
        type: 'text',
        label: 'Query',
        helpText: 'The query that is used to generate the context'
      },
      {
        key: 'messages',
        required: false,
        type: 'string',
        label: 'Messages',
        helpText: 'JSON array of messages to use for generating context (alternative to query)'
      },
      {
        key: 'top_k',
        required: false,
        type: 'integer',
        label: 'Top K',
        helpText: 'Maximum number of context snippets to return (default: 16, max: 64)',
        default: '16'
      },
      {
        key: 'snippet_size',
        required: false,
        type: 'integer',
        label: 'Snippet Size',
        helpText: 'Maximum context snippet size in tokens (default: 2048, min: 512, max: 8192)',
        default: '2048'
      },
      {
        key: 'filter',
        required: false,
        type: 'string',
        label: 'Document Filter',
        helpText: 'JSON filter to limit which documents can be retrieved'
      }
    ],

    perform: (z, bundle) => {
      const body = {};

      // Either query or messages must be provided
      if (bundle.inputData.query) {
        body.query = bundle.inputData.query;
      } else if (bundle.inputData.messages) {
        body.messages = JSON.parse(bundle.inputData.messages);
      } else {
        throw new Error('Either query or messages must be provided');
      }

      // Add optional parameters
      if (bundle.inputData.top_k !== undefined) {
        body.top_k = bundle.inputData.top_k;
      }
      if (bundle.inputData.snippet_size !== undefined) {
        body.snippet_size = bundle.inputData.snippet_size;
      }
      if (bundle.inputData.filter) {
        body.filter = JSON.parse(bundle.inputData.filter);
      }

      const promise = z.request({
        method: 'POST',
        url: `https://prod-1-data.ke.pinecone.io/assistant/chat/${bundle.inputData.assistant_name}/context`,
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': bundle.authData.api_key,
          'X-Pinecone-Api-Version': '2025-04',
          'sourceTag': 'zapier:assistant'
        },
        body: body
      });

      return promise.then((response) => {
        return [response.json];
      });
    },

    sample: {
      assistant_name: 'example-assistant',
      query: 'Who is the CFO of Netflix?',
      top_k: 16,
      snippet_size: 2048
    }
  }
};

module.exports = retrieveContext;
