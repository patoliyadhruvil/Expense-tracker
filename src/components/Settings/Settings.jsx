import React, { useState } from 'react';
import axios from 'axios';  

const Settings = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notificationPreference, setNotificationPreference] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const updatedSettings = {
        email,
        password: newPassword,
        notifications: notificationPreference,
      };

      const response = await axios.put('http://localhost:5000/users/1', updatedSettings);
      setMessage('Settings updated successfully!');
      console.log('Updated settings:', response.data);
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      {message && <p className="settings-message">{message}</p>}
      <form className="settings-form" onSubmit={handleUpdateSettings}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={notificationPreference}
              onChange={(e) => setNotificationPreference(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default Settings;
