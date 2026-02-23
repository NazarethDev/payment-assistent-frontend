import { useState } from "react";
import { login } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await login(username, password);
            navigate("/");
        } catch (err) {
            setError("Usuário ou senha inválidos");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">

            <form
                onSubmit={handleSubmit}
                className="border rounded-4 shadow p-4"
                style={{ minWidth: "320px", maxWidth: "400px", width: "100%" }}
            >

                <h4 className="text-center mb-4">Login</h4>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="nome de usuário"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Entrar
                </button>

                {error && (
                    <div className="alert alert-danger mt-3 mb-0 text-center">
                        {error}
                    </div>
                )}

            </form>

        </div>


    );
}