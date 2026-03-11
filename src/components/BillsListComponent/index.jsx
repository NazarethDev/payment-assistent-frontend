import { useState, useEffect, useCallback } from "react";
import { getBillsByPeriod, deleteBill } from "../../services/billService";
import DateRangeFilterComponent from "../DateRangeFilterComponent";

export default function BillsListComponent() {
    const [bills, setBills] = useState([]);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [currentRange, setCurrentRange] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

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
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBills(currentRange.start, currentRange.end);
    }, [fetchBills]);

    const handleFilter = (start, end) => {
        setCurrentRange({ start, end });
        fetchBills(start, end, 0);
    };

    // Função para copiar o código de barras
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        alert("Código de barras copiado!");
    };

    // Função para deletar o boleto
    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este boleto?")) return;

        try {
            await deleteBill(id);
            // Atualiza a lista removendo o item deletado localmente ou recarregando
            setBills(prev => prev.filter(bill => bill.id !== id));
            alert("Boleto removido com sucesso.");
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Não foi possível excluir o boleto.");
        }
    };

    return (
        <div className="mt-4 px-2">
            <h4 className="mb-3 fw-bold text-secondary text-uppercase small">Consulta de Boletos</h4>

            <DateRangeFilterComponent onFilter={handleFilter} />

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="list-group list-group-flush shadow-sm rounded border bg-white">
                    {bills.length > 0 ? (
                        bills.map((bill) => (
                            <div key={bill.id} className="list-group-item py-3">
                                <div className="d-flex w-100 justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1 fw-bold text-dark">{bill.recipient.companyName}</h6>
                                        <div className="d-flex flex-wrap align-items-center gap-2">
                                            <span className="badge bg-light text-muted border small">
                                                {bill.bankName}
                                            </span>
                                            <small className="text-muted">
                                                <i className="bi bi-calendar3 me-1"></i>
                                                {new Date(bill.expirationDate).toLocaleDateString('pt-BR')}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="text-end d-flex flex-column align-items-end">
                                        <span className="fw-bold text-primary fs-5 mb-1">
                                            R$ {bill.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                        <span className={`badge rounded-pill mb-2 ${bill.isPaid ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning-emphasis'}`}>
                                            {bill.isPaid ? 'PAGO' : 'PENDENTE'}
                                        </span>

                                        {/* Ações: Deletar */}
                                        <button
                                            className="btn btn-link text-danger p-0 border-0"
                                            onClick={() => handleDelete(bill.id)}
                                            title="Excluir Boleto"
                                        >
                                            <i className="bi bi-trash3 fs-6"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Linha Inferior: Código de barras + Copiar */}
                                <div className="mt-2 d-flex align-items-center justify-content-between bg-light p-2 rounded border-start border-4 border-secondary">
                                    <small className="text-muted font-monospace text-truncate pe-2" style={{ fontSize: '0.7rem' }}>
                                        {bill.barCode}
                                    </small>
                                    <button
                                        className="btn btn-sm btn-outline-secondary border-0"
                                        onClick={() => handleCopy(bill.barCode)}
                                        title="Copiar código"
                                    >
                                        <i className="bi bi-copy"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5 text-muted">
                            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                            Nenhum boleto encontrado.
                        </div>
                    )}
                </div>
            )}

            {/* Paginação */}
            {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-4 gap-3 pb-4">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={pagination.page === 0}
                        onClick={() => fetchBills(currentRange.start, currentRange.end, pagination.page - 1)}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <span className="small">Pág. {pagination.page + 1} / {pagination.totalPages}</span>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={pagination.page + 1 === pagination.totalPages}
                        onClick={() => fetchBills(currentRange.start, currentRange.end, pagination.page + 1)}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}