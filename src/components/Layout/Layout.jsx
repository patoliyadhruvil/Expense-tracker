import React from 'react';
import { Link } from 'react-router-dom';


const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="logo">
          <h2>MyApp</h2>
        </div>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
