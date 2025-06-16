# app.py
import streamlit as st
import google.generativeai as genai
import pandas as pd

# --- PAGE CONFIGURATION (FIX) ---
# This function MUST be the first Streamlit command in the script.
st.set_page_config(page_title="Rapid Feedback Insights", page_icon="📊")

# --- API Key Configuration ---
# Try to configure the API key from Streamlit's secrets.
try:
    genai.configure(api_key=st.secrets["GOOGLE_API_KEY"])
except (FileNotFoundError, KeyError):
    # If not found, show a warning and a field to enter it manually.
    # This is useful for local development if you don't want to use a secrets.toml file.
    st.warning("API key not found. Please enter it below to continue.")
    api_key_input = st.text_input("Enter your Google AI API Key:", type="password", key="api_key_input")
    if api_key_input:
        genai.configure(api_key=api_key_input)

# --- Model and Prompt Configuration ---

PROMPT = """
As a Product Management assistant, analyze the following user feedback entries. 
For each entry, provide:
1.  **Sentiment**: Classify as 'Positive', 'Negative', or 'Neutral'.
2.  **Category**: Classify into one of these categories: 'Bug Report', 'Feature Request', 'UI/UX Feedback', 'Performance Issue', or 'General Comment'.
3.  **One-Sentence Summary**: A concise summary of the feedback point.

After analyzing all entries, provide a final "Executive Summary" of the key themes and most urgent issues.

Present the output for each entry in a structured format. The final output should be a valid JSON object, where the main key is 'feedback_analysis' containing a list of individual feedback results, and another key 'executive_summary' for the overall summary.
"""

# Function to call the Gemini API
def analyze_feedback(feedback_text):
    """
    Sends the feedback text to the Gemini model for analysis.
    """
    # Check if the API key is configured before making the call.
    if not genai.get_key():
        st.error("The Google AI API key is not configured. Please enter it in the field above.")
        return None
        
    model = genai.GenerativeModel('gemini-pro')
    full_prompt = PROMPT + feedback_text
    
    try:
        response = model.generate_content(full_prompt)
        cleaned_json_string = response.text.replace("```json", "").replace("```", "").strip()
        return cleaned_json_string
    except Exception as e:
        st.error(f"An error occurred during analysis: {e}")
        return None

# --- Streamlit App User Interface ---

st.title("📊 Rapid Feedback Insights Tool")
st.write("For Product Managers. Paste your user feedback below to get instant analysis and categorization.")

# Text area for user input
user_feedback = st.text_area("Paste raw feedback here (one entry per line):", height=200, placeholder="Example:\nThe login button is broken after the last update.")

if st.button("Analyze Feedback"):
    if user_feedback:
        if genai.get_key():
            with st.spinner("The AI is analyzing the feedback... This might take a moment."):
                analysis_result_json = analyze_feedback(user_feedback)
                
                if analysis_result_json:
                    try:
                        data = pd.read_json(analysis_result_json, orient='index').transpose()

                        st.success("Analysis Complete!")
                        st.subheader("Executive Summary")
                        st.write(data['executive_summary'].iloc[0])

                        st.subheader("Detailed Analysis")
                        feedback_df = pd.DataFrame(data['feedback_analysis'].iloc[0])
                        st.dataframe(feedback_df)
                        
                    except (ValueError, KeyError) as e:
                        st.error(f"Failed to process the AI's response. It might not be valid JSON. Error: {e}")
                        st.write("Raw AI response:")
                        st.text(analysis_result_json)
        else:
            st.warning("Please enter your API key above to perform the analysis.")
    else:
        st.warning("Please paste some feedback to analyze.")