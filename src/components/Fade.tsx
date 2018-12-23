import React from 'react';
import classnames from 'classnames';
import pickBy from 'lodash/pickBy';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

interface FadeProps extends TransitionProps {
  className?: string | object;
}

const TransitionPropKeyList = [
  'in',
  'appear',
  'onExited',
  'onEntered',
  'unmountOnExit'
];

const Fade: React.SFC<FadeProps> = ({ timeout, className, children, ...otherProps }) => {
  const transitionProps = pickBy(otherProps, (value, key) => TransitionPropKeyList.includes(key));
  const childProps = pickBy(otherProps, (value, key) => !TransitionPropKeyList.includes(key));

  // Since timeout is required it cannot be computed dynamically
  return (
    <Transition timeout={timeout} {...transitionProps}>
      {state => {
        const isEntered = state === 'entered';
        const classList = classnames(className, 'fade', isEntered && 'show');

        return (
          <div className={classList} {...childProps}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default Fade;
