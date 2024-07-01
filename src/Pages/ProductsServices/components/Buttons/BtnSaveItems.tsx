import { FC } from 'react'
import { Button } from 'reactstrap'
interface Props {
    functionSave: () => void
    functionCancel: () => void
    text?: string
}
const BtnSaveItems: FC<Props> = ({ functionSave, functionCancel, text }) => {

    return (
        <div className="d-flex my-2 float-end">

            <Button
                onClick={functionSave}
                className="rounded-0 mx-2 float-end" color="light" size="sm">{text || 'Guardar'}</Button>
            <Button
                onClick={functionCancel}
                className="rounded-0 mx-2" color="danger" size="sm">Limpiar</Button>

        </div>
    )
}

export default BtnSaveItems