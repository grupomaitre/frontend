import { FC, useMemo } from 'react'
import { Card, Modal, ModalBody } from 'reactstrap'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import axios from 'axios'
import { useQuery } from 'react-query'
import Overlay from '../../../../common/Loading/Overlay'
import CardHeaderModal from '../../../../common/CardHeaderModal'
import { useFormaPago } from '../../Api/ApiFormaPagoCaja'
interface IProps {
    show: boolean
    onCloseClick: () => void
    formaPago: any
}
const ModalInfoFormas: FC<IProps> = ({
    show, onCloseClick, formaPago
}) => {
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0');

    const columns = useMemo(
        () => [
            {
                Header: 'Documento',
                accessor: 'documento',

            },
            {
                Header: 'Secuencial',
                accessor: 'secuencial',

            },
            /*        {
                       Header: 'orden',
                       accessor: 'orden',
       
                   }, */
            {
                Header: 'Total',
                accessor: 'total',

            },

        ], []
    );


    const query = useFormaPago(formaPago?.nombre, idCajaLocal)
    // console.log(formaPago?.nombre)
    console.log(query.data)
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg' fade={false}>
            <CardHeaderModal
                onCloseClick={onCloseClick}
                text='Información'
                classHeader='p-2'
            />
            <ModalBody>

                <Card body>
                    {!query.isFetched ? <Overlay />
                        : <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            data={query.data.data || []}
                            divClass='table-responsive text-black bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table'
                            thClass='fs-12 fw-bold border page-bg text-white'
                            tdClass='border fs-11 p-1'
                            tbodyClass='bg-gray'
                            styleHeight='300px'
                            overflowY='scroll'
                        />}

                </Card>
            </ModalBody>
        </Modal>
    )
}

export default ModalInfoFormas