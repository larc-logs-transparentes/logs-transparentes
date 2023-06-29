import { Component } from 'react';
import { getTrustedRoot } from '../../../api/merkletree.api.js';

class Root extends Component {
  constructor() {
    super()
    this.state = {
      root: null,
    }
  }
  async componentDidMount() {
    const root = await getTrustedRoot()
    console.log(root)
    this.setState({ root: root.value })
  }

  render() {
    
    return (this.state.root)
  }
}

export default Root;