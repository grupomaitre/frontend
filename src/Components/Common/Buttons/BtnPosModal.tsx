import { FC, useEffect, useState } from 'react'
import { Button, Label } from 'reactstrap'

interface BtnPosModalProps {
    onAceptarClick: () => void
    onCloseClick: () => void
    vertical?: boolean
    text?: string
    btnDisabled?: boolean | any
    divClass?: string
    textCancelar?: string
    btnClassAceptar?: string
    styleAceptar?: any
    btnClassCancelar?: string
    styleCancelar?: any
}
const BtnPosModal: FC<BtnPosModalProps> = ({
    onAceptarClick,
    onCloseClick,
    text,
    btnDisabled,
    textCancelar,
    btnClassAceptar,
    styleAceptar,
    styleCancelar,
    divClass

}) => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const onAceptar = () => {
        onAceptarClick()
    }
    const handleClose = () => {
        onCloseClick()
    }
    useEffect(() => {
        setDisabled(btnDisabled)
    }, [btnDisabled])
    return (
        /*      <ButtonGroup style={{ background: '#d6d9df' }} vertical={vertical} className={divClass}> */
        <div className={'d-flex gap-2 ' + divClass}>
            <Button

                disabled={disabled}
                className={'d-flex align-items-center border shadow-lg ' + btnClassAceptar}
                block
                color='primary'
                onClick={onAceptar}
                style={styleAceptar || { height: '50px', color: 'white' }}>

                {text || 'Aceptar'}
            </Button>
            <Button

                color='danger'
                block
                className={'d-flex align-items-center shadow-md ' + btnClassAceptar}
                onClick={handleClose}
                style={styleCancelar || { height: '50px', color: '#fff' }}
            >

                {textCancelar || 'Cancelar'}

            </Button>
            {/*         <Button
                outline
                color='danger'
            >
             
            </Button> */}
        </div >
        /*    </ButtonGroup> */
    )
}

export default BtnPosModal