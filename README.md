# Custom Email Sender Application
This project is a custom email-sending tool with a front-end dashboard, developed for a skills assessment in machine learning, API integration, and user-friendly design.

Key Features
Data Input: Connects to Google Sheets or uploads CSV files for email data.
Email Customization: Customizable prompts using placeholders (e.g., {Company Name}, {Location}).
Scheduling & Throttling: Options to schedule email sends and control the sending rate.
Analytics Dashboard: Real-time insights on sent, pending, failed emails and delivery tracking.
ESP Integration: Tracks delivery status using SendGrid, Amazon SES, or Mailgun.
Setup and Usage
Clone the Repository: git clone <repository-url>
Install Dependencies: npm install
Configure: Add environment variables for database, ESP API key, and LLM access.
Run the Application: npm start
