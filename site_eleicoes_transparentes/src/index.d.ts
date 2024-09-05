import { PyodideInterface } from "pyodide";

declare global {
  interface Window {
    pyodide: PyodideInterface;
  }
}

window.pyodide = window.pyodide || {};
