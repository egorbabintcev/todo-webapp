import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './CreateForm.scss';

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
    addTask(areaVal);
    setAreaVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
        +
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

export default CreateForm;
