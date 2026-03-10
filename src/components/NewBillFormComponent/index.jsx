import { useState } from "react";
import SearchRecipientByNameComponent from "../SearchRecipientByNameComponent/index.jsx";
import { parseBoletoData } from "../../services/parseBoleto";
import BarcodeReaderComponent from "../BarcodeReaderComponent";
import { createBill } from "../../services/billService.js";
import formatBoletoLinhaDigitavel from "../../utils/formatBoletoLinhaDigitavel.js";

export default function NewBillFormComponent() {
    const [billData, setBillData] = useState(null);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBarcodeDetected = (rawText) => {
        const processedData = parseBoletoData(rawText);

        if (processedData) {
            setBillData(processedData);
        } else {
            console.error("Código de barras inválido para boleto.");
        }
    };

    const handleSave = async () => {
        if (!billData || !selectedRecipient) {
            alert("Sem dados do boleto ou beneficiário. Para prosseguir, indique estas informações.");
            return;
        }

        setLoading(true);

        const payload = {
            amount: billData.amount,
            barCode: billData.barCode,
            recipientId: selectedRecipient.id,
            expirationDate: billData.expirationDate,
            bankCode: billData.bankCode,
            bankName: billData.bankName
        };

        try {
            await createBill(payload);
            alert("Boleto salvo com sucesso.");
            setBillData(null);
            setSelectedRecipient(null);
        } catch (error) {
            console.error("Erro ao salvar boleto: ", error);
            alert("Erro ao salvar boleto no servidor. Entre em contato com o administrador do sistema.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Novo Boleto</h2>

            {/* 1. Seleção do Beneficiário */}
            <div className="mb-4">
                <label className="form-label fw-bold">1. Selecione o Beneficiário</label>
                <SearchRecipientByNameComponent onSelectRecipient={setSelectedRecipient} />
                {selectedRecipient && (
                    <div className="form-text text-success">
                        Beneficiário selecionado: <strong>{selectedRecipient.companyName}</strong>
                    </div>
                )}
            </div>

            {/* 2. Scanner/Input de Código */}
            <div className="mb-4">
                <label className="form-label fw-bold">2. Leia ou Digite o Código</label>
                <BarcodeReaderComponent onDetected={handleBarcodeDetected} />
            </div>

            {/* 3. Resumo e Botão de Salvar (Só aparece se o boleto for lido) */}
            {billData && (
                <div className="mt-4 p-4 border rounded shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="m-0 text-primary">Dados Extraídos</h4>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setBillData(null)}
                            disabled={loading}
                        >
                            Limpar Leitura
                        </button>
                    </div>

                    <hr />

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <p className="mb-1 text-muted small">Banco Emissor</p>
                            <p className="fw-bold">{billData.bankName} ({billData.bankCode})</p>

                            <p className="mb-1 text-muted small mt-3">Valor Nominal</p>
                            <p className="fw-bold text-success fs-5">
                                R$ {billData.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-1 text-muted small">Data de Vencimento</p>
                            <p className="fw-bold">{new Date(billData.expirationDate).toLocaleDateString('pt-BR')}</p>

                            <p className="mb-1 text-muted small mt-3">Linha Digitável</p>
                            <p className="text-truncate small bg-light p-1 border rounded">{formatBoletoLinhaDigitavel(billData.barCode)}</p>
                        </div>
                    </div>

                    {/* Botão de Envio Principal */}
                    <div className="mt-4 border-top pt-3">
                        <button
                            className={`btn w-100 py-2 fw-bold ${!selectedRecipient ? 'btn-secondary' : 'btn-success'}`}
                            onClick={handleSave}
                            disabled={loading || !selectedRecipient}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Salvando...
                                </>
                            ) : (
                                !selectedRecipient
                                    ? "Selecione um Beneficiário para Salvar"
                                    : `Confirmar e Salvar Boleto`
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}