import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAllRecipients } from "../../services/recipientService.js";
import SearchRecipientByNameComponent from "../SearchRecipientByNameComponent/index.jsx";

export default function RecipientListComponent() {
    const navigate = useNavigate();
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [recipients, setRecipients] = useState([]);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);

    const goToDetails = (id) => { if (id) navigate(`/recipient/${id}`); };

    useEffect(() => {
        if (selectedRecipient) goToDetails(selectedRecipient.id);
    }, [selectedRecipient]);

    const fetchRecipients = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const response = await getAllRecipients(page);
            setRecipients(response.data.content);
            setPagination({ page: response.data.number, totalPages: response.data.totalPages });
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchRecipients(); }, [fetchRecipients]);

    return (
        <div className="mt-4 px-2">
            {/* Cabeçalho mais sóbrio e direto */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <h5 className="fw-bold text-dark text-uppercase tracking-wider m-0" style={{ fontSize: '0.9rem' }}>
                    Beneficiários
                </h5>
                <SearchRecipientByNameComponent onSelectRecipient={setSelectedRecipient} />
            </div>

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
            ) : (
                <div className="list-group list-group-flush border-top">
                    {recipients.map((recipient) => (
                        <div
                            key={recipient.id}
                            className="list-group-item bg-transparent border-bottom py-3 px-1 d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer", transition: "0.2s" }}
                            onClick={() => goToDetails(recipient.id)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)"}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                            <div className="d-flex align-items-center text-truncate">
                                {/* Ícone com cores suaves do tema claro */}
                                <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "42px", height: "42px", flexShrink: 0 }}>
                                    <i className="bi bi-building"></i>
                                </div>
                                <div className="text-truncate">
                                    {/* Nome em destaque escuro para leitura fácil */}
                                    <h6 className="mb-0 fw-bold text-dark text-truncate">{recipient.companyName}</h6>
                                    <small className="text-muted font-monospace" style={{ fontSize: '0.75rem' }}>
                                        {recipient.cnpj}
                                    </small>
                                </div>
                            </div>
                            <i className="bi bi-chevron-right text-muted opacity-50 ms-2"></i>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginação Minimalista Clean */}
            {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-4 gap-4">
                    <button
                        className="btn btn-sm btn-light border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                        disabled={pagination.page === 0}
                        onClick={() => fetchRecipients(pagination.page - 1)}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>

                    <span className="text-secondary small fw-medium">
                        {pagination.page + 1} de {pagination.totalPages}
                    </span>

                    <button
                        className="btn btn-sm btn-light border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                        disabled={pagination.page + 1 === pagination.totalPages}
                        onClick={() => fetchRecipients(pagination.page + 1)}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}