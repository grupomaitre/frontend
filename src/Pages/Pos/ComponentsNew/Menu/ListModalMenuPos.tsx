import { useEffect, useState } from 'react'
import ModalPersonal from '../ComponetsMenuPos/ModalPersonal'
import ModalTimbrar from '../ComponetsMenuPos/ModalTimbrar'
import ModalReferencia from '../ComponetsMenuPos/ModalReferencia'
import ModalMensajes from '../ComponetsMenuPos/ModalMensajes'
import ModalReservas from '../ComponetsMenuPos/ModalReservas'
import ModalCortesia from '../ComponetsMenuPos/ModalCortesia'
import ModalMudarItem from '../ComponetsMenuPos/ModalMudarItem'
import ModalMudarCuenta from '../ComponetsMenuPos/ModalMudarCuenta'
import ModalFunciones from '../ComponetsMenuPos/ModalFunciones'

const ListModalMenuPos = (props: any) => {
    const { activeModal, setItemUniCart, item } = props
    const [verModal, setVerModal] = useState(false)

    const listModals = [
        {
            id: 1,
            Modal: activeModal === 1 && <ModalPersonal
                show={verModal && activeModal === 1}
                onCloseClick={() => setVerModal(false)}
            />
        },
        {
            id: 2,
            Modal: activeModal === 2 && <ModalTimbrar
                show={verModal && activeModal === 2}
                onCloseClick={() => setVerModal(false)}

            />

        },
        {
            id: 4,
            Modal: activeModal === 4 && <ModalReferencia
                setItemUniCart={setItemUniCart}
                item={item}
                show={verModal && activeModal === 4}
                onCloseClick={() => setVerModal(false)}
            />
        },
        {
            id: 5,
            Modal: activeModal === 5 && <ModalMensajes
                show={verModal && activeModal === 5}
                onCloseClick={() => setVerModal(false)}
            />
        },
        {
            id: 7,
            Modal: activeModal === 7 && <ModalReservas
                show={verModal && activeModal === 7}
                onCloseClick={() => setVerModal(false)}
            />
        },
        {
            id: 8,
            Modal: activeModal === 8 && <ModalCortesia
                show={verModal && activeModal === 8}
                onCloseClick={() => setVerModal(false)}
                item={item}
            />
        },
        {
            id: 9,
            Modal: activeModal === 9 && <ModalMudarItem
                show={verModal && activeModal === 9}
                onCloseClick={() => setVerModal(false)}
            />
        },
        {
            id: 10,
            Modal: activeModal === 10 && <ModalMudarCuenta
                show={verModal && activeModal === 10}
                onCloseClick={() => setVerModal(false)}
            />
        },
        {
            id: 13,
            Modal: activeModal === 13 &&
                <ModalFunciones
                    show={verModal && activeModal === 13}
                    onCloseClick={() => setVerModal(false)}
                />
        },

    ]


    useEffect(() => {
        const modal = listModals.find(item => item.id === activeModal);
        if (modal) {
            setVerModal(true);
        } else {
            setVerModal(false);
        }
    }, [activeModal]);

    return (
        <>
            {listModals &&
                (listModals || []).map((item: any, key: number) => (
                    <div key={key}>
                        {item.Modal}
                    </div>
                ))}
        </>
    )
}

export default ListModalMenuPos