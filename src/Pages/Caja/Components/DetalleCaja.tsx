import { FC, useEffect, useRef, useState, KeyboardEvent } from 'react'
import { Button, Col, Container, Input, Label, Row } from 'reactstrap'
import { getCuentasCount, getReportCajaAll } from '../Helpers/ApiCaja'
import TableComprobantes from './Tables/TableComprobantes'
import TableEgreso from './Tables/TableEgreso'
import TableIngresos from './Tables/TableIngresos'
import TableCierraCaja from './Tables/TableCierraCaja'
import { SwalInfo } from '../../../Components/Common/Swals/SwalsApi'
import {
    getCajasList as onGetCajasList,

} from "../../../slices/thunks"
import { deleteCajas } from '../../../helpers/fakebackend_helper'
import WidgetsHistorial from './Widgets/WidgetsHistorial'
import axios from 'axios'
interface IProps {
    setOntabs: any
}
const DetalleCaja: FC<IProps> = ({ setOntabs }) => {
    const dataCaja = JSON.parse(sessionStorage.getItem('dataCaja') || '')
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0');

    const [totalCaja, setTotalCaja] = useState<any>(0)
    const [documentos, setDocumentos] = useState([])
    const [ingresos, setIngresos] = useState([])
    const [egresos, setEgresos] = useState([])
    const getReportAllCaja = async () => {
        try {
            const res: any = await getReportCajaAll(idCajaLocal)

            if (res?.status) {
                setDocumentos(res?.documentos || [])
                setIngresos(res?.ingresos || [])
                setEgresos(res?.egresos || [])
            }
        } catch (error) {
            return error
        }
    }


    useEffect(() => {
        getReportAllCaja()
    }, [])


    const inputRefs = useRef<HTMLInputElement[] | any | null>([]);


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            console.log('entro')
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    const deleteCaja = async () => {
        const resCount = await getCuentasCount()
        SwalInfo({ title: `Extisten ${resCount} cuentas aperturadas` }).then((res) => {

            if (res.isConfirmed) {
                if (idCajaLocal) {
                    deleteCajas(idCajaLocal)
                        .then((data) => {
                            console.log(data)
                            onGetCajasList()
                            setOntabs('1')
                            localStorage.removeItem("idCaja");
                            axios.get('/api/impresion/cierrre/caja')

                            //setIsModalDelete(false);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                }
            }

        })


    }
    useEffect(() => {
        const totalcaja = documentos.reduce((accumulator: any, item: any) => {
            return accumulator + parseFloat(item.total);
        }, 0);
        setTotalCaja(totalcaja)
    }, [])
    return (
        <Container fluid>
            <div className=' d-flex justify-content-center gap-4'>
                <div className='border border-ligth  card w-50 p-2 px-3 border-blue shadow'>

                    <Row className='mb-2 fs-11 bg-light'>
                        <WidgetsHistorial cajaDiaria={idCajaLocal || 0} saldoInicial={dataCaja.saldo_inicial || 0} />
                    </Row>
                    <Row>
                        <Container>
                            <TableComprobantes
                                totalCaja={totalCaja}
                                documentos={documentos}
                            />

                            <TableIngresos
                                totalCaja={totalCaja}
                                data={ingresos || []}
                            />
                            <TableEgreso
                                totalCaja={totalCaja}
                                caja={egresos || []}
                            />
                        </Container>
                    </Row>
                </div>
                <div className='border border-ligth card w-50 p-2 shadow border-blue '>
                    <div className='d-flex align-items-center '>
                        <div className='p-1 d-flex flex-column' style={{ width: '35%' }}>
                            <Button size='sm' className='fs-11 mb-1' outline >Enviar a Correo</Button>
                            <Button size='sm' className='fs-11 ' outline >Pre Cierre</Button>
                        </div>
                        <div className='' style={{ width: '40%' }}>

                            <Button
                                outline
                                className='fs-11  '
                                block
                                style={{ height: '57px' }}
                                disabled={idCajaLocal > 0 ? false : true}
                                onClick={() => deleteCaja()} >
                                Cerrar Caja
                            </Button>
                        </div>
                    </div>
                    <Row>
                        <Col lg='12' className=''>
                            <TableCierraCaja
                                handleKeyDown={handleKeyDown}
                                totalCaja={totalCaja}
                                saldoInicial={dataCaja?.saldo_inicial || 0}
                            />
                        </Col>

                    </Row>
                    <Row className='mt-2'>
                        <Col className='text-center'>
                            <Label className=''>Observación</Label>
                            <Input className='border-sistema' />
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    )
}
export default DetalleCaja