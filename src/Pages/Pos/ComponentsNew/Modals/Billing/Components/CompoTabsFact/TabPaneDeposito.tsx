import { FC, useEffect, useState } from 'react'
import { TabPane, Row, Col, Button } from 'reactstrap'
import { useSelector } from 'react-redux'
import FormDeposito from './Components/FormDeposito'
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
import BtnPosModal from '../../../../../../../Components/Common/Buttons/BtnPosModal'
import TableGeneric from '../../../../../../../common/Generics/Table/TableGeneric'
import { v4 as uuidv4 } from 'uuid';
import ModalAlert from '../../../../../../../common/Generics/Modal/ModalAlert'

interface Props {
    total: number
    items: any
    setInputDeposito?: any
    //keyboard
    inputRefs?: any
    onKeyPress?: any
    handleDelete?: any
    inputValues?: any
    setInputValues: any
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
    activeInputIndex: any
    setActiveInputIndex: any
    //end keyboard
    saveDeposito: (data: any) => void
    editDeposito: (id: number, data: any) => void
    deleteDeposito: (id: number) => void
    onCloseClick: () => void
    testVuelto: any
    isLoading: boolean

}
const TabPaneDeposito: FC<Props> = ({ total, items,
    //keyboard
    inputRefs,
    onKeyPress,
    handleDelete,
    inputValues,
    setInputValues,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    activeInputIndex,
    setActiveInputIndex,
    saveDeposito,
    editDeposito,
    deleteDeposito,
    onCloseClick,
    isLoading
}) => {
    //columns use meno 
    const totalItems = items.reduce((acc: any, el: any) => acc + (parseFloat(el.monto)), 0)

    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const [selectItem, setSelectItem] = useState<any>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [addNext, setAddNext] = useState(true)

    useEffect(() => {
        if (totalItems >= total) {
            setAddNext(true)
        }
        else {
            setAddNext(false)
        }
    }, [items, total, totalItems])
    //INTPUS REF

    useEffect(() => {
        if (isEdit) {
            setInputValues([
                selectItem?.monto,
                selectItem?.numero_deposito,
                selectItem?.cuenta_acreditada,
                selectItem?.observaciones
            ])
        }
    }, [selectItem, isEdit])


    const columns = [
        //monto
        {
            Header: 'Monto',
            accessor: 'monto'
        },
        //numero_deposito
        {
            Header: 'N° Deposito',
            accessor: 'numero_deposito'
        },
        {
            Header: 'Cuenta Acreditada',
            accessor: 'cuenta_acreditada'
        }
    ]
    const handlePushData = () => {
        if (inputValues[0] === 0) return
        const dataPush = {
            monto: inputValues[0],
            numero_deposito: inputValues[1],
            cuenta_acreditada: inputValues[2],
            observaciones: inputValues[3],
            id_order,
            uiID: uuidv4()

        }
        if (isEdit) {
            editDeposito(selectItem?.id_factura_deposito, dataPush)
            setIsEdit(false)
        } else {
            saveDeposito(dataPush)
        }


    }



    const handleDeleteItem = () => {
        const item = selectItem;
        deleteDeposito(item?.id_factura_deposito)
        setIsEdit(false)
    }

    const handleKeydown = () => {
        //next input ref
        if (activeInputIndex < inputRefs.current.length - 1) {
            inputRefs.current[activeInputIndex + 1].current?.focus()
            inputRefs.current[activeInputIndex + 1].current?.select()
            setActiveInputIndex(activeInputIndex + 1)
        } else {
            inputRefs.current[0].current?.focus()
        }

    }

    useEffect(() => {

        if (selectItem?.id_factura_deposito > 0) {
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }

    }, [selectItem]);

    const [showAlert, setShowAlert] = useState(false)

    const handleCloseAlert = () => {
        setAddNext(false)
        setShowAlert(false)
    }
    return (

        <>
            {
                showAlert &&
                <ModalAlert
                    show={showAlert}
                    onAceptar={() => handleCloseAlert()}
                    onCancelar={() => setShowAlert(false)}
                    onCloseClick={() => setShowAlert(false)}
                    showAceptar={true}
                    showCancelar={true}
                    text='Total mayor al original'
                    backdrop={true}
                />
            }
            <div className=''>
                <TabPane tabId="6" id="settings">
                    <FormDeposito
                        handleInputChange={handleInputChange}
                        handleInputClick={handleInputClick}
                        handleInputFocus={handleInputFocus}
                        inputRefs={inputRefs}
                        inputValues={inputValues}

                    />


                </TabPane>
                <Row className=''>

                    <Col lg='8' className='border bg-white'>
                        <div className='d-flex my-2 gap-5 justify-content-between'>

                            <Button
                                disabled={isLoading}
                                block
                                className=' ms-1 fs-12 '
                                // innerRef={btnAgregarRef}
                                color='primary'
                                onClick={addNext ? () => setShowAlert(true) : () => handlePushData()}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === 'Enter') {
                                            handlePushData
                                        }
                                    }
                                }
                            >{!!isEdit ? 'Actualizar' : 'Agregar'}   </Button>

                            <Button
                                outline
                                block
                                className='fs-12 '
                                color='danger'
                                onClick={handleDeleteItem}
                            >Eliminar</Button>

                        </div>

                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            data={items || []}
                            selectItemRow={setSelectItem}
                            divClass='table-responsive text-black bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-bold border'
                            tdClass={'border fs-12'}
                            tbodyClass='bg-light'
                            styleHeight='130px'
                            overflowY='scroll'
                        />
                        <div className='mt-1'>
                            <BtnPosModal
                                onAceptarClick={onCloseClick}
                                onCloseClick={onCloseClick}
                            />
                        </div>
                    </Col>
                    <Col lg='4' className=' border bg-white d-flex align-items-start px-0' style={{ background: '' }}>
                        <NumericKeyboard
                            handleDelete={() => handleDelete()}
                            onKeyPress={(e) => onKeyPress(e)}
                            heightKey='45px'
                            heightBtnDelete='50px'
                            btnClass={'rounded border-sistema'}
                            keyboards={[
                                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '00'
                            ]}
                        />
                        <Button
                            color='light'
                            className='fs-12 text-black border-sistema shadow-md d-flex align-items-center justify-content-center'
                            style={{ width: '60px', height: '75%', marginTop: '3px', textAlign: 'center' }}
                            onClick={handleKeydown}
                        >
                            <span className=''>Enter</span>
                        </Button>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default TabPaneDeposito