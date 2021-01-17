import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAlert } from 'src/utils/Alert';
import './Alert.scss';

const Alert = () => {
  const root = document.querySelector('#alert');
  const { messages } = useAlert();

  const container = (
    <div className="Alert-wrapper">
      <TransitionGroup component={null}>
        {messages.map((m, i) => (
          <CSSTransition
            key={i.toString(16)}
            classNames="Alert"
            timeout={300}
          >
            <div className="Alert">
              <span>{m}</span>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );

  return ReactDOM.createPortal(
    container,
    root,
  );
};

export default Alert;
