# GitHub Actions CI/CD Demo 🚀

A simple demonstration of GitHub Actions CI/CD pipeline with Node.js, TypeScript, and deployment to AWS EC2.

## Overview

This project demonstrates a basic CI/CD pipeline using GitHub Actions with:
- Simple Express.js API with TypeScript
- Automated testing with Jest
- GitHub Actions workflow
- AWS EC2 deployment

## Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Run in development**
```bash
npm run dev
```

3. **Access the API**
```
http://localhost:3000
```

## API Endpoints

- `GET /` - Welcome message (uses WELCOME_MESSAGE from .env)
- `GET /health` - Health check (uses HEALTH_MESSAGE from .env)
- `GET /api/message` - Simple API response (uses API_MESSAGE from .env)

All endpoints now display environment-specific messages from the .env file!

## Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build
npm run build
```

## GitHub Actions

The workflow runs on push to `dev` branch:
1. **Build and Test** - Lint, build TypeScript, run tests
2. **Deploy** - Deploy to AWS EC2 (only on dev branch)

## Setup for Deployment

1. **Configure GitHub Secrets:**
   - `EC2_HOST` - Your EC2 public IP
   - `EC2_USER` - SSH username (ec2-user or ubuntu)
   - `EC2_SSH_KEY` - Private SSH key content

2. **Setup EC2 instance:**
   - Install Node.js 18
   - Install PM2: `npm install -g pm2`
   - Create directory: `mkdir -p /var/www/github-actions-demo`

3. **Deploy:**
```bash
git checkout -b dev
git push origin dev
```

## Project Structure

```
src/
├── index.ts          # Main application
├── index.test.ts     # Tests
└── ...

.github/workflows/
└── ci-cd.yml         # GitHub Actions workflow
```

## Environment Variables

The application uses environment variables for different messages:

**Local Development (.env file):**
```bash
WELCOME_MESSAGE=Hello from Local Development! 🏠
API_MESSAGE=This is a local API response
HEALTH_MESSAGE=Local server is running fine!
```

**Deployed to EC2 (.env.dev content via GitHub Actions):**
```bash
WELCOME_MESSAGE=Hello from Development Environment! 🚀
API_MESSAGE=This is a development API response - deployed via GitHub Actions
HEALTH_MESSAGE=Development server is running fine! ✅
```

## Demo

1. **Local Development:**
```bash
npm run dev
# Visit http://localhost:3000 - shows local messages
```

2. **Deploy to EC2:**
```bash
git checkout -b dev
git push origin dev
# Watch GitHub Actions create .env and deploy
```

3. **Check Deployed App:**
```bash
curl http://your-ec2-ip:3000/
# Shows: "Hello from Development Environment! 🚀"
curl http://your-ec2-ip:3000/api/message
# Shows: "This is a development API response - deployed via GitHub Actions"
```

Perfect for learning GitHub Actions with environment-specific deployments! 🎯