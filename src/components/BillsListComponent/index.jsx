import { useState, useEffect, useCallback } from "react";
import { getBillsByPeriod, deleteBill } from "../../services/billService";
import DateRangeFilterComponent from "../DateRangeFilterComponent";
import ToastComponent from "../ToastComponent"; // Certifique-se de que o caminho está correto

export default function BillsListComponent() {
    const [bills, setBills] = useState([]);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);

    // Estado para controle do Toast
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const [currentRange, setCurrentRange] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    // Função para exibir o toast e esconder após 3 segundos
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const fetchBills = useCallback(async (start, end, page = 0) => {
        setLoading(true);
        try {
            const response = await getBillsByPeriod(start, end, page);
            setBills(response.data.content);
            setPagination({
                page: response.data.number,
                totalPages: response.data.totalPages
            });
        } catch (error) {
            console.error("Erro ao carregar boletos", error);
            showToast("Erro ao carregar a lista de boletos", "danger");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBills(currentRange.start, currentRange.end);
    }, [fetchBills, currentRange]);

    const handleFilter = (start, end) => {
        setCurrentRange({ start, end });
        fetchBills(start, end, 0);
    };

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        showToast("Código de barras copiado!");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este boleto?")) return;
        try {
            await deleteBill(id);
            setBills(prev => prev.filter(bill => bill.id !== id));
            showToast("Boleto removido com sucesso.");
        } catch (error) {
            console.error("Erro ao deletar:", error);
            showToast("Não foi possível excluir o boleto.", "danger");
        }
    };

    return (
        <div className="mt-4 px-2 mb-5">
            <div className="mb-5">
                <h6 className="fw-bold text-primary text-uppercase small tracking-widest mb-3">
                    <i className="bi bi-search me-2"></i>Consulta de Boletos
                </h6>
                <DateRangeFilterComponent onFilter={handleFilter} />
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary opacity-75" role="status"></div>
                </div>
            ) : (
                <div className="list-group list-group-flush rounded-4 overflow-hidden shadow-sm border-0">
                    {bills.length > 0 ? (
                        bills.map((bill) => (
                            <div key={bill.id} className="list-group-item bg-white py-3 px-3 border-bottom border-light">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div className="flex-grow-1 pe-2 text-truncate">
                                        <h6 className="mb-1 fw-bold text-dark text-truncate">
                                            {bill.recipient.companyName}
                                        </h6>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-primary-subtle text-primary fw-medium border-0 px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                                {bill.bankName}
                                            </span>
                                            <small className="text-muted d-flex align-items-center">
                                                <i className="bi bi-calendar-check me-1"></i>
                                                {new Date(bill.expirationDate).toLocaleDateString('pt-BR')}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <span className="fw-bold text-dark d-block fs-5">
                                            R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                        <button
                                            className="btn btn-link text-danger p-0 border-0 mt-1 opacity-75"
                                            onClick={() => handleDelete(bill.id)}
                                        >
                                            <i className="bi bi-trash3 small"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center bg-light rounded-3 p-2 mt-2 border border-dashed shadow-xs">
                                    <i className="bi bi-upc-scan text-secondary me-2 small"></i>
                                    <code className="text-secondary font-monospace text-truncate flex-grow-1" style={{ fontSize: '0.75rem' }}>
                                        {bill.barCode}
                                    </code>
                                    <button
                                        className="btn btn-sm btn-white shadow-sm border ms-2 rounded-2 py-0 px-2"
                                        onClick={() => handleCopy(bill.barCode)}
                                        title="Copiar"
                                    >
                                        <i className="bi bi-copy small text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-4 p-5 text-center text-muted border border-dashed">
                            <i className="bi bi-receipt-cutoff fs-1 d-block mb-2 opacity-25"></i>
                            <p className="mb-0">Nenhum boleto encontrado neste período.</p>
                        </div>
                    )}
                </div>
            )}

            {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                    <button
                        className="btn btn-sm btn-white border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        disabled={pagination.page === 0}
                        onClick={() => fetchBills(currentRange.start, currentRange.end, pagination.page - 1)}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <span className="text-secondary small fw-medium">
                        {pagination.page + 1} / {pagination.totalPages}
                    </span>
                    <button
                        className="btn btn-sm btn-white border shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        disabled={pagination.page + 1 === pagination.totalPages}
                        onClick={() => fetchBills(currentRange.start, currentRange.end, pagination.page + 1)}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            )}

            {/* Componente de Toast renderizado na raiz do componente */}
            <ToastComponent
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />
        </div>
    );
}