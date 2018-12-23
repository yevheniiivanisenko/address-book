import React from 'react';

import Fade from './Fade';

interface AlertProps {
  isVisible: boolean;
  message: string;
}

const style: object = {
  position: 'absolute',
  top: '.5rem',
  left: '50%',
  transform: 'translateX(-50%)'
};

const Alert = ({ isVisible, message }: AlertProps) => {
  return (
    <Fade
      unmountOnExit
      timeout={300}
      in={isVisible}
    >
      <div
        style={style}
        className="alert alert-primary"
      >
        {message}
      </div>
    </Fade>
  );
};

export default Alert;
