import { Outlet } from "react-router-dom";
import Logo from "assets/images/logo-election.svg";
import Footer from "assets/images/Footer.png";
import { useEffect } from "react";
import { initPyodide } from "lib/pyodide";

// async function main() {
//   const pyodide = await initPyodide();
//   // let pyodide = await loadPyodide();
//   // console.log(
//   //   pyodide.runPython(`
//   //     import sys
//   //     sys.version
//   // `),
//   // );
//   pyodide.runPython("print(1 + 2)");
// }

export default function Base() {
  // useEffect(() => {
  //   async function main() {
  //     const pyodide = await initPyodide();
  //     console.log(pyodide);
  //     // let pyodide = await loadPyodide();
  //     // console.log(
  //     //   pyodide.runPython(`
  //     //     import sys
  //     //     sys.version
  //     // `),
  //     // );
  //     pyodide.runPython("print(1 + 2)");
  //   }
  //   main();
  // }, []);

  return (
    <div>
      <header>
        {/* <button type="button" onClick={main}>
          asdasd
        </button> */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-2xl bg-white px-8 py-[10px] text-sm font-bold text-default-cyan-400 shadow-lg">
            ATENÇÃO: ESSE É UM PROTÓTIPO EXPERIMENTAL
          </div>
          <div className="h-2 bg-default-orange-400"></div>
          <div className="h-2 bg-default-cyan-300"></div>
          <div className="h-8 bg-default-cyan-400"></div>
        </div>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#">
            <img src={Logo} alt="Eleições Transparentes" />
          </a>

          <ul className="flex font-medium text-black">
            <li className="px-4">
              <a href="#">Home</a>
            </li>
            <li className="px-4">
              <a href="#">Dashboard</a>
            </li>
            <li className="px-4">
              <a href="#">Verificar arquivo</a>
            </li>
            <li className="px-4">
              <a href="#">Calcular resultado</a>
            </li>
            <li className="px-4">
              <a href="#">Eleições Presidenciais 2024</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-default-cyan-700">
        <div className="mx-auto max-w-7xl">
          <img src={Footer} alt="Footer" className="w-full" />
        </div>
      </footer>
    </div>
  );
}
