import React, { useState } from 'react'
import { useMessageContext } from '../contexts/MessageBox'
import { Alert } from '@mui/material'

interface MessageBoxProps {

}
const MessageBox: React.FC<MessageBoxProps> = () => {

    const { message } = useMessageContext()
    const [show, setShow] = useState(false);


    return (
        <>
            {message !== null &&
                <div style={{ position: "fixed", bottom: 0, right: 0, margin: 16 }}>
                    <Alert style={{ width: 250, height: 50, display: "flex", alignItems: "center" }} severity={message.seveirity}><span>{message.message}</span></Alert>
                </div>}
        </>
    )
}

export default MessageBox
