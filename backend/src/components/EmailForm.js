// src/components/EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const EmailForm = () => {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if a file is uploaded
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    // Parse the CSV file
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        // Loop through each row in the parsed CSV data
        for (const row of results.data) {
          // Replace placeholders in the email body
          const emailBody = body
            .replace('{Company Name}', row.companyName || '')
            .replace('{Location}', row.location || '');

          try {
            // Send email for each row
            await axios.post('http://localhost:5000/api/email/send', {
              recipient: row.email,
              subject: subject,
              body: emailBody,
            });
          } catch (error) {
            console.error("Error sending email to:", row.email, error);
          }
        }
        alert("Emails sent successfully!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Email Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Send Emails</button>
    </form>
  );
};

export default EmailForm;