import React, { useState, useEffect } from 'react';

const UseState = ({ name }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Empezando un efecto")

    if (!!loading) {
      setTimeout(() => {
        console.log("Realizando la validación")
        setLoading(false);
        console.log("Terminando la validación")
      }, 3000)
    }

    console.log("Terminando el efecto")
  }, [loading]);

  return (
    <div>
      <h2>Eliminar UseState {name}</h2>
      <p>Por favor, escribe el código de seguridad</p>

      {error && (
        <p>Error: el código es incorrecto</p>
      )}

      {loading && (
        <p>Cargando...</p>
      )}

      <input placeholder="Código de Seguridad" />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };