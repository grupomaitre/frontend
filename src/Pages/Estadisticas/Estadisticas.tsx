import { useCallback, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from 'reactstrap'
import ItemsReport from './Components/ItemsReport';
import FilterDate from './Components/FilterDate';
import BtnFunciones from './Components/BtnFunciones';
import { reporte } from './helpers/extras';
import CompVentas from './Components/CompVentas';
import { getReportes } from './helpers/reportes';
import Header from '../../Layouts/Header';
import TableGeneric from '../../common/Generics/Table/TableGeneric';
import { utils, writeFile } from 'xlsx';

import FilterFormaPago from './Components/FilterFormaPago';
import GraphicPai from '../../common/Generics/Graphics/GraphicPai';
import ComponenteEjemplo from './Components/VentasFilter/ComponenteEjemplo';
import UseCheckboxList from './Hooks/UseCheckboxList';
export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
const Estadisticas = () => {
    const [valueSelect, setValueSelect] = useState<number>(0)
    const [ventas, setVentas] = useState<any>([])
    const [selectItemRow, setSelectItemRow] = useState<any>(null)
    const [onColumns, setOnColumns] = useState<any>([
        {
            Header: 'Nombre t',
            accessor: 'name',
        },
        {
            Header: 'Cantidad t',
            accessor: 'cantidad',
        },
        {
            Header: 'Total t',
            accessor: 'total t',
        },
        {
            Header: 'Porcentaje t',
            accessor: 'porcentaje',

        },
    ])
    const fechaInicio = new Date();
    const fechaHasta = new Date();

    const [url, setUrl] = useState<any>('')
    const [onData, setOnData] = useState<any>([])
    const [dateStart, setDateStart] = useState<any>(fechaInicio.toISOString().split('T')[0])
    const [dateEnd, setDateEnd] = useState<any>(fechaHasta.toISOString().split('T')[0])

    const ChangeItemReport = (data: any) => {
        setVentas(data.subItems)
    }
    const handleReporte = async () => {
        if (!url) return
        const res: any = await getReportes(url, dateStart, dateEnd)
        console.log(res)
        if (res?.status === 'success') {
            setOnData(res.data || [])
        }

    }
    const handleClear = () => {
        setOnData([])

    }



    const handleChange = (op: any) => {

        console.log(op)


    }


    const handleExcel = useCallback(() => {

        const ws = utils.json_to_sheet(onData);

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        var wscols = [
            { wch: 6 },
            { wch: 7 },
            { wch: 10 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 200 },
        ];
        ws['!cols'] = wscols;

        writeFile(wb, "reporte.xlsx");
    }, [onData]);

    const labels = onData.map((obj: any) => obj.documento)
    const count = onData.map((obj: any) => obj.count)
    console.log(selectItemRow)
    return (
        <Container fluid >
            <div className="bg-gray">
                <Header link='/dashboard' />

                <Card>

                    <CardHeader className=''>
                        <Row className='gap-1'>
                            <Col lg='5' className='border p-2 shadow-sm rounded px-3 bg-white'>
                                <ItemsReport reporte={reporte} ChangeItemReport={ChangeItemReport} />
                                <CompVentas ventas={ventas} setOnColumns={setOnColumns} setUrl={setUrl} setValueSelect={setValueSelect} />
                                <FilterDate
                                    dateStart={dateStart}
                                    dateEnd={dateEnd}
                                    setDateStart={setDateStart}
                                    setDateEnd={setDateEnd} />
                                <FilterFormaPago handleChange={handleChange} />
                            </Col>
                            <Col lg=''>
                                <Row className=''>
                                    {valueSelect ?

                                        <ComponenteEjemplo valueSelect={valueSelect} />
                                        : null}


                                    <Col lg='' className='p-1 px-3 shadow-sm border rounded  bg-white'>
                                        <UseCheckboxList
                                            classDiv='fs-12'
                                            listCheck={[

                                                { value: 1, label: 'Prop Quitados' },
                                                { value: 2, label: 'Tarjetas' },
                                                { value: 3, label: 'Cuentas Borradas' },
                                                { value: 4, label: 'Descuentos' },
                                                { value: 5, label: 'Cortesias' },
                                                { value: 6, label: 'Camareros por Producto' },

                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>


                        <Row className=''>
                            <Col lg='9  '>
                                <TableGeneric
                                    showFilter={false}
                                    showFooter={false}
                                    columns={onColumns || []}
                                    data={onData || []}
                                    selectItemRow={setSelectItemRow}
                                    divClass='table-responsive text-black bg-white'
                                    tableClass='cursor-pointer w-100'
                                    theadClass='position-sticky top-0 bg-table'
                                    thClass='fs-13 fw-bold border'
                                    tdClass='fs-11 border text-capitalize'
                                    tbodyClass='bg-gray'
                                    styleHeight='150px'
                                    overflowY='scroll'
                                />
                            </Col>
                            <BtnFunciones
                                handleReporte={handleReporte}
                                handleExcel={handleExcel}
                                handleClear={handleClear}
                            />
                        </Row>

                        <CardFooter>

                        </CardFooter>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Row>
                            <Col >
                                <GraphicPai
                                    labels={labels}
                                    count={count}
                                    data={onData}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div >
        </Container>
    )
}

export default Estadisticas