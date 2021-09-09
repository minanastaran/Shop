import React from 'react';

import {
    Dialog,
    Box,
    IconButton,
    DialogTitle,
    DialogContent
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
const Modal = ({ isOpen, title, subTitle, onClose ,children}) => {
    const [open, setOpen] = React.useState(isOpen);
    const [scroll, setScroll] = React.useState('body');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        onClose()
    };


    React.useEffect(() => {
        setOpen(isOpen)
    }, [isOpen]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                className="modal"
            >
                <DialogTitle id="scroll-dialog-title" className="modal__header">
                    <Box
                        alignItems="flex-start"
                        display="flex"
                        flexDirection="column"
                        

                    >
                        <div 
                        className="modal__header__title"
                        style={subTitle ? null : {transform: 'translate(0, 50%)'}}
                        >{title}</div>
                        {
                            subTitle && <div className="modal__header__sub-title">{subTitle}</div>
                        }
                        
                    </Box>
                    {onClose ? (
                        <IconButton aria-label="close" onClick={handleClose} className="modal__header__close-btn">
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                 {
                     children
                 }
                </DialogContent>
           
            </Dialog>
        </div>
    );
}
export default Modal