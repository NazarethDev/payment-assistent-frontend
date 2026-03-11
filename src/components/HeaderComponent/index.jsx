import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HeaderComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3 mb-4">
            <div className="container">
                {/* Logo / Nome do App */}
                <NavLink className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/home">
                    <i className="bi bi-wallet2 me-2"></i>
                    Payment Assistant
                </NavLink>

                {/* Botão Mobile */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Itens de Navegação */}
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-2 mt-3 mt-lg-0 align-items-lg-center">
                        <li className="nav-item">
                            <NavLink
                                to="/home"
                                end
                                className={({ isActive }) =>
                                    `nav-link px-3 rounded-pill ${isActive ? "active bg-primary-subtle text-primary fw-bold" : "text-secondary"}`
                                }
                            >
                                <i className="bi bi-house-door me-1"></i> Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/lista-de-boletos"
                                className={({ isActive }) =>
                                    `nav-link px-3 rounded-pill ${isActive ? "active bg-primary-subtle text-primary fw-bold" : "text-secondary"}`
                                }
                            >
                                <i className="bi bi-receipt me-1"></i> Boletos
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/lista-de-beneficiarios"
                                className={({ isActive }) =>
                                    `nav-link px-3 rounded-pill ${isActive ? "active bg-primary-subtle text-primary fw-bold" : "text-secondary"}`
                                }
                            >
                                <i className="bi bi-people me-1"></i> Beneficiários
                            </NavLink>
                        </li>

                        {/* Divisória Vertical (Apenas Desktop) */}
                        <div className="vr d-none d-lg-block mx-2 text-secondary-emphasis opacity-25" style={{ height: '24px' }}></div>

                        {/* Grupo de Ações Rápidas */}
                        <li className="nav-item d-flex flex-column flex-lg-row gap-2">
                            <NavLink
                                to="/novo-beneficiario"
                                className="btn btn-outline-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center justify-content-center"
                            >
                                <i className="bi bi-person-plus me-1"></i> Novo Beneficiário
                            </NavLink>

                            <NavLink
                                to="/novo-boleto"
                                className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm d-inline-flex align-items-center justify-content-center"
                            >
                                <i className="bi bi-plus-lg me-1"></i> Novo Boleto
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}