const authentication = {
  type: 'custom',
  test: {
    url: 'https://api.pinecone.io/assistant/assistants',
    method: 'GET',
    headers: {
      'Api-Key': '{{bundle.authData.api_key}}'
    }
  },
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'string',
      required: true,
      helpText: 'Your Pinecone API key. You can find this in your Pinecone dashboard.'
    }
  ]
};

module.exports = authentication;
