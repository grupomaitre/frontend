import { FC } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
interface IDeleteModal {
    show?: boolean;
    onCloseClick?: () => void;
    onConfimation?: () => void;
}
const ModalConfimacion: FC<IDeleteModal> = ({ show, onConfimation, onCloseClick }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true} size="sm" fade={false}>
            <ModalBody className="">
                <div className="my-3 text-center">
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <span>¿Esta seguro de Aperturar Cuenta?</span>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mx-2 mb-2">
                    <Button
                        block
                        onClick={onConfimation}
                        style={{ background: '#279241' }}
                    >
                        Si </Button>

                    <Button
                        block
                        onClick={onCloseClick}
                        color='danger'
                        style={{ background: '#ff1414' }}
                        className=""
                    >
                        No </Button>

                </div>
            </ModalBody>
        </Modal>
    );
};


export default ModalConfimacion;