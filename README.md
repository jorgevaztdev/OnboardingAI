# 📊 Rapid Feedback Insights Tool

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A simple but powerful web application designed for Product Managers to quickly analyze, categorize, and summarize raw user feedback using the power of Google's Gemini LLM. This tool turns unstructured qualitative data into actionable, structured insights in seconds.

## The Problem

Product Managers are constantly inundated with user feedback from various sources: App Store reviews, customer surveys, support tickets, and social media comments. Manually sifting through this mountain of text is incredibly time-consuming and inefficient. It creates a significant delay between receiving feedback and deriving the actionable insights needed to make informed product decisions.

## The Solution

This tool provides a simple interface to paste raw user feedback and leverage a Large Language Model to automate the entire analysis process. It acts as an AI assistant for the PM, providing instant structure and clarity to the voice of the customer.

### Features

* ✅ **Instant Sentiment Analysis:** Automatically classifies each piece of feedback as `Positive`, `Negative`, or `Neutral`.
* 🗂️ **Automatic Categorization:** Sorts feedback into key PM-relevant categories like `Bug Report`, `Feature Request`, `UI/UX Feedback`, etc.
* 📝 **Concise Summaries:** Generates a one-sentence summary for each feedback entry, perfect for quick scanning.
* 📈 **Executive Summary:** Creates a high-level overview of all the feedback, highlighting key themes and urgent issues for stakeholders.

## Demo

## Tech Stack

* **Language:** Python
* **Web Framework:** [Streamlit](https://streamlit.io/)
* **LLM:** [Google Gemini Pro](https://ai.google.dev/)
* **Libraries:** `google-generativeai`, `pandas`

## Local Setup and Installation

Follow these steps to run the project on your local machine.

#### 1. Clone the Repository

#bash git clone [https://github.com/jorgevaztdev/feedback_analyzer.git](https://github.com/jorgevaztdev/feedback_analyzer.git)
cd feedback_analyzer

# Create the environment
python3 -m venv .venv

# Activate the environment
source .venv/bin/activate

#Install all the required Python libraries using the requirements.txt file.
pip install -r requirements.txt
