# Backend Service - AI Social Content Generator

This directory contains the Python backend service responsible for generating AI-powered social media content. It's built using FastAPI and leverages the Google Gemini large language model.

## Architecture

The backend is designed as a simple, single-file microservice with a clear separation of concerns:

1.  **API Layer (FastAPI)**: Exposes a single endpoint to receive content generation requests. It handles HTTP request/response logic and data validation.
2.  **Data Validation (Pydantic)**: Ensures that incoming requests are correctly formatted before any processing occurs.
3.  **Core Logic**: A set of functions that perform the main tasks:
    *   Fetching trending keywords (currently simulated).
    *   Generating a detailed prompt for the AI.
    *   Calling the external AI service to generate content.
4.  **External Service Integration**: Connects to the Google Gemini API to perform the core content generation.

The flow is as follows:
`Client Request` -> `FastAPI Endpoint` -> `Fetch Trends` -> `Generate Content with AI` -> `FastAPI Response`

## Key Components & Technologies

*   **Framework**: **FastAPI** is used for its high performance and ease of use in building APIs with automatic data validation and documentation.
*   **Language**: **Python 3**
*   **AI Model**: **Google Gemini** (specifically `gemini-2.5-flash`) is used for its speed and creative text generation capabilities. The `google-generativeai` SDK is used to interact with the API.
*   **Data Validation**: **Pydantic** is used within FastAPI to define the structure and data types of incoming requests (`ContentRequest` model).
*   **Web Server**: **Uvicorn** is the recommended ASGI server for running the FastAPI application.
*   **HTTP Client**: The `requests` library is included as a placeholder for making calls to a real-time trend-fetching API.

## API Endpoint

### `POST /generate_social_content`

This is the main endpoint that generates social media content.

**Request Body:**

```json
{
  "topic": "skincare tips",
  "platform": "Instagram",
  "count": 3
}
```

*   `topic` (str): The general topic for content generation.
*   `platform` (str): The target social media platform (e.g., "TikTok", "Instagram").
*   `count` (int, optional): The number of content ideas to generate. Defaults to 3.

**Success Response (200 OK):**

```json
{
    "status": "success",
    "topic": "skincare",
    "platform": "Instagram",
    "keywords_used": ["#retinolhacks", "#skinbarrier", "#ceramides"],
    "generated_content": "1. Title: Unlock Your Glow with Retinol!..."
}
```

## Configuration

The service requires API keys to be configured as environment variables for security:

*   `GEMINI_API_KEY`: Your API key for the Google Gemini service.
*   `TREND_API_KEY`: A placeholder for a third-party trend-fetching API. If not set, the application will use mock keyword data.

## How to Run

1.  Install the required Python packages: `pip install -r requirements.txt` (Note: a `requirements.txt` would need to be created from the dependencies).
2.  Set the required environment variables (at a minimum, `GEMINI_API_KEY`).
3.  Run the application using Uvicorn:

    ```bash
    uvicorn main:app --reload
    ```