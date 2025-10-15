const { getAdminHeaders, getAdminPostHeaders, getGetHeaders } = require('./utils/headers');

const authentication = {
  type: 'custom',
  connectionLabel: 'Pinecone Assistant Account',
  test: async (z, bundle) => {
    // Test the API key by listing assistants
    const testResponse = await z.request({
      url: 'https://api.pinecone.io/assistant/assistants',
      method: 'GET',
      headers: {
        'Api-Key': bundle.inputData.api_key,
        'X-Pinecone-Api-Version': '2025-04',
        'User-Agent': 'source_tag=zapier:assistant'
      }
    });

    // Store the API key for use by other actions/triggers
    bundle.authData.api_key = bundle.inputData.api_key;

    return {
      message: 'Successfully authenticated with Pinecone Assistant API',
      api_key: bundle.inputData.api_key
    };
  },
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText: 'Your Pinecone API key. You can find this in [your Pinecone project settings](https://app.pinecone.io/organizations/-/projects/-/api-keys).'
    }
  ]
};

module.exports = authentication;
