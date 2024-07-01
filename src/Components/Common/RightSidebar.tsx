import React, { useState } from 'react';
import {

    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";




const RightSidebar = () => {



    // open offcanvas
    const [open, setOpen] = useState(false);
    const toggleLeftCanvas = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>

            <div>
                <div className="customizer-setting d-none d-md-block">
                    <div onClick={toggleLeftCanvas} className="btn-info btn-rounded shadow-lg btn btn-icon btn-lg p-2">
                        <i className='mdi  mdi-cog-outline fs-22'></i>
                    </div>
                </div>
                <Modal isOpen={open} toggle={toggleLeftCanvas} size='xl' className="modal-fullscreen" style={{ maxHeight: '100vh', maxWidth: '300px' }}>
                    <ModalHeader toggle={toggleLeftCanvas}>
                        {'Personalizar punto de venta'}
                    </ModalHeader>
                    <ModalBody>
                    </ModalBody>
                </Modal>

            </div>
        </React.Fragment>
    );
};

export default RightSidebar;