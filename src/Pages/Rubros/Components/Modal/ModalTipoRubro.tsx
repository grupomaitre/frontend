import { FC, useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { getTipoRubro } from '../../../../helpers/fakebackend_helper'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { useDispatch } from 'react-redux'
import { setIDTipoRubro } from '../../../../slices/rubros/reducer'
import { toastError } from '../../../../Components/Common/Swals/SwalsApi'
import { ToastContainer } from 'react-toastify'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
    handleOpenItems: () => void
}
const ModalTipoRubro: FC<IProps> = ({ show, onCloseClick, handleOpenItems }) => {
    const dispatch = useDispatch()
    const [typeRubro, setTypeRubro] = useState([])
    const [selectItemRow, setselectItemRow] = useState<any>()
    const fecthTypeRubro = async () => {
        try {
            const res: any = await getTipoRubro({ status: 1 })
            if (res) {
                setTypeRubro(res.data || [])
            }
        } catch (error) {
            return error
        }
    }

    useEffect(() => {

        fecthTypeRubro()

    }, [])

    const columns = [
        {
            Header: '-',
            accessor: 'tipo_rubro',
        },
    ]

    const handleAceptar = async () => {
        const id = selectItemRow?.id_tipo_rubro
        if (id === undefined) {
            toastError({ message: 'Selecione Tipo de Rubro' })
        } else {
            localStorage.setItem("IdTipoRubro", JSON.stringify(id));
            handleOpenItems()
        }
    }
    useEffect(() => {
        dispatch(setIDTipoRubro(selectItemRow?.id_tipo_rubro || 0))
    }, [selectItemRow])

    return (
        <>
            <Modal isOpen={show} toggle={onCloseClick} size='md' centered fade={false}>
                <ModalHeader toggle={onCloseClick}></ModalHeader>
                <ModalBody style={{ background: "#f3f6f9" }} className='rounded'>
                    <Card>
                        <CardHeader className='text-center bg-primary text-white'>
                            Elija Tipo de Rubro: {selectItemRow?.tipo_rubro || null}
                        </CardHeader>
                        <CardBody>

                            <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={typeRubro || []}
                                selectItemRow={setselectItemRow}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                thClass='fs-6 fw-light border'
                                tbodyClass='bg-gray'
                                styleHeight='200px'
                                overflowY='scroll'
                            />
                        </CardBody>
                        <CardFooter className=''>
                            <BtnPosModal
                                onAceptarClick={() => handleAceptar()}
                                onCloseClick={onCloseClick}
                                btnClassAceptar={'border-primary text-black fs-15 '}
                                textCancelar='Cerrar'
                            />

                        </CardFooter>

                    </Card>

                </ModalBody>

            </Modal>
            <ToastContainer />
        </>
    )
}

export default ModalTipoRubro