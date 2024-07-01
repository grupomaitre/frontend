import React from "react";
import { Modal, ModalBody } from "reactstrap";

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>¿Estás seguro/a?</h4>
                        <p className="text-muted mx-4 mb-0">
                            ¿Estás seguro/a de que quieres eliminar este registro?
                        </p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                        type="button"
                        className="btn w-sm btn-light"
                        data-bs-dismiss="modal"
                        onClick={onCloseClick}
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger "
                        id="delete-record"
                        onClick={onDeleteClick}
                    >
                        Sí, bórralo.
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};


export default DeleteModal;