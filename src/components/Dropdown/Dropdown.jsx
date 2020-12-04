import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Dropdown.scss';
import icons from './icons.svg';

export const DropdownItem = ({ children, onClick }) => (
  <button
    type="button"
    className="dropdown__item"
    onClick={onClick}
  >
    {children}
  </button>
);

DropdownItem.propTypes = {
  onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
  onClick: () => {},
};

export const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  return (
    <div className="dropdown">
      <button ref={wrapperRef} type="button" className="dropdown__toggle" onClick={handleClick}>
        <svg>
          <use xlinkHref={`${icons}#ellipsis-v`} />
        </svg>
      </button>
      <div data-testid="dropdown-list" className={cx('dropdown__content', { 'is-open': isOpen })}>
        {children}
      </div>
    </div>
  );
};
