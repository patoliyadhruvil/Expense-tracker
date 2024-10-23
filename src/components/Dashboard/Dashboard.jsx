  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';


  const Dashboard = () => {
    const [entries, setEntries] = useState([]);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
      fetchEntries();
    }, []);

    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expenses');
        setEntries(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    const calculateTotals = (data) => {
      const totalIncome = data
        .filter(entry => entry.type === 'income')
        .reduce((sum, entry) => sum + entry.amount, 0);
      const totalExpenses = data
        .filter(entry => entry.type === 'expense')
        .reduce((sum, entry) => sum + entry.amount, 0);
      
      setIncome(totalIncome);
      setExpenses(totalExpenses);
      setBalance(totalIncome - totalExpenses);
    };

    const chartData = entries.map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      amount: entry.amount,
      type: entry.type,
    }));

    const aggregatedData = chartData.reduce((acc, curr) => {
      const existing = acc.find(item => item.date === curr.date);
      if (existing) {
        existing[curr.type] = (existing[curr.type] || 0) + curr.amount;
      } else {
        acc.push({ date: curr.date, [curr.type]: curr.amount });
      }
      return acc;
    }, []);

    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Income, Expenses, and Balance Boxes */}
        <div className="summary-container">
          <div className="summary-box income-box">
            <h3>Income</h3>
            <h2>${income}</h2>
          </div>
          <div className="summary-box expenses-box">
            <h3>Expenses</h3>
            <h2>${expenses}</h2>
          </div>
          <div className="summary-box balance-box">
            <h3>Balance</h3>
            <h2>${balance}</h2>
          </div>
        </div>

        <h2 className="chart-title">Income and Expenses Overview</h2>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aggregatedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  export default Dashboard;
