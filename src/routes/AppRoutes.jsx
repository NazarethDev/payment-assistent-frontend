import { Route, Routes } from "react-router-dom";

import BillsPage from "../pages/BillsPage/index.jsx";
import InitialPage from "../pages/InitialPage/index.jsx";
import LoginPage from "../pages/LoginPage/index.jsx";
import NewBillPage from "../pages/NewBillPage/index.jsx";
import NewRecipientPage from "../pages/NewRecipientPage/index.jsx";
import RecipientsPage from "../pages/RecipientsPage/index.jsx";
import StatisticsPage from "../pages/StatisticsPage/index.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/login" element={< LoginPage />} />
            <Route path="/lista-de-boletos" element={< BillsPage />} />
            <Route path="/lista-de-beneficiarios" element={<RecipientsPage />} />
            <Route path="/novo-boleto" element={< NewBillPage />} />
            <Route path="/novo-beneficiario" element={<NewRecipientPage />} />
            <Route path="/estatisticas" element={<StatisticsPage />} />
        </Routes>
    )
}