import os
from typing import List, Dict
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# Import the SDK for your chosen LLM
from google import genai 
from google.genai import types

# --- Configuration ---
# Set up your API Keys securely (e.g., using environment variables)
LLM_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY") 
print("LLM_API_KEY:", LLM_API_KEY)
# Placeholder for the third-party trend API key
TREND_API_KEY = os.environ.get("TREND_API_KEY", "YOUR_TREND_API_KEY") 

# --- Initialize Gemini Client ---
try:
    # genai.configure(api_key=LLM_API_KEY)
    # llm_client = genai.Client()
    llm_client = genai.Client()
except Exception as e:
    print(f"Error initializing Gemini client: {e}")
    llm_client = None

# --- FastAPI App Instance ---
app = FastAPI(
    title="AI Social Content Generator",
    description="Generates social media content based on trending keywords using Gemini.",
)


# --- Pydantic Data Model for Request Body ---
class ContentRequest(BaseModel):
    """Defines the input parameters for the content generation endpoint."""
    topic: str  # The general topic (e.g., "skincare tips")
    platform: str  # The target platform (e.g., "Instagram", "TikTok")
    count: int = 3  # The number of content ideas to generate

# --- Core Logic Functions ---

# 1. Trend Fetcher (Simulated)
def fetch_trending_keywords(topic: str, platform: str) -> List[str]:
    """
    SIMULATION: In a real app, this function would call a third-party
    API (like the one discussed previously) to get real-time keywords.
    """
    if TREND_API_KEY == "YOUR_TREND_API_KEY":
        # Using mock data for demonstration purposes if the key isn't set
        print("Using mock trending keywords.")
        if "skincare" in topic.lower():
            return ["#retinolhacks", "#skinbarrier", "#ceramides"]
        elif "marketing" in topic.lower():
            return ["#shortformvideo", "#aicontent", "#socialstrategy"]
        return ["#trending", "#viral", "#newideas"]
    
    # --- REAL API CALL Placeholder ---
    # Replace this with a working 'requests' call to a service like RapidAPI
    # that returns trending tags for your topic.
    # try:
    #     url = "https://your-trend-api.com/search"
    #     headers = {"X-API-Key": TREND_API_KEY}
    #     params = {"q": topic, "platform": platform}
    #     response = requests.get(url, headers=headers, params=params, timeout=10)
    #     response.raise_for_status()
    #     # Assuming the API returns a list of keyword strings
    #     return response.json().get('trending_keywords', [])
    # except Exception as e:
    #     print(f"Error fetching trends: {e}")
    #     return []


# 2. AI Content Generator
async def generate_content_with_ai(topic: str, platform: str, keywords: List[str], count: int) -> str:
    """
    Generates content using the Gemini LLM based on the topic and keywords.
    """
    if llm_client is None:
        raise ValueError("AI Client is not initialized. Check API Key.")

    # 1. Construct the detailed prompt
    keyword_list = ", ".join(keywords)
    prompt = f"""
    You are an expert social media copywriter for the {platform} platform.
    Your task is to generate {count} highly engaging and viral content ideas.

    Topic: {topic}
    Target Platform: {platform}
    Current Trending Keywords to incorporate: {keyword_list}

    For each idea, provide:
    1. A short, catchy Title/Hook.
    2. A brief Caption/Script Outline (max 50 words).
    3. The top 5 relevant Hashtags (must include the trending ones).

    Format the output as a numbered list of ideas.
    """

    # 2. Call the Gemini API
    try:
        # response = await llm_client.generate_content(
        #     model='gemini-2.5-flash', # Fast and capable for this task
        #     contents=prompt,
        # )
        # return response.text
        # The client gets the API key from the environment variable `GEMINI_API_KEY`.
        response = llm_client.models.generate_content( model="gemini-2.5-flash", contents=prompt)
        return response.text
    except Exception as e:
        print(f"LLM Generation Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate content with AI.")


# --- FastAPI Endpoint ---

@app.post("/generate_social_content", response_model=Dict)
async def create_social_content(request: ContentRequest):
    """
    Endpoint that accepts a topic, fetches trends, and generates social media content.
    """
    try:
        # Step 1: Fetch trending keywords
        trending_keywords = fetch_trending_keywords(request.topic, request.platform)
        
        if not trending_keywords:
            # Proceed even if trend fetching fails, but warn the user.
            print("Warning: Could not fetch real-time trends. Generating content based on topic only.")
        
        # Step 2: Generate content using AI
        content_output = await generate_content_with_ai(
            topic=request.topic, 
            platform=request.platform, 
            keywords=trending_keywords, 
            count=request.count
        )
        
        return {
            "status": "success",
            "topic": request.topic,
            "platform": request.platform,
            "keywords_used": trending_keywords,
            "generated_content": content_output,
        }

    except HTTPException as e:
        raise e
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        # Catch any unexpected errors
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

# --- Running the API ---
# To run this API locally, save the code as main.py and execute:
# uvicorn main:app --reload