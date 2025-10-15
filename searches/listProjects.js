const { getAdminHeaders } = require('../utils/headers');

const listProjects = {
  key: 'listProjects',
  noun: 'Project List',

  display: {
    label: 'List Projects',
    description: 'List all available Pinecone projects.'
  },

  operation: {
    inputFields: [
      {
        key: 'name',
        required: false,
        type: 'string',
        label: 'Project Name',
        helpText: 'Filter projects by name (optional)'
      }
    ],

    perform: async (z, bundle) => {
      // Get access token using client credentials
      const tokenResponse = await z.request({
        url: 'https://login.pinecone.io/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          grant_type: 'client_credentials',
          client_id: bundle.inputData.client_id || bundle.authData.client_id,
          client_secret: bundle.inputData.client_secret || bundle.authData.client_secret,
          audience: 'https://api.pinecone.io/'
        }
      });

      const accessToken = tokenResponse.json.access_token;

      // List projects
      const response = await z.request({
        url: 'https://api.pinecone.io/admin/projects',
        method: 'GET',
        headers: getAdminHeaders(accessToken)
      });

      const projects = response.json.data;
      
      // Return projects in format for dynamic dropdown
      return projects.map(project => ({
        id: project.id,
        name: project.name
      }));
    },

    sample: {
      name: 'my-pinecone-project',
      id: 'project-12345'
    }
  }
};

module.exports = listProjects;
