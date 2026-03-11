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
        <div className="mt-4 px-1">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <h5 className="fw-light text-light text-uppercase tracking-wider m-0">Beneficiários</h5>
                <SearchRecipientByNameComponent onSelectRecipient={setSelectedRecipient} />
            </div>

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-info"></div></div>
            ) : (
                <div className="list-group list-group-flush border-top border-bottom border-secondary">
                    {recipients.map((recipient) => (
                        <div
                            key={recipient.id}
                            className="list-group-item bg-transparent border-secondary py-3 px-0 d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer", color: "#e0e0e0" }}
                            onClick={() => goToDetails(recipient.id)}
                        >
                            <div className="d-flex align-items-center text-truncate">
                                <div className="bg-secondary bg-opacity-25 text-info rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                                    <i className="bi bi-building"></i>
                                </div>
                                <div className="text-truncate">
                                    <h6 className="mb-0 fw-normal text-truncate">{recipient.companyName}</h6>
                                    <small className="text-muted font-monospace" style={{ fontSize: '0.75rem' }}>{recipient.cnpj}</small>
                                </div>
                            </div>
                            <i className="bi bi-chevron-right text-muted ms-2"></i>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginação Minimalista */}
            {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-4 gap-4">
                    <button className="btn btn-sm btn-outline-secondary border-0 text-light"
                        disabled={pagination.page === 0} onClick={() => fetchRecipients(pagination.page - 1)}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <span className="text-muted small uppercase">Pág {pagination.page + 1} / {pagination.totalPages}</span>
                    <button className="btn btn-sm btn-outline-secondary border-0 text-light"
                        disabled={pagination.page + 1 === pagination.totalPages} onClick={() => fetchRecipients(pagination.page + 1)}>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}