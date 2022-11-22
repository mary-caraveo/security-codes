import React, { useEffect, useReducer } from 'react';

const SECURITY_CODE = 'paradigma';

const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Empezando un efecto")

    if (!!state.loading) {
      dispatch({ type: 'ERROR-LOADING', });

      setTimeout(() => {
        console.log("Realizando la validación")

        if (state.value === SECURITY_CODE) {
          dispatch({ type: 'CONFIRM', });
        } else {
          dispatch({ type: 'ERROR', });
        }

        console.log("Terminando la validación")
      }, 3000)
    }

    console.log("Terminando el efecto")
  }, [state.loading]);

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
            dispatch({ type: 'WRITE', payload: event.target.value });
          }}
        />

        <button onClick={() => {
          dispatch({ type: 'CHECK', });
        }}>Comprobar</button>
      </div >
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Puede confirmar. ¿Estas seguro?</p>
        <button
          onClick={() => {
            dispatch({ type: 'DELETE', });
          }}
        >
          Aceptar
        </button>

        <button
          onClick={() => {
            dispatch({ type: 'RESET', });
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
            dispatch({ type: 'RESET', });
          }}
        >
          Resetear, volver al inicio
        </button>
      </>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  'CONFIRM': {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'WRITE': {
    ...state,
    value: payload,
  },
  'ERROR-LOADING': {
    ...state,
    error: false,
  },
  'CHECK': {
    ...state,
    loading: true,
  },
  'DELETE': {
    ...state,
    deleted: true,
  },
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type]
  } else {
    return state;
  }
};

export { UseReducer };