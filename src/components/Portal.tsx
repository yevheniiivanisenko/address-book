import { Component } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: JSX.Element;
}

class Portal extends Component<PortalProps> {
  container: HTMLElement;

  constructor(props: PortalProps) {
    super(props);

    this.container = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return createPortal(
      this.props.children,
      this.container
    );
  }
}

export default Portal;
