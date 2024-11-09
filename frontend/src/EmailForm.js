import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailId = uuidv4();
    try {
      const response = await axios.post('http://localhost:5000/api/emails', {
        id: emailId,
        to,
        subject,
        body,
      });
      setMessage('Email sent successfully!');
      setTo('');
      setSubject('');
      setBody('');
      setReminderTime('');

      if (reminderTime) {
        const reminderInMs = parseInt(reminderTime) * 60 * 1000;
        setTimeout(() => {
          alert(`Reminder: Follow up on your email to ${to}`);
        }, reminderInMs);
      }
    } catch (error) {
      setMessage('Error sending email. Please try again.');
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/feedback', { feedback });
      setFeedback('');
      alert('Thank you for your feedback!');
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Send an Email</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminder">Set a Reminder (in minutes):</label>
          <input
            type="number"
            className="form-control"
            id="reminder"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            placeholder="Enter minutes"
          />
        </div>
        <div className="form-group">
          <ReactQuill value={body} onChange={setBody} placeholder="Email Body" />
        </div>
        <button type="submit" className="btn btn-primary">Send Email</button>
      </form>

      <div className="mt-4">
        <h4>Feedback</h4>
        <textarea
          className="form-control"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button onClick={handleFeedbackSubmit} className ="btn btn-secondary mt-2">Submit Feedback</button>
      </div>
    </div>
  );
};

export default EmailForm;