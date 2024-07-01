import React, { FC } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import Select from 'react-select'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { getProduct } from '../../Helpers/ApiProducts'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalCarta: FC<IProps> = ({ show, onCloseClick }) => {
    //columns usemeno codigo_fabrica,item,pvp,%iva,precio_total, 
    const [data, setData] = React.useState<any>()
    const [selectItemRow, setSelectItemRow] = React.useState<any>()
    console.log(selectItemRow || null)
    const columns = React.useMemo(
        () => [
            {
                Header: 'Codigo Fabrica',
                accessor: 'id_product',
            },
            {
                Header: 'Item',
                accessor: 'nombre',
            },
            {
                Header: 'PVP',
                accessor: 'precio',
            },
            {
                Header: '%IVA',
                accessor: 'iva',
            },
            {
                Header: 'Precio Total',
                accessor: 'total',
            }
        ],
        []
    )
    const getData = async () => { getProduct().then((res) => setData(res)) }
    React.useEffect(() => { getData() }, [])
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg'>
            <ModalHeader toggle={onCloseClick}>
                {'Lista Carta'}
            </ModalHeader>
            <ModalBody style={{ background: '#28445c' }} className='text-white'>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col lg='9'>
                                <Select
                                    placeholder='Seleccione Bodega'
                                    className='border'
                                />
                            </Col>

                            <Col lg='3'>
                                <Button
                                    color='primary'
                                    className='' block>Buscar</Button>
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardBody>

                        <Row className='mt-2'>
                            <Col>
                                <TableGeneric
                                    showFilter={true}
                                    showFooter={false}
                                    columns={columns || []}
                                    data={data || []}
                                    selectItemRow={setSelectItemRow}
                                    divClass='table-responsive text-black bg-table'
                                    tableClass='cursor-pointer w-100'
                                    theadClass='position-sticky top-0 bg-table '
                                    thClass='fs-11 fw-light border'
                                    tbodyClass='bg-light'
                                    styleHeight='130px'
                                    overflowY='scroll'
                                />
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <BtnPosModal
                            onAceptarClick={onCloseClick}
                            onCloseClick={onCloseClick}
                        />
                    </CardFooter>


                </Card>
            </ModalBody>

        </Modal>
    )
}

export default ModalCarta