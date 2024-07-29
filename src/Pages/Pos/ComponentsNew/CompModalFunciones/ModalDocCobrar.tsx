import React, { FC, useState } from 'react'
import { Card, CardBody, CardFooter, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import axios from 'axios'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import HeaderTools from '../../../../common/Ui/HeaderTools'
import { ToastContainer } from 'react-toastify'
import EfectivoCheque from './ModalVentas/EfectivoCheque'
import EfectivoTarjeta from './ModalVentas/EfectivoTarjeta'
import ChequeEfectivo from './ModalVentas/ChequeEfectivo'
import TarjetaEfectivo from './ModalVentas/TarjetaEfectivo'
import TarjetaCheque from './ModalVentas/TarjetaCheque'
import ChequeTarjeta from './ModalVentas/ChequeTarjeta'
import ModalAbono from './ModalVentas/ModalAbono'
import { toastError } from '../../../../Components/Common/Swals/SwalsApi'
import ModalCliente from './ModalVentas/ModalCliente'
import ModalCobrar from '../Modals/Billing/Components/Modals/ModalCobrar'
interface DocCobrarProps {
    show: boolean
    onCloseClick: () => void
}

const ModalDocCobrar: FC<DocCobrarProps> = ({ show, onCloseClick }) => {
    const [data, setData] = React.useState<any>()
    const [selectItemRow, setSelectItemRow] = React.useState<any>()
    //modals
    const [efectivoCheque, setEfectivoCheque] = useState(false)
    const [efectivoTarjeta, setEfectivoTarjeta] = useState(false)
    const [chequEfectivo, setChequEfectivo] = useState(false)
    const [chequeTarjeta, setChequeTarjeta] = useState(false)
    const [tarjetaEfectivo, setTarjetaEfectivo] = useState(false)
    const [tarjetaCheque, setTarjetaCheque] = useState(false)
    const [showModalCobra, setShowModalCobra] = useState(false)
    const [showModalAbono, setShowModalAbono] = useState(false)
    const [showModalCliente, setShowModalCliente] = useState(false)
    const columns = React.useMemo(
        () => [

            {
                Header: 'Cliente',
                accessor: 'cliente',
            },
            {
                Header: 'Cuenta',
                accessor: 'cuenta',
            },
            {
                Header: 'Orden',
                accessor: 'orden'
            },
            {
                Header: 'Documento',
                accessor: 'documento',
            },
            {
                Header: 'Factura',
                accessor: 'factura',
            },
            {
                Header: 'Serv 10%',
                accessor: 'serv',
            },
            {
                Header: 'Total',
                accessor: 'total',
            },
            {
                Header: 'Saldo',
                accessor: 'saldo',
            },
         /*    {
                Header: 'forma_pago',
                accessor: 'forma_pago',
            }, */

            {
                Header: 'Efectivo',
                accessor: 'efectivo',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original)}>
                            {/* status color */}
                            <span
                                className={row.original.forma_pago === 'Efectivo' ? 'badge bg-success' : 'badge bg-danger '}
                            >{row.original.forma_pago === 'Efectivo' ? 'SI' : null}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Deposito',
                accessor: 'Deposito',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original)}>
                            {/* status color */}
                            <span
                                className={row.original.forma_pago === 'Efectivo' ? 'badge bg-success' : 'badge bg-danger '}
                            >{row.original.forma_pago === 'Efectivo' ? 'SI' : null}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Tarjeta',
                accessor: 'tarjeta',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original)}>
                            {/* status color */}
                            <span
                                className={row.original.forma_pago === 'Tarjeta' ? 'badge bg-success' : 'badge bg-danger '}
                            >{row.original.forma_pago === 'Tarjeta' ? 'SI' : null}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Propina Tarjeta',
                accessor: 'propina',
            },
            {
                Header: 'Cheque',
                accessor: 'cheque',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original)}>
                            {/* status color */}
                            <span
                                className={row.original.forma_pago === 'Cheque' ? 'badge bg-success' : 'badge bg-danger '}
                            >{row.original.forma_pago === 'Cheque' ? 'SI' : null}</span>
                        </div>
                    )
                }
            },


            {
                Header: 'Referencia',
                accessor: 'referencia',
            },


        ],
        []
    )
    const getData = async () => {
        try {
            const res = await axios.get('/api/v1/reporte-ventas-caja')
            setData(res.data || [])
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getData()
    }, [])

    const itemTools = [
        {
            title: 'Edición', subItems: [

                { text: 'Ingresar Pago', onClick: () => selectItemRow ? setShowModalCobra(true) : toastError({ message: 'Selecione Comprobante' }) },
                { text: 'Exportar a Excel', onClick: () => console.log('Limpiar') },
                { text: 'Ver Abonos', onClick: () => selectItemRow ? setShowModalAbono(true) : toastError({ message: 'Selecione Comprobante' }) },
                { text: 'Reenviar Correo', onClick: () => console.log('Limpiar') },
                { text: 'Re Imprimir', onClick: () => console.log('Limpiar') },
                { text: 'Cambiar de Cliente', onClick: () => selectItemRow ? setShowModalCliente(true) : toastError({ message: 'Selecione Comprobante' }) },
            ]
        },
        {
            title: 'Cambiar / Editar Pago', subItems: [
                //funcion con tres parametros
                { text: 'De Efectivo a Cheque', onClick: () => handleChangeFormPay('EfectivoCheque') },
                { text: 'De Efectivo a Tarjeta', onClick: () => handleChangeFormPay('EfectivoTarjeta') },
                { text: 'De Cheque a Efectivo', onClick: () => handleChangeFormPay('ChequeEfectivo') },
                { text: 'De Cheque a Tarjeta', onClick: () => handleChangeFormPay('ChequeTarjeta') },
                { text: 'De Tarjeta a Efectivo', onClick: () => handleChangeFormPay('TarjetaEfectivo') },
                { text: 'De Tarjeta a Cheque', onClick: () => handleChangeFormPay('TarjetaCheque') },
                { text: 'Editar Tarjeta', onClick: () => handleChangeFormPay('EditarTarjeta') },
                { text: 'Editar Cheque', onClick: () => handleChangeFormPay('EditarCheque') },
            ]
        },

    ];

    const handleChangeFormPay = (value: string) => {
        switch (value) {
            case 'EfectivoCheque':
                setEfectivoCheque(true)
                break;
            case 'EfectivoTarjeta':
                setEfectivoTarjeta(true)
                break;
            case 'ChequeEfectivo':
                setChequEfectivo(true)
                break;
            case 'ChequeTarjeta':
                setChequeTarjeta(true)
                break;
            case 'TarjetaEfectivo':
                setTarjetaEfectivo(true)
                break;
            case 'TarjetaCheque':
                setTarjetaCheque(true)
                break;
            case 'EditarTarjeta':
                console.log('EditarTarjeta');
                break;
            case 'EditarCheque':
                console.log('EditarCheque');
                break;

            default:
                console.log('Método de pago no reconocido');
        }

    }

    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')


    return (
        <>

            {showModalCobra &&
                <ModalCobrar
                    show={showModalCobra}
                    onCloseClick={() => setShowModalCobra(false)}
                    closeModalBilling={() => setShowModalCobra(false)}
                />}
            {showModalCliente &&
                <ModalCliente
                    show={showModalCliente}
                    onCloseClick={() => setShowModalCliente(false)}
                 /*    cliente={selectItemRow ? selectItemRow : {}}
                    getData={getData} */
                />
            }
            {
                showModalAbono &&
                <ModalAbono
                    onCloseClick={() => setShowModalAbono(false)}
                    show={showModalAbono}
                    item={selectItemRow}
                />

            }
            {efectivoCheque &&
                <EfectivoCheque
                    show={efectivoCheque}
                    onCloseClick={() => setEfectivoCheque(false)}
                    item={selectItemRow || {}}
                    getData={getData}
                />}
            {efectivoTarjeta &&
                <EfectivoTarjeta
                    show={efectivoTarjeta}
                    onCloseClick={() => setEfectivoTarjeta(false)}
                    item={selectItemRow || {}}
                    getData={getData}

                />
            }
            {chequEfectivo &&
                <ChequeEfectivo
                    show={chequEfectivo}
                    onCloseClick={() => setChequEfectivo(false)}
                    item={selectItemRow || {}}
                    getData={getData}

                />
            }
            {
                chequeTarjeta &&
                <ChequeTarjeta
                    show={chequeTarjeta}
                    onCloseClick={() => setChequeTarjeta(false)}
                    item={selectItemRow || {}}
                    getData={getData}

                />
            }
            {
                tarjetaEfectivo &&
                <TarjetaEfectivo
                    show={tarjetaEfectivo}
                    onCloseClick={() => setTarjetaEfectivo(false)}
                    item={selectItemRow || {}}
                    getData={getData}

                />
            }
            {
                tarjetaCheque &&
                <TarjetaCheque
                    show={tarjetaCheque}
                    onCloseClick={() => setTarjetaCheque(false)}
                    item={selectItemRow || {}}
                    getData={getData}
                />
            }
            <Modal isOpen={show} backdrop={'static'} size='xl' >
                <ModalHeader toggle={onCloseClick} className='' >
                    <Label className='fs-11 fw-bold'>{'Caja N° ' + idCajaLocal || ''}</Label>
                </ModalHeader>
                <ModalBody style={{ background: 'rgb(251, 133, 0,20%)' }} className='text-white fs-11'>

                    <div className='card mb-2'>

                        <HeaderTools
                            itemTools={itemTools}
                        />

                    </div>

                    <Card className='mb-2'>
                        <CardBody className='p-1 m-0 text-center bg-black text-white fw-bold fs-13'>
                            <Label className='p-0 text-uppercase '>Ventas Generadas en la caja No. Caja:{idCajaLocal || null}</Label>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <TableGeneric
                                showFilter={true}
                                showFooter={false}
                                columns={columns || []}
                                data={data || []}
                                selectItemRow={setSelectItemRow}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100 '
                                theadClass='position-sticky top-0 fw-bold page-bg text-white fs-15 '
                                thClass='fs-11 fw-light border'
                                tbodyClass='bg-table'
                                styleHeight='230px'
                                overflowY='scroll'
                            />
                        </CardBody>

                        <CardFooter>
                            <Row>
                                <Col lg='6'>

                                </Col>
                                <Col lg='6' className=' fs-15' style={{ background: 'rgba(0,0,0,0.8)', color: '#0bef01' }}>
                                    <Row>
                                        <Col>BI 12</Col>
                                        <Col className='text-white'>1000</Col>
                                        <Col>Servicio</Col>
                                        <Col className='text-white'>10</Col>
                                    </Row>
                                    <Row>
                                        <Col>BI 0</Col>
                                        <Col className='text-white'>37.75</Col>
                                        <Col>Transporte</Col>
                                        <Col className='text-white'>0.00</Col>
                                    </Row>
                                    <Row>

                                        <Col>IVA</Col>
                                        <Col className='text-white'>3.82</Col>
                                        <Col>Total</Col>
                                        <Col className='text-white'>69.96</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardFooter>


                    </Card>


                </ModalBody>
                <BtnPosModal
                    onAceptarClick={onCloseClick}
                    onCloseClick={onCloseClick}
                />
            </Modal>
            <ToastContainer />
        </>
    )
}

export default ModalDocCobrar