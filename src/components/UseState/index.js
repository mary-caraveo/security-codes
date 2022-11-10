import React, { useState } from 'react';

const UseState = ({ name }) => {
  const [error, setError] = useState(false);

  return (
    <div>
      <h2>Eliminar UseState {name}</h2>
      <p>Por favor, escribe el código de seguridad</p>

      {error && (
        <p>Error: el código es incorrecto</p>
      )}

      <input placeholder="Código de Seguridad" />
      <button onClick={() => setError(!error)}>Comprobar</button>
    </div>
  );
}

export { UseState };