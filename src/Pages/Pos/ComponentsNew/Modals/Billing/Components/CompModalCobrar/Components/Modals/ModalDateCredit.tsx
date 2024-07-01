import { FC, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import HeaderModal from '../../../../../../../../../common/Generics/Modal/CompontenHeader/HeaderModal'
import Flatpickr from "react-flatpickr"
import 'flatpickr/dist/themes/material_blue.css'
import { Spanish } from "flatpickr/dist/l10n/es.js"
import BtnPosModal from '../../../../../../../../../Components/Common/Buttons/BtnPosModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalDateCredit: FC<IProps> = ({
    show,
    onCloseClick
}) => {
    const [selectedDate, setSelectedDate] = useState<any>()
    const handleCredit = () => {

        const fechaActual = new Date()
        const fechaActualString = fechaActual.toISOString().split('T')[0]

        if (fechaActualString >= selectedDate) {
            console.log('fecha incorrecta 1')

        } else {
            console.log('fecha incorrecta 2')

        }

    }
    return (
        <Modal isOpen={show} toggle={onCloseClick}>
            <HeaderModal
                textHeader='Fecha credito'
            />
            <ModalBody className='page-bg'>
                <div className="my-2 text-danger card">
                    <Flatpickr
                        onChange={(date) => setSelectedDate(date[0].toISOString().split('T')[0])}
                        className="form-control text-black"
                        options={{
                            inline: true,
                            dateFormat: "Y-m-d",
                            position: 'above center',
                            "locale": Spanish,
                        }}
                    />
                </div>
                <BtnPosModal
                    onAceptarClick={() => handleCredit()}
                    onCloseClick={() => console.log('2')}

                />
            </ModalBody>
        </Modal>
    )
}

export default ModalDateCredit