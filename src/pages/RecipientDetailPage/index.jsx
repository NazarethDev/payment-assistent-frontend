import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipient } from "../../services/recipientService";

export default function RecipientDetailPage() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipient(id)
            .then(res => setDetails(res.data))
            .catch(err => console.error("Erro na API", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-info"></div></div>;
    if (!details) return <div className="text-light m-5">Beneficiário não encontrado.</div>;

    return (
        <div className="container mt-4 px-3 text-light">
            <div className="mb-4 pb-3 border-bottom border-secondary">
                <h3 className="fw-bold mb-1">{details.companyName}</h3>
                <p className="text-muted small mb-0">CNPJ: {details.cnpj}</p>
            </div>

            <h6 className="mb-3 text-info text-uppercase small tracking-widest">Histórico de Lançamentos</h6>

            <div className="list-group list-group-flush">
                {details.bills && details.bills.length > 0 ? (
                    details.bills.map(bill => (
                        <div key={bill.id} className="list-group-item bg-transparent border-secondary px-0 py-3">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="text-truncate">
                                    <span className="d-block text-truncate pe-2">{bill.bankName}</span>
                                    <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        Vence: {new Date(bill.expirationDate).toLocaleDateString('pt-BR')}
                                    </small>
                                </div>
                                <div className="text-end" style={{ minWidth: '100px' }}>
                                    <span className="fw-bold text-info d-block">
                                        R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    <small className="text-muted font-monospace d-block" style={{ fontSize: '0.65rem' }}>
                                        {bill.barCode.substring(0, 10)}...
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-4 text-muted italic">Nenhuma conta registrada para este beneficiário.</div>
                )}
            </div>
        </div>
    );
}