import React, { Component, Fragment, createRef, RefObject } from 'react';

import Portal from './Portal';
import Fade from './Fade';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalState {
  isOpen: boolean;
}

class Modal extends Component<ModalProps, ModalState> {
  dialog: RefObject<HTMLDivElement> | null;
  mouseDownElement: EventTarget | null;

  static init() {
    document.body.classList.add('modal-open');
  };

  static destroy() {
    document.body.classList.remove('modal-open');
  };

  static getDerivedStateFromProps(nextProps: ModalProps, nextState: ModalState) {
    if (nextProps.isOpen && !nextState.isOpen) {
      return {
        isOpen: nextProps.isOpen
      };
    }

    return null;
  }

  constructor(props: ModalProps) {
    super(props);

    this.state = { isOpen: props.isOpen };
    this.dialog = createRef();
    this.mouseDownElement = null;

    if (props.isOpen) {
      Modal.init();
    }
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      Modal.init();
    } else {
      Modal.destroy();
    }
  }

  componentWillUnmount() {
    Modal.destroy();
  }

  handleClose = () => {
    this.props.onClose();
    Modal.destroy();
  };

  handleMouseDown = (e: React.MouseEvent) => {
    this.mouseDownElement = e.target;
  };

  handleBackdropMouseClick = (e: React.MouseEvent) => {
    const container = e.target;

    if (container === this.mouseDownElement) {
      e.stopPropagation();

      if (container instanceof HTMLElement && !this.dialog!.current!.contains(container)) {
        this.handleClose();
      }
    }
  };

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.handleClose();
    }
  };

  handleEnter = () => {
    this.dialog!.current!.focus();
    this.dialog!.current!.addEventListener('keydown', this.handleKeyPress, false);
  };

  handleExit = () => {
    this.setState({ isOpen: false });
    this.dialog!.current!.removeEventListener('keydown', this.handleKeyPress, false);
  };

  render() {
    if (this.state.isOpen) {
      const { isOpen, children } = this.props;

      return (
        <Portal>
          <Fragment>
            <Fade
              appear
              in={isOpen}
              timeout={150}
              className="modal"
              style={{ display: 'block' }}
              onMouseDown={this.handleMouseDown}
              onClick={this.handleBackdropMouseClick}
            >
              <div
                className="modal-dialog"
                tabIndex={-1}
                ref={this.dialog}
              >
                <div className="modal-content">{children}</div>
              </div>
            </Fade>
            <Fade
              appear
              in={isOpen}
              timeout={150}
              className="modal-backdrop"
              onEntered={this.handleEnter}
              onExited={this.handleExit}
            />
          </Fragment>
        </Portal>
      );
    }

    return null;
  }
}

export default Modal;
