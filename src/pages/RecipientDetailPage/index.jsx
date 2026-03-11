import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipient } from "../../services/recipientService";

export default function RecipientDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipient(id)
            .then(res => setDetails(res.data))
            .catch(err => console.error("Erro na API", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
        </div>
    );

    if (!details) return (
        <div className="container mt-5 text-center text-muted">
            <i className="bi bi-exclamation-circle fs-1 d-block mb-3"></i>
            <h5>Beneficiário não encontrado.</h5>
            <button className="btn btn-link mt-2" onClick={() => navigate(-1)}>Voltar para a lista</button>
        </div>
    );

    return (
        <div className="container mt-4 px-3 mb-5">
            {/* Botão Voltar Minimalista */}
            <button 
                className="btn btn-sm text-secondary d-inline-flex align-items-center mb-3 p-0 border-0" 
                onClick={() => navigate(-1)}
            >
                <i className="bi bi-arrow-left me-2"></i> Voltar
            </button>

            {/* Card Principal: Informações do Beneficiário */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-2">
                        <div className="bg-primary-subtle text-primary rounded-circle p-3 me-3">
                            <i className="bi bi-building fs-4"></i>
                        </div>
                        <div>
                            {/* Corrigido: text-dark para máxima legibilidade */}
                            <h3 className="fw-bold text-dark mb-0">{details.companyName}</h3>
                            <span className="badge bg-light text-secondary border">CNPJ: {details.cnpj}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cabeçalho da Lista */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-primary text-uppercase fw-bold small mb-0 tracking-widest">
                    Histórico de Lançamentos
                </h6>
                <span className="badge rounded-pill bg-white text-secondary border shadow-sm px-3">
                    {details.bills?.length || 0} registros
                </span>
            </div>

            {/* Lista de Boletos */}
            <div className="list-group list-group-flush shadow-sm rounded-4 overflow-hidden border-0">
                {details.bills && details.bills.length > 0 ? (
                    details.bills.map(bill => (
                        <div key={bill.id} className="list-group-item bg-white border-bottom py-3 px-4 hover-effect">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                <div className="mb-2 mb-md-0">
                                    <span className="d-block fw-bold text-dark fs-6">{bill.bankName}</span>
                                    <div className="d-flex align-items-center mt-1">
                                        <i className="bi bi-calendar-event text-muted me-2 small"></i>
                                        <small className="text-muted">
                                            Vencimento: <span className="fw-medium">{new Date(bill.expirationDate).toLocaleDateString('pt-BR')}</span>
                                        </small>
                                    </div>
                                </div>
                                <div className="text-md-end w-100 w-md-auto pt-2 pt-md-0 border-top border-md-0 mt-2 mt-md-0">
                                    <span className="fw-bold text-primary fs-5 d-block">
                                        R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    <small className="text-muted font-monospace d-block text-truncate" style={{ fontSize: '0.75rem', maxWidth: '180px' }}>
                                        {bill.barCode}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="list-group-item bg-white text-center py-5 text-muted">
                        <i className="bi bi-inbox fs-2 d-block mb-2 opacity-50"></i>
                        Nenhuma conta registrada para este beneficiário.
                    </div>
                )}
            </div>
        </div>
    );
}