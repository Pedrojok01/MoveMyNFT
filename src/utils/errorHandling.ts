import { ErrorMessages } from "@/data/errorMessages";

export const handleErrors = (err: any, contractInstance: any) => {
    let message = err.details ?? err.reason ?? err.message ?? err;

    if (err?.error?.data) {
        const revertData = err.error.data;

        try {
            const decodedError = contractInstance.interface.parseError(revertData);
            if (decodedError && decodedError.name !== "Error") {
                message = decodedError.name;
            }
        } catch (decodeError) {
            console.error("Error while decoding blockchain error:", decodeError);
        }
    }

    // Check if a user-friendly error message exists
    const userFriendlyMessage = ErrorMessages[message as keyof typeof ErrorMessages];
    if (userFriendlyMessage) {
        message = userFriendlyMessage;
    }

    return message;
};
