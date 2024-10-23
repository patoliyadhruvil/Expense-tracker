  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import AddExpense from '../AddExpense/AddExpense';


  const Expenses = () => {
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
      fetchEntries();
    }, []);

    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/expenses');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    const handleExpenseAdded = async (newEntry) => {
      try {
        const response = await axios.post('http://localhost:5000/expenses', newEntry);
        setEntries((prevEntries) => [...prevEntries, response.data]);
      } catch (error) {
        console.error('Error adding entry:', error);
      }
    };

    const deleteEntry = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/expenses/${id}`);
        setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    };

    const deleteAllEntries = async () => {
      try {
        await axios.delete('http://localhost:5000/expenses');
        setEntries([]);
      } catch (error) {
        console.error('Error deleting all entries:', error);
      }
    };

    const filteredEntries = entries.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || entry.type === filterType;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="expenses-container">
        <h1>Income and Expenses</h1>
        
        <AddExpense onExpenseAdded={handleExpenseAdded} />

        <button onClick={deleteAllEntries} style={{ marginBottom: '10px' }}>
          Delete All Entries
        </button>
        <div className="expenses-actions">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.title}</td>
                <td>${entry.amount}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.type}</td>
                <td>{entry.category}</td>
                <td>
                  <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default Expenses;
