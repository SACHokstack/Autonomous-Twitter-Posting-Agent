# Autonomous Twitter Posting Agent

An AI-powered Twitter automation agent built with ElizaOS that can autonomously create and post tweets based on configured parameters and personality.

## Features

- 🤖 Autonomous tweet generation using AI models (OpenAI, Google Gemini, etc.)
- 🐦 Direct Twitter integration via Twitter API
- 🎭 Customizable character/personality for unique tweet styles
- 📊 Analytics and performance tracking
- 🔄 Scheduled posting with configurable intervals
- 🎯 Targeted content based on trends and topics
- 📱 Responsive web dashboard for monitoring
- 🧪 Comprehensive testing suite (component + e2e)
- 🐳 Docker support for easy deployment
- 🚀 Railway deployment ready

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Twitter Developer Account with API v2 access
- GitHub account for deployment

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/SACHokstack/Autonomous-Twitter-Posting-Agent.git
cd Autonomous-Twitter-Posting-Agent

# Install dependencies
bun install

# Copy environment configuration
cp .env.example .env

# Configure your Twitter API keys in .env
# Get keys from https://developer.twitter.com/

# Start development server
elizaos dev
```

### Environment Configuration

Edit `.env` file with your credentials:

```env
# Twitter API Configuration
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret

# AI Model Configuration (choose one)
OPENAI_API_KEY=your_openai_key
GOOGLE_GENAI_API_KEY=your_google_key
OLLAMA_BASE_URL=http://localhost:11434

# Posting Configuration
POSTING_INTERVAL_MINUTES=60
MAX_TWEETS_PER_DAY=24
TIMEZONE=America/New_York
```

## Development

```bash
# Start development with hot-reloading (recommended)
elizaos dev

# OR start without hot-reloading
elizaos start
# Note: When using 'start', you need to rebuild after changes:
# bun run build

# Test the project
elizaos test
```

## Testing

ElizaOS employs a dual testing strategy:

1. **Component Tests** (`src/__tests__/*.test.ts`)

   - Run with Bun's native test runner
   - Fast, isolated tests using mocks
   - Perfect for TDD and component logic

2. **E2E Tests** (`src/__tests__/e2e/*.e2e.ts`)
   - Run with ElizaOS custom test runner
   - Real runtime with actual database (PGLite)
   - Test complete user scenarios

### Test Structure

```
src/
  __tests__/              # All tests live inside src
    *.test.ts            # Component tests (use Bun test runner)
    e2e/                 # E2E tests (use ElizaOS test runner)
      project-starter.e2e.ts  # E2E test suite
      README.md          # E2E testing documentation
  index.ts               # Export tests here: tests: [ProjectStarterTestSuite]
```

### Running Tests

- `elizaos test` - Run all tests (component + e2e)
- `elizaos test component` - Run only component tests
- `elizaos test e2e` - Run only E2E tests

### Writing Tests

Component tests use bun:test:

```typescript
// Unit test example (__tests__/config.test.ts)
describe('Configuration', () => {
  it('should load configuration correctly', () => {
    expect(config.debug).toBeDefined();
  });
});

// Integration test example (__tests__/integration.test.ts)
describe('Integration: Plugin with Character', () => {
  it('should initialize character with plugins', async () => {
    // Test interactions between components
  });
});
```

E2E tests use ElizaOS test interface:

```typescript
// E2E test example (e2e/project.test.ts)
export class ProjectTestSuite implements TestSuite {
  name = 'project_test_suite';
  tests = [
    {
      name: 'project_initialization',
      fn: async (runtime) => {
        // Test project in a real runtime
      },
    },
  ];
}

export default new ProjectTestSuite();
```

The test utilities in `__tests__/utils/` provide helper functions to simplify writing tests.

## Deployment

### Railway (Recommended)

1. **Connect Repository**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway auto-detects the Node.js app

2. **Environment Variables**
   - Add all environment variables from `.env` in Railway dashboard
   - Ensure Twitter API keys are properly configured

3. **Deploy**
   - Push to main branch to trigger auto-deployment
   - Railway will build and deploy automatically

### Docker Deployment

```bash
# Build the image
docker build -t twitter-agent .

# Run locally
docker run -p 3000:3000 --env-file .env twitter-agent

# Or use docker-compose
docker-compose up
```

## Configuration

Customize your Twitter agent by modifying:

- `src/character.ts` - Define the agent's personality, topics, and posting style
- `src/index.ts` - Main entry point and plugin configuration
- `.env` - API keys and posting parameters

### Character Customization

Edit `src/character.ts` to define:

- **Personality**: How the agent should behave
- **Topics**: What subjects to tweet about
- **Style**: Writing tone and format
- **Bio**: Twitter profile description
- **Posting Rules**: When and what to post
