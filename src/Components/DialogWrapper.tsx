import { Dialog } from '@mui/material'
import React, { ReactNode } from 'react'

interface DialogWrapperProps {
    open: boolean,
    handleClose: () => void,
    children: ReactNode
}

function DialogWrapper({ open, handleClose, children }: DialogWrapperProps) {

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md">
            {children}
        </Dialog>
    )
}

export default DialogWrapper
