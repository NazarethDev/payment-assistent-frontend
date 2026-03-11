import { useNavigate } from "react-router-dom";

export default function InitialPage() {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: "Boletos",
            description: "Gerenciar e consultar pagamentos",
            icon: "bi-receipt",
            path: "/lista-de-boletos",
            color: "primary"
        },
        {
            title: "Beneficiários",
            description: "Lista de empresas e contatos",
            icon: "bi-people",
            path: "/lista-de-beneficiarios",
            color: "info"
        },
        {
            title: "Estatísticas",
            description: "Análise de gastos e períodos",
            icon: "bi-graph-up-arrow",
            path: "/estatisticas",
            color: "success"
        },
        {
            title: "Novo Boleto",
            description: "Cadastrar conta para pagamento",
            icon: "bi-plus-circle",
            path: "/novo-boleto",
            color: "dark"
        },
        {
            title: "Novo Beneficiário",
            description: "Adicionar nova empresa",
            icon: "bi-person-plus",
            path: "/novo-beneficiario",
            color: "secondary"
        }
    ];

    return (
        <div className="container mt-4 animate__animated animate__fadeIn">
            {/* Boas-vindas Simplificado */}
            <div className="mb-5 text-center text-md-start">
                <h4 className="fw-bold text-dark mb-1">Painel de Controle</h4>
                <p className="text-muted small">Selecione uma ação para gerenciar seus pagamentos.</p>
            </div>

            <div className="row g-4 mb-5">
                {menuItems.map((item, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div
                            className="card h-100 border-0 shadow-sm rounded-4 p-3 hover-card"
                            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                            onClick={() => navigate(item.path)}
                        >
                            <div className="card-body d-flex align-items-center">
                                <div className={`bg-${item.color}-subtle text-${item.color} rounded-4 d-flex align-items-center justify-content-center me-4`}
                                    style={{ width: "60px", height: "60px", flexShrink: 0 }}>
                                    <i className={`bi ${item.icon} fs-3`}></i>
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

            {/* Estilo local para o efeito de hover que o Bootstrap não faz nativo */}
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