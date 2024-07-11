import { useEffect, useState, FC } from 'react'
import { Row, Col } from 'reactstrap'
//toast
import { ToastContainer } from 'react-toastify'
//redux
import { useSelector, useDispatch } from 'react-redux'
import ModalPersonal from '../ComponetsMenuPos/ModalPersonal'
import './css/style.css'
import InputCuenta from './Components/InputCuenta'
import InputVendedor from './Components/InputVendedor'
import BtnCardOrders from './Components/BtnCardOrders'
import { setInputMesa, setInputVendedor } from '../../../../slices/Cart/cartStatusSlice'
interface IProps {
    //final teclado v2
    inputRef: null | any
    inputValues: any
    activeInputIndex: number
    setInputValues: any
    onChangeProp: (event: React.ChangeEvent<HTMLInputElement> | any, n: number) => void
    clearInvidualInput: (index: number) => void
    handleInputClick: (index: number) => void
    handleInputFocus: (index: number) => void
    handleKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void

}
const CardOrders: FC<IProps> = ({
    //  userFuncion,
    inputRef,
    inputValues,
    setInputValues,
    onChangeProp,
    handleInputClick,
    handleInputFocus,
    handleKeydown

}) => {

    const idMesa = useSelector((state: any) => state.cartSlice.idMesa)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const count = useSelector((state: any) => state.tecladoSlice.count)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    //input test 
    const dispatch = useDispatch()
    const [showModalPersonal, setShowModalPersonal] = useState(false)
    useEffect(() => {
        if (idMesa === 0 && id_user === 0) {
            dispatch(setInputMesa(false))
            dispatch(setInputVendedor(true))
            setInputValues(['', '', '', ''])
            setTimeout(() => {
                inputRef.current[0].current?.focus()
                inputRef.current[1].current?.blur()
            }, 100);
            return
        }
        if (idMesa > 0) {
            setInputValues([mesacart, '', '', ''])
            dispatch(setInputMesa(true))
            dispatch(setInputVendedor(false))
            setTimeout(() => {
                inputRef.current[0].current?.blur()
                inputRef.current[1].current?.focus()
            }, 100);
            return
        }

    }, [idMesa, mesacart, count])

    useEffect(() => {
        if (idMesa > 0 && id_user > 0) {
            setInputValues([mesacart, '****', '', ''])
            dispatch(setInputMesa(true))
            dispatch(setInputVendedor(true))
            inputRef.current[2].current?.focus()
            return
        }
    }, [idMesa, id_user, mesacart])
    return (
        <>
            <>
                {showModalPersonal &&
                    <ModalPersonal
                        show={showModalPersonal}
                        onCloseClick={() => setShowModalPersonal(false)}
                    />}

            </>

            <Row style={{ background: '#fff', border: '1px solid rgb(0,0,0,0.3)', borderRadius: '5px' }} className='mb-2 mx-1' >
                <Col lg='6' className='shadow-sm'>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <InputCuenta
                            handleInputClick={handleInputClick}
                            handleInputFocus={handleInputFocus}
                            handleKeydown={handleKeydown}
                            inputRef={inputRef}
                            setInputValues={setInputValues}
                            inputValues={inputValues}
                            onChangeProp={onChangeProp}
                        />
                        <InputVendedor
                            handleInputClick={handleInputClick}
                            handleInputFocus={handleInputFocus}
                            handleKeydown={handleKeydown}
                            inputRef={inputRef}
                            setInputValues={setInputValues}
                            inputValues={inputValues}
                            onChangeProp={onChangeProp}
                            setShowModalPersonal={() => setShowModalPersonal(true)}
                        />

                    </Row>
                    <Row className=''>
                        <Col lg='' className='text-center mt-1 border-top border-secondary'>
                            <span className='fs-13 text-capitalize '>{vendedor || null}</span>
                        </Col>
                    </Row>
                </Col>

                <BtnCardOrders />

            </Row>

            <ToastContainer />

        </>
    )
}

export default CardOrders