# Pinecone Assistant Integration

A powerful AI assistant integration for Pinecone Assistant.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Test the integration:

   ```bash
   npm test
   ```

## Features

- **Authentication**: API key-based authentication with Pinecone Assistant
- **Create Assistant**: Create new Pinecone Assistants with custom instructions
- **Update Assistant**: Modify existing assistant instructions and metadata
- **Delete Assistant**: Remove existing assistants
- **Upload Document**: Upload documents to assistants for context-aware responses
- **List Assistants**: Search and list all available assistants in your project
- **Check Assistant Status**: Get detailed status and information for a specific assistant
- **List Files**: List all files uploaded to a specific assistant
- **Describe File**: Get detailed status and metadata of a specific file
- **Chat with Assistant**: Chat with assistants and get citations in structured form
- **Retrieve Context**: Retrieve context snippets for RAG or agentic workflows
- **Evaluate Answer**: Evaluate correctness and completeness of assistant responses
- **New Assistant Trigger**: Triggers when a new assistant is created
- **New File Trigger**: Triggers when a new file is uploaded to an assistant
- **File Status Change Trigger**: Triggers when a file's processing status changes

## Configuration

You'll need a Pinecone API key to use this integration. You can find this in your [Pinecone dashboard](https://app.pinecone.io).

## Development

This integration follows the standard app structure:

- `index.js` - Main app configuration
- `authentication.js` - Authentication configuration
- `creates/` - Create operations (Assistant and Document)
- `searches/` - Search operations (List Assistants, Chat, etc.)
- `triggers/` - Trigger operations (New Assistant)
- `test/` - Test files

## Available Actions

### Create Assistant

Creates a new Pinecone Assistant with:

- Name (required)
- Custom instructions (optional)

### Update Assistant

Updates an existing assistant with:

- Assistant Name (required)
- Instructions (required) - New instructions for the assistant
- Metadata (optional) - JSON string of metadata to update

### Delete Assistant

Deletes an existing assistant with:

- Assistant Name (required)

### Upload Document

Uploads documents to an existing assistant with:

- Assistant ID (required)
- Document file (required)
- Optional metadata

### List Assistants

Lists all available assistants in your project with:

- No input fields required
- Returns assistant details including name, instructions, status, and timestamps

### Check Assistant Status

Gets detailed status and information for a specific assistant with:

- Assistant Name (required)
- Returns complete assistant details including status, instructions, metadata, host, and timestamps

### List Files

Lists all files uploaded to a specific assistant with:

- Assistant Name (required)
- Metadata Filter (optional) - JSON-encoded metadata filter for files
- Returns file details including name, ID, metadata, status, processing progress, and timestamps

### Describe File

Gets detailed status and metadata of a specific file with:

- Assistant Name (required)
- File ID (required) - The UUID of the file to describe
- Include Signed URL (optional) - Whether to include the signed URL in the response
- Returns complete file details including status, processing progress, download URL, and error messages

### Chat with Assistant

Chat with an assistant and get citations in structured form with:

- Assistant Name (required)
- Message (required) - The message to send to the assistant
- Model (optional) - LLM model to use (GPT-4o, Claude, Gemini, etc.)
- Temperature (optional) - Controls randomness (0 = deterministic)
- Stream Response (optional) - Whether to stream responses
- JSON Response (optional) - Whether to return JSON format
- Include Highlights (optional) - Whether to include document highlights
- Document Filter (optional) - JSON filter to limit document retrieval
- Returns assistant response with citations, usage stats, and referenced documents

### Retrieve Context Snippets

Retrieve context snippets from an assistant for RAG or agentic workflows with:

- Assistant Name (required)
- Query (optional) - The query to generate context from
- Messages (optional) - JSON array of messages (alternative to query)
- Top K (optional) - Maximum snippets to return (default: 16, max: 64)
- Snippet Size (optional) - Maximum snippet size in tokens (default: 2048)
- Document Filter (optional) - JSON filter to limit document retrieval
- Returns context snippets with scores, file references, and page numbers

### Evaluate Answer

Evaluate the correctness and completeness of assistant responses with:

- Question (required) - The question for which the answer was generated
- Generated Answer (required) - The answer from the assistant or RAG system
- Ground Truth Answer (required) - The correct answer for comparison
- Returns evaluation metrics including correctness, completeness, alignment scores, and detailed reasoning

## Available Triggers

### New Assistant

Triggers when a new assistant is created with:

- No input fields required
- Returns assistant details including name, instructions, status, host, and timestamps
- Polling trigger that checks for new assistants periodically

### New File

Triggers when a new file is uploaded to an assistant with:

- Assistant Name (required) - The name of the assistant to monitor for new files
- Returns file details including name, ID, metadata, status, processing progress, and timestamps
- Polling trigger that checks for new files in the specified assistant

### File Status Change

Triggers when a file's processing status changes with:

- Assistant Name (required) - The name of the assistant to monitor for file status changes
- Status Filter (optional) - Only trigger for specific status changes (Available, Failed, Processing, Deleting)
- Returns file details including name, ID, metadata, status, processing progress, and timestamps
- Polling trigger that monitors file processing status changes
