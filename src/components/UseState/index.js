import React, { useState, useEffect } from 'react';
import '../../App.css';

const SECURITY_CODE = 'paradigma';

const UseState = ({ name }) => {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    });
  };

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
          onConfirm();
        } else {
          onError();
        }

        console.log("Terminando la validación")
      }, 3000)
    }

    console.log("Terminando el efecto")
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div className='content-useState'>
        <h2>Eliminar UseState {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {state.error && (
          <p>Error: el código es incorrecto</p>
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
              onChange={(event) => {
                onWrite(event.target.value);
              }}
            />
          </div>

          <div className='content-button'>
            <button
              className='button button-confirm'
              onClick={() => {
                onCheck();
              }}>
              Comprobar
            </button>
          </div>
        </div>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Puede confirmar. ¿Estas seguro?</p>
        <div className='content content-useState'>
          <div className='content-btn-delete'>
            <button
              className='button button-delete'
              onClick={() => {
                onDelete();
              }}
            >
              Eliminar
            </button>
          </div>

          <div className='content-btn-reset'>
            <button
              className='button button-cancel'
              onClick={() => {
                onReset();
              }}
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
        <p>Eliminado con éxito</p>
        <div className='content content-useState'>
          <button
            className='button button-confirm'
            onClick={() => {
              onReset();
            }}
          >
            Resetear, volver al inicio
          </button>
        </div>
      </>
    );
  }
}

export { UseState };