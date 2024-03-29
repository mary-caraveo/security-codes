import React, { useEffect, useReducer } from 'react';
import '../../App.css';

const SECURITY_CODE = 'paradigma';

const UseReducer = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm, });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error, });
  };

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check, });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete, });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset, });
  };

  useEffect(() => {
    console.log("Empezando un efecto")

    if (!!state.loading) {

      setTimeout(() => {
        console.log("Realizando la validación")

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }

        console.log("Terminando la validación")
      }, 3000)
    }

    console.log("Terminando el efecto")
  });

  if (!state.deleted && !state.confirmed) {
    return (
      <div className='content-useReducer'>
        <h2>Eliminar UseState {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {(state.error && !state.loading) && (
          <p className='text-error'>El código es incorrecto, intenta nuevamente.</p>
        )}

        {state.loading && (
          <section className='loader'>
            <div></div>
            <div></div>
            <div></div>
          </section>
        )}
        <div className='content'>
          <div className='content-input'>
            <input
              placeholder="Código de Seguridad"
              className='input'
              value={state.value}
              onChange={onWrite} />
          </div>

          <div className='content-button'>
            <button
              className='button button-confirm'
              onClick={onCheck}
            >
              Comprobar
            </button>
          </div>
        </div>
      </div >
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Es necesario confirmar la eliminación.</p>
        <div className='content'>
          <div className='content-btn-delete'>
            <button
              className='button button-delete'
              onClick={onDelete}
            >
              Eliminar
            </button>
          </div>

          <div className='content-btn-reset'>
            <button
              className='button button-cancel'
              onClick={onReset}
            >
              Cancelar
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p className='text-success'>Se elimino con éxito. ✅</p>
        <div className='content'>
          <button
            className='button button-confirm'
            onClick={onReset}
          >
            Resetear, volver al inicio
          </button>
        </div>
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

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
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