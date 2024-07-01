import React, { FC, createRef, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import Select from 'react-select'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import axios from 'axios'
import { SwalError, toastError, toastSuccess } from '../../../../Components/Common/Swals/SwalsApi'
import ConfirmationModal from '../../../../Components/Common/Modals/ConfirmationModal'
import { useSelector } from 'react-redux'
import { Search } from 'react-feather'
import { getOrdenes } from '../../Api/Anulaciones/Order'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { ToastContainer } from 'react-toastify'
import { listCabeceraOrder, updateStatusCabecera } from './Api/ApiCabecera'
import Overlay from '../../../../common/Loading/Overlay'
import { socketTest } from '../../Socket/ConctSocket'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalAnulacionCuenta: FC<IProps> = ({ show, onCloseClick }) => {

    const [inputOrden, setInputOrden] = useState<string>('')
    const [inputClient, setInputClient] = useState('')
    const [inputCI, setInputCI] = useState('')
    const inputRef: any = useRef(null)
    const idCaja = useSelector((state: any) => state.cajaSlice.caja)
    const [orden, setOrden] = React.useState<any>()
    const [cartProducts, setCartProducts] = React.useState<any>([])
    const [idOrden, setidOrden] = React.useState<any>([])
    const [showModalConfirmation, setShowModalConfirmation] = React.useState<boolean>(false)
    const [options, setOptions] = React.useState<any>()
    const [products, setProducts] = useState()
    const [selectItemRow, setSelectItemRow] = useState()
    const { data } = useQuery(["ordenes"], getOrdenes, {
        refetchOnWindowFocus: false

    })
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
    const [selectedOption, setSelectedOption] = useState<any>(null)
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 100);
    }, [show])
    const { data: ordeneRango, refetch: refetch, isLoading, isError } = useQuery(['cabecerasOrden', idCajaLocal], () => listCabeceraOrder(idCajaLocal), {
        refetchOnWindowFocus: false
    });
    useEffect(() => {
        setOptions((data || []).map((item: any) => (
            {
                value: item.id_order,
                label: item.num_order,
                cart: item.cart
            }
        )))
    }, [])
    const searchOrden = async () => {
        try {
            const result = await axios.get("api/v1/reporte-buscar-orden", {
                params:
                    { id_order: inputOrden, estado: 'C', id_caja: idCajaLocal }
            })

            if (result?.data === null) {
                inputRef.current?.focus()
                setInputOrden('')
                setCartProducts([])
                setInputClient('')
                setInputCI('')
            } else {
                setidOrden(result.data.id_order)
                setCartProducts(result?.data?.cart?.product)
                setInputClient(result?.data?.cliente?.razon_social || '')
                setInputCI(result?.data?.cliente?.identificacion || '')

            }
        } catch (e) {
            toastError({ message: e })
        }
    }
    const anularOrden = async () => {

        try {
            const result = await axios.post("api/v1/reporte-anular-orden", { id_order: idOrden })
            if (result.data) {
                setOrden('')
                setidOrden([])
                setCartProducts([])
                toastSuccess({ message: 'Orden anulada correctamente' })
            }
        } catch (e) {
            toastError({ message: 'Error al anular la orden' })
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Item',
                accessor: 'nombre',
            },
            {
                Header: 'Cantidad',
                accessor: 'cantidad',
            },
            {
                Header: 'Precio',
                accessor: 'precio',
            },
            {
                Header: 'Total',
                accessor: 'total',
            }
        ],
        []
    )
    //total cartProducts
    const total = cartProducts.reduce((acc: any, el: any) => acc + (parseFloat(el.total)), 0)
    const handleSetCart = (item: any) => {
        setSelectedOption(item)

        /* 
                console.log(item.value)
                setProducts(item.cart.product) */
    }
    const handleAnularRecupera = async () => {
        const res: any = await updateStatusCabecera(parseInt(inputOrden), 'C', idCajaLocal)
        if (res.status === 'success') {
            socketTest.emit('actualizarMesas')
            setShowModalConfirmation(false)
            onCloseClick()
        }
    }
    return (
        <>
            {
                showModalConfirmation && <ConfirmationModal
                    show={showModalConfirmation}
                    onCloseClick={() => setShowModalConfirmation(false)}
                    onConfirmClick={() => handleAnularRecupera()}
                    title={`Desea anular Comprobante con Orden ${idOrden}, se eliminarán los pagos del Comprobante`}
                    message='¿Está seguro que desea anular la orden?'
                    size='md'
                />
            }
            <Modal isOpen={show} toggle={onCloseClick} size='lg'>
                <ModalHeader className='p-0 px-3'>
                    <span className='fs-14'>{'Caja N° ' + idCajaLocal}</span>
                </ModalHeader>
                <ModalBody className='fs-11 text-white' style={{ background: 'rgb(255, 183, 3,5%)' }}>

                    <Row className=''>

                        <Col lg='8'>

                            <Card className='shadow-md'>
                                <CardBody >
                                    <Row className='mb-1'>
                                        <Col>
                                            <Label className='fs-14'>Numero de orden :</Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                innerRef={inputRef}
                                                value={inputOrden}
                                                bsSize='sm'
                                                onChange={(e) => setInputOrden(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" ? searchOrden() : console.log('nulo')}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col >
                                            <Label className='m-0 fs-11'>Cédula / RUC / Pasaporte / Nombre / Comprobante de Venta</Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                type='text'
                                                className=''
                                                bsSize='sm'
                                            />
                                        </Col>

                                    </Row>

                                </CardBody>
                                <CardFooter>
                                    <Button
                                        onClick={() => searchOrden()}
                                        block
                                        style={{ height: '50px' }}
                                 /*        color="primary" */ className="fs-11 border d-flex align-items-center justify-content-between bg-orange">
                                        <Search size={25} className='w-25 border-end' />
                                        <div className='w-75 fs-6'>
                                            Buscar Orden
                                        </div>
                                    </Button>
                                </CardFooter>
                            </Card>

                        </Col>
                        <Col className=' fs-11'>
                            <Card className='shadow-md'>
                                <CardBody>

                                    <Button block className="fs-13 border bg-orange"
                                        onClick={() => setShowModalConfirmation(true)}
                                        style={{ height: '45px' }}

                                    >  Anular Totalmente </Button>

                                    <Button
                                        onClick={() => setShowModalConfirmation(true)}
                                        style={{ height: '45px' }}
                                        block className='my-1 rounded fs-13 border bg-orange'>

                                        Anular y Recuperar</Button>
                                    <Button
                                        style={{ height: '45px' }}
                                        block className='fs-13 border bg-orange' >

                                        Re-imprimir</Button>
                                </CardBody>

                            </Card>

                        </Col>

                    </Row>

                    <Row>
                        <Col>

                            <Card className='shadow-sm'>
                                <CardHeader className='d-flex flex-column p-0 px-3 py-1 bg-orange'>

                                    <Label className='text-white fw-bold'>Nombre: <span className='text-white fw-light'>{inputClient || ''}</span> </Label>
                                    <Label className='text-white fw-bold text-capitalize'>Ruc/Cedula/Pasaporte: <span className='text-white fw-light'>{inputCI || ''}</span> </Label>

                                </CardHeader>
                                <CardBody className=''>

                                    <TableGeneric
                                        showFilter={false}
                                        showFooter={false}
                                        columns={columns || []}
                                        data={cartProducts || []}
                                        selectItemRow={setSelectItemRow}
                                        divClass='table-responsive text-black bg-table'
                                        tableClass='cursor-pointer w-100'
                                        theadClass='position-sticky top-0 bg-table '
                                        thClass='fs-11 fw-light border'
                                        tbodyClass='bg-light'
                                        styleHeight='130px'
                                        overflowY='scroll'
                                    />

                                </CardBody>
                                <CardFooter className='m-0 p-0 px-3 py-2 fs-13 bg-black text-white'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <span className='badge bg-white text-black fs-14'>Ordenes:{!isLoading && ordeneRango?.data || 0}</span>
                                        <span className=''>Total</span>
                                        <span className=''>{total || 0}</span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>

                    <BtnPosModal
                        btnClassAceptar={''}

                        onAceptarClick={onCloseClick}
                        onCloseClick={onCloseClick}
                    />
                </ModalBody>

            </Modal>
            <ToastContainer />
        </>
    )
}

export default ModalAnulacionCuenta