import { useState, useEffect } from "react";
import { searchRecipient } from "../../services/recipientService";

export default function SearchRecipientByNameComponent({ onSelectRecipient }) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState(null);

    useEffect(() => {

        const delayDebounce = setTimeout(async () => {

            if (query.length < 2) {
                setResults([]);
                return;
            }

            try {

                const data = await searchRecipient(query);
                setResults(data);

            } catch (error) {
                console.error("Erro ao buscar beneficiários", error);
            }

        }, 300); // debounce 300ms

        return () => clearTimeout(delayDebounce);

    }, [query]);

    function handleSelect(recipient) {

        setSelectedRecipient(recipient);
        setQuery(recipient.companyName);
        setResults([]);

        if (onSelectRecipient) {
            onSelectRecipient(recipient);
        }
    }

    return (

        <div className="position-relative">

            <input
                type="text"
                className="form-control"
                placeholder="Buscar beneficiário"
                value={query}
                onChange={(e) => {
                    setSelectedRecipient(null);
                    setQuery(e.target.value);
                }}
            />

            {results.length > 0 && (

                <ul
                    className="list-group position-absolute w-100 shadow"
                    style={{ zIndex: 1000 }}
                >

                    {results.map((recipient) => (

                        <li
                            key={recipient.id}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelect(recipient)}
                        >

                            <div className="fw-semibold">
                                {recipient.companyName}
                            </div>

                            <small className="text-muted">
                                {recipient.cnpj}
                            </small>

                        </li>

                    ))}

                </ul>

            )}

        </div>

    );
} 