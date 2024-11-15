export const ErrorMessage = ({ error, onRetry }) => (
    <div className="error-container">
        <p className="error-message">{error}</p>
        {onRetry && (
            <button className="retry-button" onClick={onRetry}>
                Try Again
            </button>
        )}
        <style jsx>{`
            .error-container {
                text-align: center;
                padding: 2rem;
                background: var(--error-bg);
                border-radius: 8px;
                margin: 1rem 0;
            }
            .error-message {
                color: var(--error-color);
                margin-bottom: 1rem;
            }
            .retry-button {
                background: var(--primary-color);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                border: none;
                cursor: pointer;
            }
        `}</style>
    </div>
);