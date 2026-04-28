# CivicAI: Your Intelligent Election Assistant

CivicAI is a smart, dynamic web application designed to help voters understand the election process, track timelines, and seamlessly locate their polling stations. Built for the Google Services integration hackathon, it demonstrates how AI and specialized civic data APIs can demystify the often confusing voting process.

## 🎯 Chosen Vertical
**Civic Engagement & Information Accessibility**
Understanding how, when, and where to vote is a fundamental right, yet the process is often fragmented and state-dependent in the US and globally. CivicAI tackles this vertical by providing a unified, accessible, and intelligent interface to guide voters.

## 💡 Approach and Logic
The application is structured into two core interactive features to provide a complete "Election Assistant" experience:

1.  **The Smart Assistant (Gemini API Integration):**
    *   **Logic:** A chatbot interface that uses Google's Gemini 2.5 Flash model. It is heavily prompt-engineered via system instructions to remain strictly non-partisan, neutral, and focused purely on the *process* of voting (e.g., registration rules, types of IDs needed, absentee ballots).
    *   **UI/UX:** A persistent sidebar chat window that allows users to ask questions while browsing other sections of the site.

2.  **The Polling Locator (Google Civic Information API Integration):**
    *   **Logic:** Users input their registered voting address. The backend securely calls the Google Civic Information API (`voterInfoQuery` endpoint) to retrieve structured data about election day polling places, early voting sites, and their operating hours.
    *   **UI/UX:** A clean search interface that handles loading states, potential address errors, and renders the complex API JSON into easy-to-read cards.

## 🛠️ Technology Stack
*   **Framework:** Next.js (App Router)
*   **Styling:** Vanilla CSS (CSS Modules) with a modern "Glassmorphism" aesthetic, CSS variables for theming, and responsive design.
*   **AI Service:** `@google/generative-ai` (Gemini API)
*   **Civic Data:** Google Civic Information API
*   **Icons:** `react-icons`

## 🚀 How the Solution Works
1.  **Frontend:** The user lands on the Next.js application, styled with rich gradients and glass panels.
2.  **Interaction 1 (Chat):** The user types a question in the assistant. The Next.js frontend sends a POST request to the local Next.js API route (`/api/chat`). The route instantiates the Gemini model with system prompts and returns the AI's response to the client.
3.  **Interaction 2 (Locator):** The user enters their address. The frontend sends a GET request to (`/api/civic`). The backend securely attaches the Google Cloud API key and queries the Google Civic Information API, parses the response, and sends it back to the frontend to render the location cards.

## ⚠️ Assumptions Made
*   **Region Focus:** The Google Civic Information API is primarily focused on the United States. Therefore, the "Polling Locator" feature assumes a US address for live data. The AI Assistant can answer general questions globally but will defer to local authorities for specifics.
*   **Mock Data Fallback:** For demonstration and review purposes, if the API keys (`GEMINI_API_KEY` and `GOOGLE_CIVIC_API_KEY`) are *not* provided in the `.env.local` file, the application gracefully degrades to using realistic mock data so reviewers can still evaluate the UI and logical flow.

## 🏃‍♂️ Running the Project Locally

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Setup
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the root directory based on `.env.local.example`:
    ```env
    # Get your Gemini API key from Google AI Studio
    GEMINI_API_KEY=your_gemini_api_key_here

    # Get your Civic Information API key from Google Cloud Console
    # Make sure to enable the "Google Civic Information API"
    GOOGLE_CIVIC_API_KEY=your_google_cloud_api_key_here
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ Evaluation Criteria Addressed
*   **Code Quality:** Component-based architecture, clean CSS modules, separate API route handlers.
*   **Security:** API keys are kept securely on the server-side (Next.js API routes) and are never exposed to the client browser.
*   **Accessibility:** Semantic HTML structure, high contrast text, `aria-labels` on inputs and buttons, and focus states managed via CSS.
*   **Google Services:** Meaningful, dual integration of Gemini API (for conversational intelligence) and Google Civic Information API (for real-world data).
