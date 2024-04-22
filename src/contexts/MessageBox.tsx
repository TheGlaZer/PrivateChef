import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertColor } from '@mui/material';

type ErrorInfo = {
    message: string,
    seveirity: AlertColor | undefined
} | null

interface ErrorContextProps {

    message: ErrorInfo
    setErrorMessage: (text: string) => void
    setSuccessMessage: (text: string) => void
    setWarningMessage: (text: string) => void
}

const MessageContext = createContext<ErrorContextProps | undefined>(undefined);

export const useMessageContext = (): ErrorContextProps => {

    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessageContext must be used within a MessageProvider');
    }
    return context;
};

export const initialMessageContext = { message: '', seveirity: undefined }

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [message, setValueMessage] = useState<ErrorInfo>(null);


    const setErrorMessage = (text: string) => {
        const errorMessage: ErrorInfo = { message: text, seveirity: 'error' }
        setValueMessage(errorMessage)
        setTimeout(() => setValueMessage(null), 3000)
    }

    const setSuccessMessage = (text: string) => {
        const errorMessage: ErrorInfo = { message: text, seveirity: 'success' }
        setValueMessage(errorMessage)
        setTimeout(() => setValueMessage(null), 3000)
    }

    const setWarningMessage = (text: string) => {
        const errorMessage: ErrorInfo = { message: text, seveirity: 'warning' }
        setValueMessage(errorMessage)
        setTimeout(() => setValueMessage(null), 3000)
    }

    const contextValue: ErrorContextProps = {
        message,
        setErrorMessage,
        setSuccessMessage,
        setWarningMessage
    };

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
};
