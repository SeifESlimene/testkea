import React from 'react';
import ReactDOM from 'react-dom';
import { getContext, useValues } from 'kea';
import { Provider } from 'react-redux';
import router from './router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.hidden) {
      this.setState({ hidden: false });
    }
  }

  render() {
    return <div>{this.state.hidden ? null : this.props.children}</div>;
  }
}

export default function Layout(props) {
  console.log({ props });
  const { store } = getContext();
  console.log({ store: store.getState() });
  return (
    <Provider store={store}>
      <LayoutInner {...props} />
    </Provider>
  );
}

function LayoutInner({ bundles }) {
  const { scene } = useValues(router);

  const SceneBundle = bundles[scene];

  return (
    <App>
      <div id="content">
        <SceneBundle />
      </div>
    </App>
  );
}

ReactDOM.render(<Layout />, document.getElementById('root'));
