import React, { useState } from 'react';

const RegistrarConsulta = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    peso: '',
    estatura: '',
    edad: '',
    sexo: '',
    estadoCivil: '',
    ocupacion: '',
    actividadFisica: '',
    sintomas: '', // Nuevo campo para los síntomas
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token'); // Suponiendo que el token se guarda en el localStorage
      const response = await fetch('http://localhost:5000/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agregar el token para la autenticación
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Consulta registrada exitosamente');
        console.log(data); // Puedes usar los datos para algún propósito adicional
        setFormData({
          cedula: '',
          peso: '',
          estatura: '',
          edad: '',
          sexo: '',
          estadoCivil: '',
          ocupacion: '',
          actividadFisica: '',
          sintomas: '', 
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al registrar la consulta');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Registrar Consulta</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Estatura (cm):</label>
          <input
            type="number"
            name="estatura"
            value={formData.estatura}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Sexo:</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label>Estado Civil:</label>
          <select
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleInputChange}
          >
            <option value="">Seleccione</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
          </select>
        </div>
        <div>
          <label>Ocupación:</label>
          <input
            type="text"
            name="ocupacion"
            value={formData.ocupacion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Actividad Física (horas/semana):</label>
          <select
            name="actividadFisica"
            value={formData.actividadFisica}
            onChange={handleInputChange}
          >
            <option value="">Seleccione</option>
            <option value="0 horas">0 horas</option>
            <option value="1 hora">1 hora</option>
            <option value="2 horas">2 horas</option>
            <option value="3 horas">3 horas</option>
          </select>
        </div>
        <div>
          <label>Síntomas:</label>
          <textarea
            name="sintomas"
            value={formData.sintomas}
            onChange={handleInputChange}
            placeholder="Describa los síntomas"
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarConsulta;
