import { Component } from 'react';

class Root extends Component {
  
    axios = require('axios')
    bu_api_url = require('../../config.json').bu_api_url
    
    constructor() {
        super()
        this.state = {
                       lista: []            
                    }
      }
      
  componentDidMount(){
    this.axios.get(`${this.bu_api_url}/tree/root`) //partial
      .then(response => this.setState({ lista: response.data }))
  }

  render() {
    const { lista } = this.state
    return (lista)
  }
}

export default Root;