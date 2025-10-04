/**
 * Utility functions for creating consistent headers across all Pinecone API calls
 */

/**
 * Creates headers for POST requests to Pinecone APIs
 * @param {Object} bundle - Zapier bundle object containing authData
 * @returns {Object} Headers object for POST requests
 */
const getPostHeaders = (bundle) => {
  return {
    'Content-Type': 'application/json',
    'X-Pinecone-Api-Version': '2025-04',
    'sourceTag': 'zapier:assistant',
    'Api-Key': bundle.authData.api_key
  };
};

/**
 * Creates headers for GET requests to Pinecone APIs
 * @param {Object} bundle - Zapier bundle object containing authData
 * @returns {Object} Headers object for GET requests
 */
const getGetHeaders = (bundle) => {
  return {
    'X-Pinecone-Api-Version': '2025-04',
    'sourceTag': 'zapier:assistant',
    'Api-Key': bundle.authData.api_key
  };
};

/**
 * Creates headers for Admin API requests (uses Bearer token)
 * @param {string} accessToken - OAuth access token
 * @returns {Object} Headers object for Admin API requests
 */
const getAdminHeaders = (accessToken) => {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-Pinecone-Api-Version': '2025-04'
  };
};

/**
 * Creates headers for Admin API POST requests
 * @param {string} accessToken - OAuth access token
 * @returns {Object} Headers object for Admin API POST requests
 */
const getAdminPostHeaders = (accessToken) => {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-Pinecone-Api-Version': '2025-04',
    'Content-Type': 'application/json'
  };
};

module.exports = {
  getPostHeaders,
  getGetHeaders,
  getAdminHeaders,
  getAdminPostHeaders
};
