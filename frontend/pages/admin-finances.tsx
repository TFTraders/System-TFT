import React, { useState } from 'react';

const AdminFinances = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ type: "Ingreso", amount: 0, description: "" });

  const addTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({ type: "Ingreso", amount: 0, description: "" });
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Finanzas</h1>
      <div className="mb-3">
        <label>Tipo</label>
        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          className="form-control"
        >
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Monto</label>
        <input
          type="number"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label>
        <input
          type="text"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          className="form-control"
        />
      </div>
      <button onClick={addTransaction} className="btn btn-primary">Agregar Transacción</button>

      <hr />

      <h2>Historial de Transacciones</h2>
      <ul className="list-group">
        {transactions.map((transaction, index) => (
          <li key={index} className="list-group-item">
            {transaction.type}: ${transaction.amount} - {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFinances;
