const authentication = require('./authentication');
const createAssistant = require('./creates/assistant');
const uploadDocument = require('./creates/document');
const updateAssistant = require('./creates/updateAssistant');
const deleteAssistant = require('./creates/deleteAssistant');
const listProjects = require('./searches/listProjects');
const listAssistants = require('./searches/assistant');
const describeAssistant = require('./searches/assistantStatus');
const listFiles = require('./searches/files');
const describeFile = require('./searches/fileStatus');
const chatAssistant = require('./searches/chat');
const retrieveContext = require('./searches/context');
const evaluateAnswer = require('./searches/evaluate');
const newAssistant = require('./triggers/newAssistant');
const newFile = require('./triggers/newFile');
const fileStatusChange = require('./triggers/fileStatusChange');

// To include the Authentication API Key header on all outbound requests, simply define the function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const addApiKeyHeader = (request, z, bundle) => {
  request.headers['Api-Key'] = bundle.authData.api_key;
  return request;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    addApiKeyHeader
  ],

  afterResponse: [
  ],

  resources: {
  },

  // If you want to define a search to go along with your creates...
  searches: {
    [listProjects.key]: listProjects,
    [listAssistants.key]: listAssistants,
    [describeAssistant.key]: describeAssistant,
    [listFiles.key]: listFiles,
    [describeFile.key]: describeFile,
    [chatAssistant.key]: chatAssistant,
    [retrieveContext.key]: retrieveContext,
    [evaluateAnswer.key]: evaluateAnswer
  },

  // If you want to define a create to go along with your searches...
  creates: {
    [createAssistant.key]: createAssistant,
    [uploadDocument.key]: uploadDocument,
    [updateAssistant.key]: updateAssistant,
    [deleteAssistant.key]: deleteAssistant
  },

  // If you want to define a trigger to go along with your creates/searches...
  triggers: {
    [newAssistant.key]: newAssistant,
    [newFile.key]: newFile,
    [fileStatusChange.key]: fileStatusChange
  }
};
