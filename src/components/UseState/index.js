import React, { useState, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

const UseState = ({ name }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(value)

  useEffect(() => {
    console.log("Empezando un efecto")

    if (!!loading) {
      setError(false);
      setTimeout(() => {
        console.log("Realizando la validación")

        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);

        console.log("Terminando la validación")
      }, 3000)
    }

    console.log("Terminando el efecto")
  }, [loading, value]);

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

      <input
        placeholder="Código de Seguridad"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };