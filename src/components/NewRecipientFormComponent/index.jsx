import { useState } from "react";
import { createRecipient } from "../../services/recipientService";

export default function NewRecipientForm() {

    const [cnpj, setCnpj] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function formatCnpj(value) {

        value = value.replace(/\D/g, "");

        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");

        return value.substring(0, 18);
    }

    function handleCnpjChange(e) {

        const formatted = formatCnpj(e.target.value);

        setCnpj(formatted);
    }

    function validate() {

        const newErrors = {};

        const cleanCnpj = cnpj.replace(/\D/g, "");

        if (cleanCnpj.length !== 14) {
            newErrors.cnpj = "CNPJ deve possuir 14 dígitos";
        }

        if (!companyName.trim()) {
            newErrors.companyName = "Razão social é obrigatória";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            const recipient = {
                companyName,
                cnpj: cnpj.replace(/\D/g, "")
            };

            await createRecipient(recipient);

            setCnpj("");
            setCompanyName("");
            setErrors({});

        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="container py-4">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <h4 className="text-center mb-4">
                        Novo Beneficiário
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                CNPJ
                            </label>

                            <input
                                type="text"
                                className={`form-control ${errors.cnpj ? "is-invalid" : ""}`}
                                placeholder="00.000.000/0000-00"
                                value={cnpj}
                                onChange={handleCnpjChange}
                            />

                            {errors.cnpj && (
                                <div className="invalid-feedback">
                                    {errors.cnpj}
                                </div>
                            )}

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Razão Social
                            </label>

                            <input
                                type="text"
                                className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                                placeholder="Digite a razão social"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />

                            {errors.companyName && (
                                <div className="invalid-feedback">
                                    {errors.companyName}
                                </div>
                            )}

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}