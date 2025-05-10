import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const createUser = async () => {
    if (!newUser.email || !newUser.role) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      await axios.post('/api/users', newUser);
      fetchUsers();
      setNewUser({ email: "", role: "" });
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const editUser = async (id, updatedUser) => {
    try {
      await axios.put(`/api/users/${id}`, updatedUser);
      fetchUsers();
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Usuarios</h1>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Rol</label>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="form-control"
        >
          <option value="">Seleccionar Rol</option>
          <option value="Admin">Admin</option>
          <option value="Alumno">Alumno</option>
          <option value="Inversionista">Inversionista</option>
        </select>
      </div>
      <button onClick={createUser} className="btn btn-primary">Crear Usuario</button>

      <hr />

      <h2>Lista de Usuarios</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.email} - {user.role}
            <div>
              <button
                onClick={() => setNewUser({ email: user.email, role: user.role })}
                className="btn btn-warning btn-sm me-2"
              >
                Editar
              </button>
              <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Botón para guardar cambios */}
      {newUser.email && (
        <button onClick={() => editUser(user.id, newUser)} className="btn btn-success">Guardar Cambios</button>
      )}
    </div>
  );
};

export default AdminUsers;
