import { ToastContainer, toast } from 'react-toastify';

export const applyToast = (message, type) => {
    const style = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };
    switch(type) {
        case 'error': {
            toast.error(message, style);
            break;
        }
        case 'warn': {
            toast.warn(message, style);
            break;
        }
        case 'success': {
            toast.success(message, style);
            break;
        }
        case 'info': {
            toast.info(message, style);
            break;
        }
        default: {
            toast.error(message || 'Something went wrong!', style);
            break;
        }
    }
}

export const toastContainer = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}