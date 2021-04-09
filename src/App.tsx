import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class App extends Component {
  props: any

  render() {
    return (
        <div>
            <div>{this.props.store.count}</div>
            <button onClick={this.props.store.add}>add</button>
            <button onClick={this.props.store.reduce}>reduce</button>
        </div>
    );
  }
}

export default App;
