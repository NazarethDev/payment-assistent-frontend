export default function ToastComponent({ message, show, onClose, type = "success" }) {
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
            <div
                className={`toast align-items-center text-white bg-${type === 'success' ? 'dark' : 'danger'} border-0 ${show ? 'show' : 'hide'}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body d-flex align-items-center">
                        <i className={`bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                        {message}
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        onClick={onClose}
                    ></button>
                </div>
            </div>
        </div>
    );
}