import React, { FC, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Modal, ModalBody, Row } from 'reactstrap'
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
import CardHeaderModal from '../../../../common/CardHeaderModal'
interface DocCobrarProps {
    show: boolean
    onCloseClick: () => void
}

const ModalDocCobrar: FC<DocCobrarProps> = ({ show, onCloseClick }) => {
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')

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

    const [totalServicio, setTotalServicio] = useState(0)
    const [totalIva, setTotalIva] = useState(0)
    const [totalVentas, setTotalVentas] = useState(0)
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
                accessor: 'servicio',
            },
            {
                Header: 'Total',
                accessor: 'total',
            },
            {
                Header: 'Saldo',
                accessor: 'saldo',
            },

            {
                Header: 'Efectivo',
                accessor: 'efectivo',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original.efectivo)}>
                            {/* status color */}
                            <span
                            >{row.original.efectivo.monto}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Cheque',
                accessor: 'cheque',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original)}>
                            <span
                            >{row.original.cheque?.id_factura_cheque > 0 ? 'SI' : null}</span>
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
                            >{row.original.deposito?.id_factura_deposito > 0 ? 'SI' : null}</span>
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
                            >{row.original.tarjeta.length > 0 ? 'SI' : null}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Propina Tarjeta',
                accessor: 'propina',
                Cell: ({ row }: any) => {
                    const filter = row.original.tarjeta.reduce((acc: number, el: any) => acc + parseFloat(el.propinas || 0), 0)

                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(filter?.monto.toFixed(2) || null)}>
                            <span
                            >{filter || null}</span>
                        </div>

                    )
                }

            },

            {
                Header: 'Referencia',
                accessor: 'referencia',
            },
            {
                Header: 'Visa',
                Cell: ({ row }: any) => {
                    const filter = row.original.tarjeta.find((item: any) => item.nombre === 'visa')
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(filter?.monto || null)}>
                            <span
                            >{filter?.monto || null}</span>
                        </div>

                    )
                }
            },
            {
                Header: 'mastercard',
                Cell: ({ row }: any) => {
                    const filter = row.original.tarjeta.find((item: any) => item.nombre === 'mastercard')
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(filter?.monto || null)}>
                            <span
                            >{filter?.monto || null}</span>
                        </div>

                    )
                }
            },
            {
                Header: 'diners',
                Cell: ({ row }: any) => {
                    const filter = row.original.tarjeta.find((item: any) => item.nombre === 'diners')
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(filter?.monto || null)}>
                            <span
                            >{filter?.monto || null}</span>
                        </div>

                    )
                }
            },

            {
                Header: 'american',
                Cell: ({ row }: any) => {
                    const filter = row.original.tarjeta.find((item: any) => item.nombre === 'american')
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(filter?.monto || null)}>
                            <span
                            >{filter?.monto || null}</span>
                        </div>

                    )
                }
            },
            {
                Header: 'discover',
                Cell: ({ row }: any) => {
                    const filter = row.original.tarjeta.find((item: any) => item.nombre === 'discover')
                    return (
                        <div className='d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => console.log(filter?.monto || null)}>
                            <span
                            >{filter?.monto || null}</span>
                        </div>

                    )
                }
            },

        ],
        []
    )
    const getData = async () => {
        try {
            const res = await axios.get('/api/v1/reporte-ventas-caja', {
                params: { id_caja_diaria: idCajaLocal }
            })

            setData(res.data || [])
            const totalServicio = data.reduce((acc: number, el: any) => acc + parseFloat(el.servicio || 0), 0)
            const totalIva = data.reduce((acc: number, el: any) => acc + parseFloat(el.iva || 0), 0)
            const totalVentas = data.reduce((acc: number, el: any) => acc + parseFloat(el.total || 0), 0)
            setTotalServicio(totalServicio)
            setTotalIva(totalIva)
            setTotalVentas(totalVentas)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => { getData() }, [])
    //TOTALES


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
            <Modal isOpen={show} backdrop={'static'} size='xl' style={{ maxWidth: '90%' }}  >
                <CardHeaderModal
                    onCloseClick={onCloseClick}
                    text={'Caja N° ' + idCajaLocal || ''}
                    classHeader='py-2 px-2'
                />
                <ModalBody style={{ background: 'rgb(251, 133, 0,20%)' }} className='text-white fs-11'>

                    <Card>
                        <CardHeader className='p-1 m-0 text-center bg-black text-white fw-bold fs-13'>
                            Ventas Generadas en la caja No. Caja:{idCajaLocal || null}
                        </CardHeader>
                        <CardHeader className='p-0'>

                            <HeaderTools
                                itemTools={itemTools}
                            />

                        </CardHeader>
                        <CardBody className='bg-white'>
                            <TableGeneric
                                styleHeight='270px'
                                showFilter={true}
                                data={data || []}
                                overflowY='scroll'
                                showFooter={false}
                                tbodyClass='bg-table'
                                columns={columns || []}
                                tableClass='cursor-pointer w-100 '
                                selectItemRow={setSelectItemRow}
                                divClass='table-responsive text-black bg-table'
                                thClass='fs-12 text-start border text-capitalize'
                                tdClass={'border text-center text-capitalize p-1'}
                                theadClass='position-sticky top-0 fw-bold page-bg text-white'
                            />
                        </CardBody>

                        <CardFooter>
                            <Row>
                                <Col lg='6'>

                                </Col>
                                <Col lg='6' className=' fs-15' style={{ background: 'rgba(0,0,0,0.8)', color: '#0bef01' }}>
                                    <Row>
                                        <Col>BI 15</Col>
                                        <Col className='text-white'>{totalIva.toFixed(2)}</Col>
                                        <Col>Servicio</Col>
                                        <Col className='text-white'>{totalServicio.toFixed(2)}</Col>
                                    </Row>
                                    <Row>
                                        <Col>BI 0</Col>
                                        <Col className='text-white'>0.00</Col>
                                        <Col>Transporte</Col>
                                        <Col className='text-white'>0.00</Col>
                                    </Row>
                                    <Row>

                                        <Col>IVA</Col>
                                        <Col className='text-white'>{totalIva.toFixed(2)}</Col>
                                        <Col>Total</Col>
                                        <Col className='text-white'>{totalVentas.toFixed(2)}</Col>
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
            </Modal >
            <ToastContainer />
        </>
    )
}

export default ModalDocCobrar