import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Monta la aplicacion y le dice que debe de mostrar
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Assetion not null non null assertion operator
// colocar al final un ! para asegurar a ts que no es nulo
