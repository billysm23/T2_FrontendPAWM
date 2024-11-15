class ApiError {
    static handle(error) {
        // Jika ada response error dari backend
        if (error.response) {
            const errorData = error.response.data;
            // Error yang sudah dinormalisasi oleh backend
            if (errorData.error) {
                return {
                    message: errorData.error.message,
                    code: errorData.error.code,
                    field: ApiError.getErrorField(errorData.error.code),
                    action: ApiError.getErrorAction(errorData.error.code)
                };
            }

            // Fallback error HTTP tanpa format khusus
            return {
                message: 'An error occurred. Please try again.',
                code: `HTTP_${error.response.status}`,
                action: 'retry'
            };
        }

        // Error network
        if (error.request) {
            return {
                message: 'Unable to connect to server. Please check your connection.',
                code: 'NETWORK_ERROR',
                action: 'retry'
            };
        }

        // Error lainnya
        return {
            message: error.message || 'An unexpected error occurred',
            code: 'UNKNOWN_ERROR',
            action: 'retry'
        };
    }

    // Helper untuk menentukan field yang bermasalah
    static getErrorField(code) {
        switch (code) {
            case '1001': // INVALID_CREDENTIALS
                return ['email', 'password'];
            case '1004': // USER_NOT_FOUND 
                return ['email'];
            case '2001': // VALIDATION_ERROR
            case '2002': // INVALID_INPUT
            case '2003': // MISSING_FIELD
            case '2004': // INVALID_FORMAT
                return ['form'];
            case '3002': // RESOURCE_EXISTS
                return ['email', 'username'];
            default:
                return null;
        }
    }

    // Helper untuk menentukan tindakan yang harus diambil
    static getErrorAction(code) {
        if (code.startsWith('1')) { // Auth errors
            switch (code) {
                case '1002': // TOKEN_EXPIRED
                case '1003': // TOKEN_INVALID
                case '1007': // SESSION_INVALID
                    return 'login';
                case '1006': // SESSION_EXISTS  
                    return 'logout';
                default:
                    return 'retry';
            }
        }
        
        if (code.startsWith('2')) { // Validation errors
            return 'validate';
        }
        
        if (code.startsWith('4') || code.startsWith('9')) { // DB & Server errors
            return 'retry';
        }
        
        return 'retry';
    }
}

export default ApiError;