import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { downloadTodayBills } from "../../services/billService";
import { downloadBlob } from "../../utils/downloadBlob";
import ToastComponent from "../../components/ToastComponent";

export default function InitialPage() {
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const response = await downloadTodayBills();
            const fileName = `boletos_${new Date().toISOString().split('T')[0]}.pdf`;
            downloadBlob(response, fileName);
            showToast("Download concluído!");
        } catch (error) {
            console.error("Erro no download", error);
            showToast("Erro ao gerar PDF de hoje.", "danger");
        } finally {
            setDownloading(false);
        }
    };

    const menuItems = [
        {
            title: "Boletos",
            description: "Gerenciar e consultar pagamentos",
            icon: "bi-receipt",
            action: () => navigate("/lista-de-boletos"),
            color: "primary"
        },
        {
            title: "Beneficiários",
            description: "Lista de empresas e contatos",
            icon: "bi-people",
            action: () => navigate("/lista-de-beneficiarios"),
            color: "info"
        },
        {
            title: "Estatísticas",
            description: "Análise de gastos e períodos",
            icon: "bi-graph-up-arrow",
            action: () => navigate("/estatisticas"),
            color: "success"
        },
        {
            title: "Novo Boleto",
            description: "Cadastrar conta para pagamento",
            icon: "bi-plus-circle",
            action: () => navigate("/novo-boleto"),
            color: "dark"
        },
        {
            title: "Novo Beneficiário",
            description: "Adicionar nova empresa",
            icon: "bi-person-plus",
            action: () => navigate("/novo-beneficiario"),
            color: "secondary"
        },
        {
            title: "Boletos de hoje",
            description: downloading ? "Gerando arquivo..." : "Download de PDF com as despesas de hoje",
            icon: downloading ? "bi-hourglass-split" : "bi-file-earmark-pdf",
            action: handleDownload,
            color: "danger" // Vermelho para PDF
        }
    ];

    return (
        <div className="container mt-4 animate__animated animate__fadeIn">
            <div className="mb-5 text-center text-md-start">
                <h4 className="fw-bold text-dark mb-1">Painel de Controle</h4>
                <p className="text-muted small">Selecione uma ação para gerenciar seus pagamentos.</p>
            </div>

            <div className="row g-4 mb-5">
                {menuItems.map((item, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div
                            className={`card h-100 border-0 shadow-sm rounded-4 p-3 hover-card ${downloading && item.color === 'danger' ? 'opacity-50' : ''}`}
                            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                            onClick={item.action}
                        >
                            <div className="card-body d-flex align-items-center">
                                <div className={`bg-${item.color}-subtle text-${item.color} rounded-4 d-flex align-items-center justify-content-center me-4`}
                                    style={{ width: "60px", height: "60px", flexShrink: 0 }}>
                                    <i className={`bi ${item.icon} fs-3 ${downloading && item.color === 'danger' ? 'spinner-border spinner-border-sm border-0' : ''}`}></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1 text-dark">{item.title}</h6>
                                    <p className="text-muted small mb-0">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ToastComponent
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />

            <style>{`
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
                    background-color: #ffffff;
                }
            `}</style>
        </div>
    );
}