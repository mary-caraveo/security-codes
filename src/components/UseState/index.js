import React, { useState, useEffect } from 'react';

const SECURITY_CODE = 'paradigma';

const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  useEffect(() => {
    console.log("Empezando un efecto")

    if (!!state.loading) {
      setState({
        ...state,
        error: false,
      });

      setTimeout(() => {
        console.log("Realizando la validación")

        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });

        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          });
        }

        console.log("Terminando la validación")
      }, 3000)
    }

    console.log("Terminando el efecto")
  }, [state.loading, state.value]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar UseState {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {state.error && (
          <p>Error: el código es incorrecto</p>
        )}

        {state.loading && (
          <p>Cargando...</p>
        )}

        <input
          placeholder="Código de Seguridad"
          value={state.value}
          onChange={(event) => {
            setState({
              ...state,
              value: event.target.value,
            });
          }}
        />

        <button onClick={() => {
          setState({
            ...state,
            loading: true,
          });
        }}>Comprobar</button>
      </div >
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Puede confirmar. ¿Estas seguro?</p>
        <button
          onClick={() => {
            setState({
              ...state,
              deleted: true,
            })
          }}
        >
          Aceptar
        </button>

        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: '',
            })
          }}
        >
          Cancelar
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: '',
            })
          }}
        >
          Resetear, volver al inicio
        </button>
      </>
    );
  }
}

export { UseState };