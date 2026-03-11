import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import AppRoutes from "./routes/AppRoutes.jsx"
import HeaderComponent from "./components/HeaderComponent/index.jsx";
import FooterComponent from "./components/FooterComponent/index.jsx";

import './App.css'

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      {/* d-flex flex-column h-100 garante que o container ocupe a altura disponível sem sobras */}
      <div className="d-flex flex-column h-100">

        {isAuthenticated && <HeaderComponent />}

        <main className={`flex-shrink-0 ${isAuthenticated ? 'pt-4' : ''}`}>
          {/* O container evita que os elementos estiquem até a borda da tela */}
          <div className="container">
            <AppRoutes />
          </div>
        </main>

        {/* mt-auto empurra o footer para o fim, mas só aparece se autenticado */}
        {isAuthenticated && (
          <footer className="footer mt-auto py-3 border-top border-secondary text-center text-muted">
            <div className="container">
              <span className="small">Developed by Nazareth Software House</span>
            </div>
          </footer>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App;