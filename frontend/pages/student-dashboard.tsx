import React from 'react';
import { Chart } from 'chart.js/auto';

const StudentDashboard = () => {
  React.useEffect(() => {
    // Inicializar gráfico de progreso
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
          datasets: [
            {
              label: 'Progreso (%)',
              data: [20, 40, 50, 60, 70],
              borderColor: '#750e25',
              backgroundColor: 'rgba(117, 14, 37, 0.5)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          scales: {
            x: { title: { display: true, text: 'Semanas' } },
            y: { title: { display: true, text: 'Progreso (%)' }, min: 0, max: 100 },
          },
        },
      });
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Panel del Alumno</h1>
      <p className="text-center">Bienvenido a tu panel. Aquí puedes acceder a tus clases, progreso y más.</p>

      <div className="row g-4 mt-5">
        {/* Clases */}
        <div className="col-md-4">
          <div className="card feature-card">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary mx-auto">
                <i className="fas fa-book"></i>
              </div>
              <h4>Clases</h4>
              <p className="card-text">Accede a tus clases programadas y revisa el material de estudio.</p>
              <a href="/academia" className="btn btn-primary">Ir a Clases</a>
            </div>
          </div>
        </div>

        {/* Progreso */}
        <div className="col-md-4">
          <div className="card feature-card">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-success mx-auto">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Progreso</h4>
              <p className="card-text">Monitorea tu progreso académico y obtén recomendaciones personalizadas.</p>
              <a href="/progreso" className="btn btn-success">Ver Progreso</a>
            </div>
          </div>
        </div>

        {/* Calendario */}
        <div className="col-md-4">
          <div className="card feature-card">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-info mx-auto">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h4>Calendario</h4>
              <p className="card-text">Consulta tu calendario de clases y eventos programados.</p>
              <a href="/calendario" className="btn btn-info">Ver Calendario</a>
            </div>
          </div>
        </div>
      </div>

      {/* Material Desbloqueado */}
      <div className="row g-4 mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4>Material Desbloqueado</h4>
              <ul className="list-group">
                <li className="list-group-item">📹 <a href="https://www.youtube.com/watch?v=example1" target="_blank">Video 1: Introducción</a></li>
                <li className="list-group-item">📄 <a href="assets/pdf/tema1.pdf" target="_blank">PDF: Tema 1</a></li>
                <li className="list-group-item">📹 <a href="https://www.youtube.com/watch?v=example2" target="_blank">Video 2: Estrategias Básicas</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Progreso */}
      <div className="row g-4 mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4>Gráfico de Progreso</h4>
              <canvas id="progressChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Historial de Encuestas y Tareas */}
      <div className="row g-4 mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4>Historial de Encuestas y Tareas</h4>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-06-01</td>
                    <td>Encuesta Emocional</td>
                    <td>Completada</td>
                  </tr>
                  <tr>
                    <td>2025-06-05</td>
                    <td>Tarea: Ejercicio de Álgebra</td>
                    <td>En Progreso</td>
                  </tr>
                  <tr>
                    <td>2025-06-10</td>
                    <td>Encuesta de Feedback</td>
                    <td>Pendiente</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
