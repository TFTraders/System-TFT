import React, { useState } from 'react';
import BotAdmin from './bot-admin';

const AdminSystem = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'bot':
        return <BotAdmin />;
      case 'notifications':
        return <AdminNotifications />;
      case 'finances':
        return <AdminFinances />;
      case 'general-ai':
        return <AdminGeneralAI />;
      case 'calendar':
        return <AdminCalendar />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Panel Administrativo</h1>
      <p className="text-center">
        Gestiona usuarios, notificaciones, finanzas y más desde este panel.
      </p>

      <div className="row g-4 mt-5">
        <div className="col-md-4">
          <div className="card feature-card">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary mx-auto">
                <i className="fas fa-users"></i>
              </div>
              <h4>Usuarios</h4>
              <p className="card-text">
                Gestiona los usuarios del sistema, asigna roles y permisos.
              </p>
              <a
                href="/admin-users"
                className="btn btn-primary"
                onClick={() => setActiveSection('users')}
              >
                Gestionar Usuarios
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card feature-card">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-success mx-auto">
                <i className="fas fa-bell"></i>
              </div>
              <h4>Notificaciones</h4>
              <p className="card-text">
                Envía notificaciones programadas a los usuarios del sistema.
              </p>
              <a
                href="/admin-notifications"
                className="btn btn-success"
                onClick={() => setActiveSection('notifications')}
              >
                Gestionar Notificaciones
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card feature-card">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-info mx-auto">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h4>Finanzas</h4>
              <p className="card-text">
                Registra ingresos y egresos, y genera reportes financieros.
              </p>
              <a
                href="/admin-finances"
                className="btn btn-info"
                onClick={() => setActiveSection('finances')}
              >
                Gestionar Finanzas
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de la sección activa */}
      <div className="row mt-5">
        <div className="col">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

// Componentes de las secciones (simples placeholders por ahora)
const Dashboard = () => <h2>Dashboard</h2>;
const UserManagement = () => <h2>Gestión de Usuarios</h2>;
const AdminNotifications = () => <h2>Notificaciones</h2>;
const AdminFinances = () => <h2>Finanzas</h2>;
const AdminGeneralAI = () => <h2>IA General</h2>;
const AdminCalendar = () => <h2>Calendario</h2>;

export default AdminSystem;
