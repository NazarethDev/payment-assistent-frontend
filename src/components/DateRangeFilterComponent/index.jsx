import { useState } from "react";

export default function DateRangeFilterComponent({ onFilter }) {
    const [dates, setDates] = useState({
        startDate: new Date().toISOString().split('T')[0], // Hoje
        endDate: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDates(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(dates.startDate, dates.endDate);
    };

    return (
        <form onSubmit={handleSubmit} className="row g-3 align-items-end p-4 rounded-4 border-0 shadow-sm bg-white mb-5">
            {/* Usamos bg-white e rounded-4 para combinar com os outros componentes que fizemos */}
            <div className="col-md-4">
                <label className="form-label small fw-bold text-secondary text-uppercase" style={{ fontSize: '0.7rem' }}>
                    Data Inicial
                </label>
                <input
                    type="date"
                    name="startDate"
                    className="form-control form-control-sm border-light-subtle bg-light rounded-3"
                    value={dates.startDate}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <label className="form-label small fw-bold text-secondary text-uppercase" style={{ fontSize: '0.7rem' }}>
                    Data Final
                </label>
                <input
                    type="date"
                    name="endDate"
                    className="form-control form-control-sm border-light-subtle bg-light rounded-3"
                    value={dates.endDate}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <button type="submit" className="btn btn-primary btn-sm w-100 rounded-3 fw-bold shadow-sm">
                    <i className="bi bi-funnel me-2"></i>Filtrar
                </button>
            </div>
        </form>
    );
}