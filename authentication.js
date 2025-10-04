const { getAdminHeaders, getAdminPostHeaders, getGetHeaders } = require('./utils/headers');

const authentication = {
  type: 'custom',
  connectionLabel: '{{bundle.authData.project_name}} - Pinecone Assistant',
  test: async (z, bundle) => {
    // Get an access token using client credentials flow
    const tokenResponse = await z.request({
      url: 'https://login.pinecone.io/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pinecone-Api-Version': '2025-04',
        'sourceTag': 'zapier:assistant'
      },
      body: {
        grant_type: 'client_credentials',
        client_id: bundle.inputData.client_id,
        client_secret: bundle.inputData.client_secret,
        audience: 'https://api.pinecone.io/'
      }
    });
    
    const accessToken = tokenResponse.json.access_token;

    // Get project details for the selected project
    const projectId = bundle.inputData.project_id;
    const projectsResponse = await z.request({
      url: 'https://api.pinecone.io/admin/projects',
      method: 'GET',
      headers: getAdminHeaders(accessToken)
    });

    const projects = projectsResponse.json.data;
    const selectedProject = projects.find(p => p.id === projectId);
    
    if (!selectedProject) {
      throw new Error('Selected project not found.');
    }

    // Store project info
    bundle.authData.project_id = selectedProject.id;
    bundle.authData.project_name = selectedProject.name;

    // Create consistent API key name (max 80 characters)
    const keyName = `Zapier Integration - Assistant - ${selectedProject.name}`.substring(0, 79);
    bundle.authData.expected_key_name = keyName;

    // Check if we already have an API key stored for this project
    if (!bundle.authData.api_key) {
      // List existing API keys for this project
      const apiKeysResponse = await z.request({
        url: `https://api.pinecone.io/admin/projects/${projectId}/api-keys`,
        method: 'GET',
        headers: getAdminHeaders(accessToken)
      });

      const apiKeys = apiKeysResponse.json.data;
      const existingKey = apiKeys.find(key => key.name === keyName);

      if (existingKey) {
        // Key exists but we don't have the value - need to create a new one
        // (We can't retrieve the value of existing keys)
        const createKeyResponse = await z.request({
          url: `https://api.pinecone.io/admin/projects/${projectId}/api-keys`,
          method: 'POST',
          headers: getAdminPostHeaders(accessToken),
          body: {
            name: keyName,
            roles: ['ProjectEditor']
          }
        });

        bundle.authData.api_key = createKeyResponse.json.value;
        bundle.authData.api_key_id = createKeyResponse.json.key.id;
        bundle.authData.api_key_name = createKeyResponse.json.key.name;
      } else {
        // Create a new API key
        const createKeyResponse = await z.request({
          url: `https://api.pinecone.io/admin/projects/${projectId}/api-keys`,
          method: 'POST',
          headers: getAdminPostHeaders(accessToken),
          body: {
            name: keyName,
            roles: ['ProjectEditor']
          }
        });

        bundle.authData.api_key = createKeyResponse.json.value;
        bundle.authData.api_key_id = createKeyResponse.json.key.id;
        bundle.authData.api_key_name = createKeyResponse.json.key.name;
      }
    }

    // Test the API key by listing assistants
    const testResponse = await z.request({
      url: 'https://api.pinecone.io/assistant/assistants',
      method: 'GET',
      headers: getGetHeaders(bundle)
    });

    return testResponse.json;
  },
  fields: [
    {
      key: 'client_id',
      label: 'Client ID',
      type: 'string',
      required: true,
      helpText: 'Your service account client ID from the Pinecone dashboard.'
    },
    {
      key: 'client_secret',
      label: 'Client Secret',
      type: 'password',
      required: true,
      helpText: 'Your service account client secret from the Pinecone dashboard.'
    },
    {
      key: 'project_id',
      label: 'Project',
      type: 'string',
      required: true,
      dynamic: 'listProjects.id.name',
      helpText: 'Select the Pinecone project to use for this connection.'
    }
  ]
};

module.exports = authentication;
