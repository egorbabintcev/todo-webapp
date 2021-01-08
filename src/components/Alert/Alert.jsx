import React from 'react';
import ReactDOM from 'react-dom';
import { useAlert } from 'src/utils/Alert';
import './Alert.scss';

const Alert = () => {
  const root = document.querySelector('#alert');
  const { messages } = useAlert();

  return ReactDOM.createPortal(
    messages.map((m, i) => (
      <div key={i.toString(16)} className="Alert">
        <span>{m}</span>
      </div>
    )),
    root,
  );
};

export default Alert;
