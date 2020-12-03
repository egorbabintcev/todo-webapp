import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './CreateForm.scss';
import icon from './paper-plane.svg';

const CreateForm = React.forwardRef(({ addTask }, ref) => {
  const [areaVal, setAreaVal] = useState('');
  const areaRef = useRef(null);

  useEffect(() => {
    const { style } = areaRef.current;
    style.height = '0px';
    // eslint-disable-next-line prefer-destructuring
    const scrollHeight = areaRef.current.scrollHeight;
    style.height = `${scrollHeight}px`;
    // eslint-disable-next-line no-param-reassign
    ref.current.style.height = `calc(100vh - ${scrollHeight}px)`;
  }, [areaVal]);

  const handleClick = () => {
    const submitVal = areaVal.trim();
    if (submitVal.length > 0) {
      addTask(submitVal);
    }
    setAreaVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="Form">
      <textarea
        ref={areaRef}
        rows="1"
        onChange={({ target }) => { setAreaVal(target.value); }}
        onKeyPress={handleKeyPress}
        placeholder="Type ur task here"
        value={areaVal}
      />
      <button
        onClick={handleClick}
        type="button"
      >
        <svg>
          <use xlinkHref={`${icon}#paper-plane`} />
        </svg>
      </button>
    </div>
  );
});

CreateForm.propTypes = {
  addTask: PropTypes.func,
};

CreateForm.defaultProps = {
  addTask: () => {},
};

CreateForm.displayName = 'CreateForm';

export default CreateForm;
