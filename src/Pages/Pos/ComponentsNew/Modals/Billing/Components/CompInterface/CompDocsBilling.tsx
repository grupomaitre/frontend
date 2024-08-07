import React, { FC, useState, useEffect } from 'react'
import { Col, Button, Input, Label } from 'reactstrap'
import ModalCobrar from '../Modals/ModalCobrar'
import { socketTest } from '../../../../../Socket/ConctSocket'
import { useSelector, useDispatch } from 'react-redux'
import { updateMesaStatus } from '../../../../../Helpers/ApiMesas'
import { addCliente } from '../../Helpers/ApiFacturacion'
import { saveOrder } from '../../../../../Helpers/ApiBilling'
import { setIdOrder } from '../../../../../../../slices/Cart/cartSlice'
import { useQuery } from 'react-query'
import { getDocs } from '../Api/ApiDocs'
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
    const [btnDisabled, setBtnDisabled] = useState(false)
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
        setBtnDisabled(true)
        try {


            const saveOrderResult = await saveOrder(
                id_user,
                orden,
                subFinal1,
                totaldescuento1,
                subTotal,
                servicio,
                iva,
                totalPago,
                idCart,
                cliente.value, /* || updateMesaResult.data, */
                idCajaLocal || id_caja,
                item.nombre,
                item.id_documento
            );

            if (saveOrderResult) {
                await updateMesaStatus(idMesa);
                await addCliente(cliente);
                localStorage.setItem('clienteCobro', JSON.stringify(cliente))
                socketTest.emit('actualizarMesas');
                dispatch(setIdOrder(saveOrderResult.id_order));
                /*         const getOrdensResult = await getOrdens();
                        console.log(getOrdensResult)
                        dispatch(addOrden(getOrdensResult.data)); */
                // await handleAbrirCajon()
                setBtnDisabled(false)
                setShowModalCobra(true);

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
                                disabled={btnDisabled}
                                innerRef={key === newKey ? inputBtn : null}
                                key={key}
                                onClick={() => handleModal(item)}
                                className="text-uppercase text-center my-2 py-4 bg-primary text-white  shadow"
                                //onFocus={() => setInputName(key)}
                                onKeyDown={(e) => handleKeyDown(e, key)}

                            >

                                <span className='fs-13' style={{ fontWeight: '600' }}> {item.nombre} - {item.secuencial || 0}</span>
                            </Button>
                        ))
                    }
                </div>
                <Button className="d-flex justify-content-center text-center" block color='primary' outline>
                    <Input className="form-check-input border-success" type="checkbox" id="formCheck8" defaultChecked />
                    <Label className="form-check-label" for="formCheck8">
                        Sin Detalle
                    </Label>
                </Button>
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