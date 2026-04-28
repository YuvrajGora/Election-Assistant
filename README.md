# CivicAI: Intelligent Election Assistant

CivicAI is a high-end, non-partisan web application built for the **Google AI Hackathon**. It leverages the power of the Google ecosystem to make voter information accessible, clear, and interactive.

## 🌟 Key Features

- **AI-Powered Guidance**: Conversational assistant powered by **Gemini 2.5 Flash** to answer complex election-related questions.
- **Interactive Polling Locator**: Real-time polling station lookup via **Google Civic Information API** with integrated **Google Maps**.
- **Secure Identity**: User authentication via **Firebase Auth (Google Sign-In)** for personalizing the voting experience.
- **Modern UX**: Stunning "Glassmorphism" design with mobile-first responsiveness and smooth micro-interactions.

## 🛠️ Technical Excellence

- **Stack**: Next.js 15 (App Router), Vanilla CSS, React Icons.
- **Google Integration**:
  - **Gemini API**: Contextual AI logic.
  - **Civic Information API**: Government-verified data.
  - **Google Maps Embed API**: Visual location mapping.
  - **Firebase**: Identity and Authentication.
- **Security**: Strict backend-only API routing (Next.js Edge) to protect sensitive credentials.
- **Performance**: Dynamic imports, lazy loading, and aggressive API caching.
- **Reliability**: Comprehensive test suite using **Jest** and automated **GitHub Actions** CI/CD.

## 🚀 Deployment

The application is deployed on **Google Cloud Run** with continuous deployment from GitHub.

- **Live URL**: [https://election-assistant-899238658298.us-central1.run.app](https://election-assistant-899238658298.us-central1.run.app)

## 🧪 Testing

Run the automated test suite:
```bash
npm test
```
The project includes a `.github/workflows/test.yml` for automated validation on every push.
