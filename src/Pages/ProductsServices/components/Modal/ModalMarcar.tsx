import { FC, useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, Row, Col, Label, Input } from 'reactstrap'
import ColumnsMarca from '../../helpers/ColumnsMarca'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { addMarca, deleteMarcaById, editMarca, getMarcas } from '../../Api/ApiProducts'
import ConfirmationModal from '../../../../Components/Common/Modals/ConfirmationModal'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
interface Props {
    show: boolean
    onClickClose: any
}
const ModalMarcar: FC<Props> = ({ show, onClickClose }) => {
    const [data, setData] = useState([])
    const [dataEdit, setDataEdit] = useState({} as any)
    const [marca, setMarca] = useState('')
    const [codigo, setCodigo] = useState('')
    const [status, setStatus] = useState(true)
    const [sendData, setSendData] = useState({} as any)
    const [isEdit, setIsEdit] = useState(false)
    // const [error, setError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectItemRow, setSelectItemRow] = useState(false)
    useEffect(() => {
        getMarcas().then((res: any) => {
            setData(res.data)
        })

    }, [])

    useEffect(() => {
        setSendData({
            nombre: marca,
            codigo: codigo,
            status: 1
        })
    }, [marca, codigo])

    const saveMarca = async () => {
        console.log(selectItemRow)
        const res = await addMarca(sendData)
        if (res) {
            const resMarca = await getMarcas()
            setData(resMarca?.data || [])
        }
        setMarca('')
        setCodigo('')
    }

    const handleEdit = (data: any) => {
        setMarca(data.nombre)
        setCodigo(data.codigo)
        setDataEdit(data)
        setIsEdit(true)
    }
    const handleEditMarca = async () => {
        const res = await editMarca(dataEdit, sendData)
        if (res) {
            const resMarca = await getMarcas()
            resMarca && setData(resMarca?.data || [])

        }
        setMarca('')
        setCodigo('')
        setIsEdit(false)
    }
    const handleDelete = (data: any) => {
        setDataEdit(data)
        setShowModal(true)
    }
    const deleteMarca = async () => {
        const res = await deleteMarcaById(dataEdit)
        if (res) {
            const resMarcas = await getMarcas()
            setData(resMarcas?.data)

        }

        setShowModal(false)
    }
    const columns = ColumnsMarca({ handleEdit, handleDelete })
    return (
        <>
            <ConfirmationModal
                onCloseClick={() => setShowModal(false)}
                show={showModal}
                onConfirmClick={deleteMarca}
                title='Desea Eliminar Marca?'
            />

            <Modal isOpen={show} toggle={onClickClose} size='md'>
                <ModalHeader toggle={onClickClose}>Marcas</ModalHeader>
                <ModalBody className='fondo-sistema text-white fs-11    '>
                    <Row className='mb-3'>
                        <Col lg='3'>
                            <Label>Marca</Label>
                        </Col>
                        <Col lg='9'>
                            <Input
                                className='custom-input rounded-0'
                                type='text'
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col lg='3'>
                            <Label>Código</Label>
                        </Col>
                        <Col lg='9'>
                            <Input
                                className='custom-input rounded-0'

                                type='text'
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
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
                    <Row>
                        <Col className='my-1'>
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
                    <Row>
                        <BtnPosModal
                            btnDisabled={marca === '' || codigo === ''}
                            text={isEdit ? 'Editar' : 'Guardar'}
                            onAceptarClick={isEdit ? handleEditMarca : saveMarca}
                            onCloseClick={onClickClose}
                        />
                    </Row>
                </ModalBody>
            </Modal >

        </>
    )
}

export default ModalMarcar