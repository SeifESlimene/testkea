import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './styles.scss';

class HomepageScene extends Component {
  render() {
    return (
      <div>
        <h1>You're On Homepage!</h1>
      </div>
    );
  }
}

export default hot(module)(HomepageScene);
