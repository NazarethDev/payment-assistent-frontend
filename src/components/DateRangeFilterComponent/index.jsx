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
        <form onSubmit={handleSubmit} className="row g-3 align-items-end mb-4 bg-light p-3 rounded border">
            <div className="col-md-4">
                <label className="form-label small fw-bold text-muted">DATA INICIAL</label>
                <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={dates.startDate}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <label className="form-label small fw-bold text-muted">DATA FINAL</label>
                <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={dates.endDate}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <button type="submit" className="btn btn-primary w-100">
                    <i className="bi bi-search me-2"></i>Filtrar Boletos
                </button>
            </div>
        </form>
    );
}