import { FC, useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Row, Table } from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import TableGeneric from '../../../common/Generics/Table/TableGeneric'
import { addCartPos, setQuantityPos } from '../../../slices/PointSale/pointSaleSlice'

const BuscadorProductosCliente = () => {
    const dispatch = useDispatch()

    const inputRefCantidad = useRef<HTMLInputElement>(null)
    const inputRefSelect = useRef<any | null>(null)

    const products = useSelector((state: any) => state.productSlice.productSliceList)

    const [cantidad, setCantidad] = useState('')
    const [selectOp, setSelectOp] = useState<any>([])
    const [selectItemRow, setSelectItemRow] = useState<any>()
    //state boolean
    const [showTable, setShowTable] = useState<boolean>(false)


    const handleOnClick = (item: any) => {
        console.log(selectItemRow)
        dispatch(addCartPos(item));
        dispatch(setQuantityPos(1))
        setCantidad('')
        inputRefCantidad.current?.focus()

    }

    interface IMenu {
        label: any
        customAbbreviation: any
        precio: any
    }

    useEffect(() => {
        setSelectOp(products.map((item: any) => ({
            cantidad: parseFloat(item.cantidad),
            descuento: item.descuento,
            id_bodega: item.id_bodega,
            id_product: item.id_product,
            id_sub_rubro: item.id_sub_rubro,
            iva: item.iva,
            nombre: item.nombre,
            precio: item.precio,
            precio_final: item.precio_final,
            servicio: item.servicio,
            status: item.status,
            tipo_impuesto: item.tipo_impuesto,
            tota_servicio: item.tota_servicio,
            total: item.total,
            total_iva: item.total_iva,
            url_imagen: item.url_imagen,
            value: item.id_product,
            label: item.nombre,
            customAbbreviation: item.id_product,
            editable: item.editable,
            editable_precio: item.editable_precio,
            editable_nombre: item.editable_nombre,
            preferencias: item?.preferencias
        })))
    }, [products])

    const formatOptionLabel: FC<IMenu> = ({ label, customAbbreviation, precio }) => (
        <div style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: 'space-between' }} className='fs-11 text-black'>
            <div >${precio}</div>
            <div  >{label}</div>
            <div >
                {customAbbreviation}
            </div>
        </div>
    )

    const columnsCliente = [
        {
            Header: "Compr",
            assessor: 'Compr',
        },
        {
            Header: 'Cant',
            assessor: 'Cant',
        },
        {
            Header: 'Cod',
            assessor: 'Cod',
        },
        {
            Header: 'Producto',
            assessor: 'Producto',
        },
        {
            Header: 'Fecha',
            assessor: 'Fecha',
        },
        {
            Header: 'P. Vendido',
            assessor: 'Vendido',
        },
        {
            Header: 'Dsc1',
            assessor: 'Dsc1',
        },
        {
            Header: 'Dsc2',
            assessor: 'Dsc2',
        },
        {
            Header: 'Dsc3',
            assessor: 'Dsc3',
        },
        {
            Header: 'P Final',
            assessor: 'Final',
        },
    ]

    const handleKeyDown = (e: any) => {

        if (e.key === 'Enter') {
            dispatch(setQuantityPos(parseFloat(cantidad) || 1))
            inputRefSelect.current?.focus()

        }

    }
    useEffect(() => {
        dispatch(setQuantityPos(parseFloat(cantidad)))
    }, [cantidad])

    return (
        <>
            <div className=' px-3 py-1 my-1 rounded shadow' style={{ border: '1px solid rgb(0,0,0,0.3)', background: '#d6d9df' }}>
                <Row>
                    <Col lg='9'>
                        <Row>
                            <Col lg='2' className='text-center'>
                                <Input
                                    className='text-center'
                                    bsSize='sm'
                                    value={cantidad}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    innerRef={inputRefCantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                />
                                <Label>Cantidad</Label>
                            </Col>
                            <Col className='text-center'>
                                <Select
                                    ref={inputRefSelect}
                                    isClearable={true}
                                    placeholder={' '}
                                    onChange={(e) => handleOnClick(e)}
                                    formatOptionLabel={formatOptionLabel}
                                    options={selectOp}
                                    className=' '
                                    styles={
                                        {
                                            control: (base: any) => ({
                                                ...base,
                                                height: '30px',
                                                minHeight: '33px',
                                                fontSize: '11px',
                                                borderRadius: '0px',
                                                boxShadow: 'none',
                                                backgroundColor: '#fff'

                                            })
                                        }
                                    }

                                />
                                <Label>Producto/Servicio</Label>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col></Col>
                            <Col>
                                <Label className='text-danger fst-italic fw-bold'>Historial De Productos por Cliente</Label>
                            </Col>
                            <Col lg='2' className=''>
                                <Button
                                    block
                                    size='sm'
                                    color='light'
                                    className='border fs-11 shadow-sm'
                                    onClick={() => setShowTable(!showTable)}
                                >
                                    Ver
                                </Button>
                            </Col>
                        </Row>
                        {showTable && <Row>
                            <Col>
                                <TableGeneric
                                    showFilter={false}
                                    showFooter={false}
                                    columns={columnsCliente || []}
                                    data={[] || []}
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
                        </Row>}

                    </Col>

                    <Col lg='3'>
                        <Table className='table-sm table-info' bordered striped hover>
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={2} className='text-center'>Documentos</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>Consumo Personal</td>
                                    <td>00202</td>
                                </tr>
                                <tr >
                                    <td >Factura 001-002</td>
                                    <td>000461</td>
                                </tr>
                                <tr >
                                    <td >Factura 001-002</td>
                                    <td>000461</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default BuscadorProductosCliente