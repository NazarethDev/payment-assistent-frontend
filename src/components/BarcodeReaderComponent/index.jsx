import { useRef, useState } from "react";
import { useBarcodeScanner } from "../../hooks/useBarcodeScanner";
import  formatBoletoLinhaDigitavel from "../../utils/formatBoletoLinhaDigitavel";

export default function BarcodeReaderComponent({ onDetected }) {
    const videoRef = useRef(null);
    const [enabled, setEnabled] = useState(false);
    const [manualCode, setManualCode] = useState("");

    useBarcodeScanner({ videoRef, enabled, onDetected });

    const handleManualSubmit = () => {
        const raw = manualCode.replace(/\D/g, "");
        if (!raw) return;
        onDetected(raw);
        setManualCode("");
    };

    const handleInputChange = (e) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 47);
        setManualCode(raw);
    };

    return (
        <div className="barcode-reader-container">
            {/* O vídeo só ocupa espaço se estiver habilitado */}
            <div className={`video-wrapper ${enabled ? 'mb-3' : ''}`} style={{ display: enabled ? 'block' : 'none' }}>
                <video
                    ref={videoRef}
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        borderRadius: "8px",
                        backgroundColor: "#000"
                    }}
                />
            </div>

            <div className="input-group">
                {/* Botão de Câmera Lado a Lado */}
                <button
                    className={`btn ${enabled ? 'btn-danger' : 'btn-primary'}`}
                    type="button"
                    onClick={() => setEnabled(!enabled)}
                    title={enabled ? "Parar Câmera" : "Usar Câmera"}
                >
                    <i className={`bi ${enabled ? 'bi-camera-video-off' : 'bi-camera-video'}`}></i>
                    {enabled ? " Parar" : " Ler com Câmera"}
                </button>

                {/* Input de Linha Digitável */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ou digite a linha digitável..."
                    value={formatBoletoLinhaDigitavel(manualCode)}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleManualSubmit();
                    }}
                />

                {/* Botão de Confirmar Código */}
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleManualSubmit}
                    disabled={manualCode.length < 44}
                >
                    Confirmar
                </button>
            </div>

            {enabled && <small className="text-muted d-block mt-1">Aponte a câmera para o código de barras do boleto</small>}
        </div>
    );
}