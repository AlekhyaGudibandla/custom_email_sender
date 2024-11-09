import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({ total: 0, sent: 0, pending: 0, failed: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await axios.get('http://localhost:5000/api/analytics');
      setAnalytics(response.data);
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Email Analytics</h2>
      <ul>
        <li>Total Emails: {analytics.total}</li>
        <li>Sent Emails: {analytics.sent}</li>
        <li>Pending Emails: {analytics.pending}</li>
        <li>Failed Emails: {analytics.failed}</li>
      </ul>
    </div>
  );
};

export default Dashboard;