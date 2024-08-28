import Base from "layout/Base";
import BuResults from "pages/BuResults";
import ErrorPage from "pages/ErrorPage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import Layout from "./Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<BuResults />} />
        {/* <Route path="home" element={<Home />} />

        <Route path="pro" element={<Pro />} />
        <Route path="pro/:proId" element={<ProShow />} />
        <Route path="pro/docs" element={<DocShow />} />

        <Route path="manuais" element={<Manuais />} />
        <Route path="manuais/:proId" element={<ManuaisShow />} />
        <Route path="manuais/docs" element={<ManuaisDoc />} />

        <Route path="informativo" element={<Informativo />} />
        <Route path="agenda" element={<Agenda />} />

        <Route path="contato" element={<Contato />} /> */}
      </Route>
    </Route>,
  ),
);
export default router;
