import { useEffect, useState } from 'react'
import ColumnCajas from '../../Helpers/ColumnCajas'
import { getCajasList } from '../../../../helpers/fakebackend_helper'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import ModalHistorialCaja from './ModalHistorialCaja'
const HistorialCaja = () => {
    const [dataCajas, setDataCajas] = useState([])
    const [selectItem, setSelectItem] = useState([])
    const [showModalHisCaja, setShowModalHisCaja] = useState(false)

    const resData = async () => {
        const res: any = await getCajasList()
        res.status && setDataCajas(res.data || [])
    }
    useEffect(() => {
        resData()
    }, [])
    const data1: any = []
    const columns = ColumnCajas({ data1, setShowModalHisCaja })
    return (
        <>
            {
                showModalHisCaja && <ModalHistorialCaja
                    show={showModalHisCaja}
                    onCloseClick={() => setShowModalHisCaja(false)}
                />
            }
            <TableGeneric
                showFilter={false}
                showFooter={false}
                columns={columns || []}
                data={dataCajas || []}
                selectItemRow={setSelectItem}
                divClass='table-responsive border-blue text-black w-100'
                tableClass='cursor-pointer w-100'
                theadClass='position-sticky top-0 bg-table '
                thClass='fs-11 fw-bold border text-center   px-2'
                tdClass={'fs-11 border text-center'}
                tbodyClass='bg-light'
                styleHeight='500px'
                overflowY='scroll'
            />
        </>
    )
}

export default HistorialCaja