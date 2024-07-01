import { Col, Row } from 'reactstrap'
import VerticalTable from '../../Pos/ComponentsNew/Table/VerticalTable'
import { useSelector } from 'react-redux'
import ModalDescPos from './Modal/ModalDescPos'
import { useState } from 'react'
import TableDetallesPos from './TableDetallesPos'

const DetallesUIItems = () => {
    const cart = useSelector((state: any) => state.pointSaleSlice.cart)
    const [showModalDesc, setShowModalDesc] = useState<boolean>(false)
    const [itemDescuento, setItemDescuento] = useState()
    const columns = [
        {
            Header: "Cant",
            assessor: "cantidad",
            maxWidth: 70,
            minWidth: 50,
            width: "1000px",
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center text-center'
                    onClick={() => console.log(row.original)}>
                    <span >{row.original.cantidad}</span>
                </div>
            ),
        },
        {
            Header: "Detalle",
            assessor: "detalle",
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    style={{
                        maxWidth: '300px', width: '100%',
                    }}
                    onClick={() => console.log(row.original)}>
                    <span >{row.original.nombre}</span>
                </div>
            ),
        },
        {
            Header: "P. Unitario",
            assessor: "precio_final",
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => console.log(row.original)}>
                    <span >{parseFloat(row.original.precio).toFixed(2)}</span>
                </div>
            ),
        },
        {
            Header: "Total",
            assessor: "total",
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => console.log(row.original)}>
                    <span >{(parseFloat(row.original.precio) * parseFloat(row.original.cantidad)).toFixed(2)}</span>
                </div>
            ),
        },

        {
            Header: "Iva",
            assessor: "iva",
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => console.log(row.original)}>
                    <span >{((parseFloat(row.original.precio) * parseFloat(row.original.cantidad)) - parseFloat(row.original.descuento || 0)) * 15 / 100}</span>
                </div>
            ),
        },
        {
            Header: "Total + Iva",
            assessor: "total_iva",
            width: '20',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => console.log(row.original)}>
                    <span >{
                        (
                            (parseFloat(row.original.precio) * parseFloat(row.original.cantidad) -
                                parseFloat(row.original.descuento || 0)) *
                            parseFloat(row.original.iva || 1.15)).toFixed(2)
                    }</span>
                </div>
            ),
        },
        {
            Header: "Desc",
            assessor: "descuento",
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center justify-content-center  w-100 '
                    onClick={() => handleDescPos(row.original)}>
                    <span className='text-end'>{Math.round((row.original.descuento * 100) / 100).toFixed(2)}</span>
                </div>
            ),
        },
        {
            Header: "Bodega",
            assessor: "bodega",
        }

    ]
    const handleDescPos = (item: any) => {
        setItemDescuento(item)
        setShowModalDesc(true)
    }
    return (
        <>
            {/* Modal descuento pos */}
            {showModalDesc &&
                <ModalDescPos
                    item={itemDescuento}
                    show={true}
                    onCloseClick={() => setShowModalDesc(false)}
                />
            }

            <div className=' px-3 py-1 my-1 rounded shadow' style={{ border: '1px solid rgb(0,0,0,0.3)', background: '#d6d9df' }}>
                <Row >
                    <Col lg='9'>
                        <VerticalTable
                            columns={columns || []}
                            data={cart || []}
                            divClass="table-responsive  rounded"
                            tableClass=" mb-0 table-sm  align-middle  cursor-pointer"
                            theadClass="position-sticky top-0 bg-light text-dark "
                            thClass="fs-13  fw-lighter"
                            tdclass="p-0 m-0 text-capitalize fs-12 text-center color-td-table-old "
                            styleHeight={'230px'}
                        />
                    </Col>
                    <Col lg='3'>
                        <TableDetallesPos />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DetallesUIItems