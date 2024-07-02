import { FC, useMemo } from 'react'
import { Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import axios from 'axios'
import { useQuery } from 'react-query'
import Overlay from '../../../../common/Loading/Overlay'
interface IProps {
    show: boolean
    onCloseClick: () => void
    formaPago: string
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
            {
                Header: 'orden',
                accessor: 'orden',

            },
            {
                Header: 'Total',
                accessor: 'total',
                /*        Cell: ({ row }: any) => {
                           const totalFinal1 = Math.round((row.original.total) * 100) / 100;
                           return totalFinal1
                       } */

            },
            /*            {
                           Header: 'Pago',
                           accessor: 'pago',
           
                       }, */
        ], []
    );
    const getFormasPay = async () => {

        try {
            const res = await axios.get('api/buscar/Orden/forma/pago', {
                params: {
                    id_caja: idCajaLocal,
                    forma_pago: formaPago
                }
            });
            return res.data;
        } catch (error) {
            //throw new Error(error); // Lanzar el error para que React Query lo maneje
        }
    };

    const { data: formaData, isLoading, isError } = useQuery(["uniFormaPago"], getFormasPay);

    if (isLoading) return <Overlay />;
    if (isError) return <div>Error al cargar los datos</div>;

    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg' fade={false}>
            <ModalHeader toggle={onCloseClick}></ModalHeader>
            <ModalBody>
                <Card>
                    <CardBody>
                        {isLoading ? <Overlay />
                            : <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={formaData || []}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                thClass='fs-11 fw-light border'
                                tbodyClass='bg-gray'
                                styleHeight='300px'
                                overflowY='scroll'
                            />}
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}

export default ModalInfoFormas