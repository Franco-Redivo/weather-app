

const ErrorMessage = ({ message }) => {
    return (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default ErrorMessage;