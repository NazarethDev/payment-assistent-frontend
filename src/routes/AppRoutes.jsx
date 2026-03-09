import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";

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
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={
                <PrivateRoute>
                    < InitialPage />
                </PrivateRoute>
            } />
            <Route path="/lista-de-boletos" element={
                <PrivateRoute>
                    < BillsPage />
                </PrivateRoute>
            } />
            <Route path="/lista-de-beneficiarios" element={
                <PrivateRoute>
                    <RecipientsPage />
                </PrivateRoute>
            } />
            <Route path="/novo-boleto" element={
                <PrivateRoute>
                    < NewBillPage />
                </PrivateRoute>
            } />
            <Route path="/novo-beneficiario" element={
                <PrivateRoute>
                    <NewRecipientPage />
                </PrivateRoute>
            } />
            <Route path="/estatisticas" element={
                <PrivateRoute>
                    <StatisticsPage />
                </PrivateRoute>
            } />
        </Routes>
    )
}