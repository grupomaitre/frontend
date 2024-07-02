import React, { FC, useState, useEffect } from 'react'
import { Col, Button, Input, Label } from 'reactstrap'
import ModalCobrar from '../Modals/ModalCobrar'
import { socketTest } from '../../../../../Socket/ConctSocket'
import { useSelector, useDispatch } from 'react-redux'
import { updateMesaStatus } from '../../../../../Helpers/ApiMesas'
import { addCliente } from '../../Helpers/ApiFacturacion'
import { saveOrder } from '../../../../../Helpers/ApiBilling'
import { getOrdens } from '../../../../../Helpers/ApiOrders'
import { addOrden, setIdOrder } from '../../../../../../../slices/Cart/cartSlice'
import { useQuery } from 'react-query'
import { getDocs, handleAbrirCajon } from '../Api/ApiDocs'
import SimpleBar from 'simplebar-react'
import './Components/btn.css'
import { subFinal, totalCart, totalDescuento, totalIva, totalServicio, totalSubtotal } from '../../../../../Func/FuncCart'
import ModalFacturacion from '../../../../../../../common/Generics/Facturacion/ModalFacturacion'
interface Props {
    closeModalBilling: any
    cliente: any
    methodPay: string
    inputBtn?: any
}
const CompDocsBilling: FC<Props> = ({ closeModalBilling, cliente, /* methodPay, */ inputBtn }) => {
    const [showModalFactur, setShowModalFactur] = useState(false)
    const [items, setItems] = useState()
    const dispatch = useDispatch()
    const [showModalCobra, setShowModalCobra] = useState(false)
    const idMesa = useSelector((state: any) => state.cartSlice.idMesa)
    const id_caja = useSelector((state: any) => state.cajaSlice.caja)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const orden = useSelector((state: any) => state.cartSlice.orden)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    const { data } = useQuery('documentos', getDocs, {
        /*        staleTime: Infinity,
               cacheTime: Infinity */
    });
    const totalPago = totalCart()
    const subFinal1 = subFinal()
    const totaldescuento1 = totalDescuento()
    const subTotal = totalSubtotal()
    const servicio = totalServicio()
    const iva = totalIva()
    const handleModal = async (item: any) => {
        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
        /*      console.log(item?.tipo_documento?.nombre)
             setShowModalFactur(true)
             return */
        try {
            const addClienteResult = await addCliente(cliente);
            if (addClienteResult) {
                const updateMesaResult = await updateMesaStatus(idMesa);
                if (updateMesaResult) {
                    const saveOrderResult =
                        await saveOrder(
                            id_user,
                            orden,
                            subFinal1,
                            totaldescuento1,
                            subTotal,
                            servicio,
                            iva,
                            totalPago,
                            idCart,
                            cliente.value || updateMesaResult.data,
                            idCajaLocal || id_caja,
                            item.nombre,
                            item.id_documento
                        );

                    if (saveOrderResult) {
                        localStorage.setItem('clienteCobro', JSON.stringify(cliente))
                        setShowModalCobra(true);
                        socketTest.emit('actualizarMesas');
                        dispatch(setIdOrder(saveOrderResult.id_order));
                        const getOrdensResult = await getOrdens();
                        dispatch(addOrden(getOrdensResult.data));
                        await handleAbrirCajon()
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    //ref buttons
    const inputRef1 = React.useRef<HTMLInputElement>(null)


    //inputRef1 is focus alert
    useEffect(() => {
        if (inputRef1.current?.focus) {
            alert('focus')
        }
    }, [inputRef1])


    useEffect(() => {
        if (inputBtn.current) {
            //   inputBtn.current.focus()
        }
    }, [inputBtn])
    //const [inputTest, setInputTest] = useState<boolean>(false)
    //  const [inputName, setInputName] = useState<string | number>('')
    useEffect(() => {
        if (inputBtn.current) {
            // setInputTest(true)
        }
    }, [inputBtn])
    const [isBtn, setIsBtn] = useState(false)
    const [newKey, setNewKey] = useState(0)

    const handleKeyDown = (e: any, key: any) => {
        if (e.key === 'ArrowDown') {
            console.log('next btn ', key)
            setNewKey(key + 1)
        }
    }
    return (
        <>
            {showModalFactur &&
                <ModalFacturacion
                    show={showModalFactur}
                    onCloseClick={() => setShowModalFactur(false)}
                    itemFacturacion={items}
                />
            }
            {showModalCobra &&
                <ModalCobrar
                    show={showModalCobra}
                    onCloseClick={() => setShowModalCobra(false)}
                    closeModalBilling={closeModalBilling}
                />}
            <Col lg='' >

                <div style={{ height: '250px', overflowY: 'scroll' }} className='pe-1 px-1' >

                    {
                        (data || []).map((item: any, key: number) => (
                            <Button
                                block
                                color=''
                                innerRef={key === newKey ? inputBtn : null}
                                key={item?.id_documento}
                                onClick={() => handleModal(item)}
                                className="text-uppercase text-center my-2 py-4 bg-primary text-white  shadow"
                                //onFocus={() => setInputName(key)}
                                onKeyDown={(e) => handleKeyDown(e, key)}

                            >

                                <span className='fs-13' style={{ fontWeight: '600' }}> {item.nombre} - {item.id_documento || 0}</span>
                            </Button>
                        ))
                    }
                </div>
                <div className="form-check form-check-success my-3">
                    <Input className="form-check-input" type="checkbox" id="formCheck8" defaultChecked />
                    <Label className="form-check-label text-success" for="formCheck8">
                        Sin Detalle
                    </Label>
                </div>
                {/*       <div className='d-flex'>

                    <Button block color='' className='my-2 bg-primary'
                        onClick={() => setIsBtn(!isBtn)}
                        style={{ height: '33px' }}
                    >
                        <Input type='checkbox'
                            className='bg-danger'
                            defaultChecked={isBtn}
                        />
                        <span className='text-white'>  Sin detalle</span>
                    </Button>
                </div> */}

            </Col>
        </>
    )
}

export default CompDocsBilling