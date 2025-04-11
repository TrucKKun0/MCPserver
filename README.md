# MCP Twitter Integration

This project integrates Twitter functionality using the Model Context Protocol (MCP).

## Project Structure

- `/client` - Frontend application
- `/server` - Backend server

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Add your Twitter API credentials

4. Start the development servers:
   ```bash
   # Start server
   cd server
   npm run dev

   # Start client (in a new terminal)
   cd client
   npm run dev
   ```

## Environment Variables

Server requires the following environment variables:
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`