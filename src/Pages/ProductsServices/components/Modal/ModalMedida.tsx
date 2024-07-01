import { FC, useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, Row, Col, Label, Input } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { getMedidas } from '../../Api/ApiMedidas'
import Select from 'react-select'
import ColumnsMedida from '../../helpers/ColumnsMedida'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
interface Props {
    show: boolean
    onClickClose: any
}
const ModalMedida: FC<Props> = ({ show, onClickClose }) => {
    const [data, setData] = useState([])
    const [options, setOptions] = useState([] as any)
    const [medidaInicial, setMedidaInicial] = useState(false)
    const [status, setStatus] = useState(true)
    const [medida, setMedida] = useState('' as any)
    const [cantidad, setCantidad] = useState('' as any)
    const [sendData, setSendData] = useState({} as any)
    const [selectItemRow, setSelectItemRow] = useState({} as any)
    // const [valorMinimo, setValorMinimo] = useState('')
    // const [isEdit, setIsEdit] = useState(false)
    const getDataMedida = async () => {
        const result: any = await getMedidas()
        setData(result.data)
        setOptions(
            result.data.map((item: any) => {
                return {
                    value: item.id_medida,
                    label: item.nombre
                }
            })
        )

    }
    useEffect(() => {
        getDataMedida()
    }, [])
    useEffect(() => {
        setSendData({
            nombre: medida,
            cantidad: cantidad,
            //  valorMinimo: valorMinimo,
            status: 1
        })
    }, [medida, cantidad/* , valorMinimo */])

    const onClickSave = () => {
        console.log('save', sendData)
        console.log(selectItemRow)
    }
    /*  const onClickEdit = () => {
         console.log('edit')
     } */
    const columns = ColumnsMedida()
    return (
        <Modal isOpen={show} toggle={onClickClose} size='md'>
            <ModalHeader toggle={onClickClose}>Medidas</ModalHeader>
            <ModalBody className='fondo-sistema text-white fs-11'>
                <Row className='mb-3'>
                    <Col lg='3'>
                        <Label>Medida</Label>
                    </Col>
                    <Col lg='9'>
                        <Input
                            className='custom-input rounded-0'
                            value={medida}
                            onChange={(e) => setMedida(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='3'>
                    </Col>
                    <Col lg='9'>
                        <Input type='checkbox' className='me-1'
                            onClick={() => setMedidaInicial(!medidaInicial)}
                        />
                        <Label>Valor minimo</Label>
                    </Col>
                </Row>
                <Row className='mb-3' >
                    <Col lg='3'>
                        <Label>Medida Inicial</Label>
                    </Col>
                    <Col lg='9'>
                        <Select
                            isDisabled={medidaInicial}
                            className='text-black'
                            options={options}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '30px',
                                    minHeight: '30px',
                                    borderRadius: '0',
                                }),
                            }}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col lg='3'>
                        <Label>Cantidad</Label>
                    </Col>
                    <Col >
                        <Input
                            className='custom-input rounded-0'
                            type='text'
                            disabled={medidaInicial}
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col lg='3'>
                        <Label>Impresion</Label>
                    </Col>
                    <Col >
                        <Input
                            className='custom-input rounded-0'

                            type='text'
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col lg='3'>
                        <Label
                            className={status ? 'text-success' : 'text-danger'}
                        >
                            {status ? 'Activo' : 'Inactivo'}
                        </Label>
                    </Col>
                    <Col >
                        <Input type='checkbox'
                            checked={status}
                            onChange={() => setStatus(!status)}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col >
                        <TableGeneric
                            columns={columns || []}
                            data={data || []}
                            divClass='table-responsive text-black'
                            tableClass='w-100 fs-11  table-sm cursor-pointer'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-light border-bottom '
                            tbodyClass='bg-light'
                            customPageSize={10}
                            styleHeight='120px'
                            showFilter={false}
                            showFooter={false}
                            selectItemRow={setSelectItemRow}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <BtnPosModal
                        //    onAceptarClick={isEdit ? onClickEdit : onClickSave}
                        onAceptarClick={onClickSave}
                        onCloseClick={onClickClose}
                    //    text={isEdit ? 'Editar' : 'Guardar'}
                    />
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default ModalMedida