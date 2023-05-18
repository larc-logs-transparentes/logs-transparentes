import React, { Component } from "react";

class Pyodide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: "(loading...)",
    };
  }

  async componentDidMount() {
    const scriptText = await (await fetch(this.props.script)).text();
    const out = await this.runScript(scriptText);
    this.setState({ output: out });
  }

  async runScript(scriptText) {

    await window.languagePluginLoader;

    const pyodide = await window.pyodide;

    return pyodide.runPython(scriptText);
  }
  render() {
    return <p>{this.state.output}</p>;
  }
}

export default Pyodide;