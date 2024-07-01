import { FC, useRef, useState, createRef } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { AlignCenter, Plus, X } from 'react-feather'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import { useSelector, useDispatch } from 'react-redux'
import ModalAlert from '../../../../common/Generics/Modal/ModalAlert'
import { addCart } from '../../../../slices/Cart/cartSlice'
interface IrefInput {
    current: HTMLInputElement | null
}

interface IProps {
    show: boolean,
    onCloseClick: () => void
    producto: any
    //opProducts: any
}

const ModalBuscar: FC<IProps> = ({ show, onCloseClick, producto }) => {
    const [inputValues, setInputValues] = useState<Array<string>>(['', '', '', '']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [selectItemRow, setSelecItemRow] = useState<any>({})
    const [showModal, setShowModal] = useState(false)

    //redux
    const dispatch = useDispatch()
    const { id_user } =
        useSelector((state: { cartSlice: { idMesa: number, id_user: number } }) => ({
            id_user: state.cartSlice.id_user,

        }))

    //keyboard
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    }
    const handleInputClick = (index: number) => {
        setActiveInputIndex(index);
    }
    //on focus function
    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }

    const handleDelete = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1);
        setInputValues(newInputValues);
    }
    const handleClear = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = ''
        setInputValues(newInputValues);
        inputRefs.current[0].current?.focus()
        setSelecItemRow({})
    }
    /* end teclado */
    const handleAddCart = () => {
        if (id_user === 0) {
            setShowModal(true)
            inputRefs.current[0].current?.focus();
        } else {
            dispatch(addCart(selectItemRow))
            onCloseClick()
        }
    }
    const colums = [
        {
            Header: 'Codigo',
            accessor: 'id_product'
        },
        {
            Header: 'Nombre',
            accessor: 'nombre'
        },
        {
            Header: 'Precio',
            accessor: 'precio'
        }
    ]

    const keyboards = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M',
        ' '
    ]
    return (
        <>
            {showModal &&
                <ModalAlert
                    show={showModal}
                    onCloseClick={() => setShowModal(false)}
                    onAceptar={() => setShowModal(false)}
                    onCancelar={() => setShowModal(false)}
                    showAceptar={true}
                    showCancelar={true}
                />}
            <Modal isOpen={show} toggle={onCloseClick} fade={false}
                style={{ maxWidth: '692px' }}
            >
                <ModalHeader toggle={onCloseClick}>
                    {'Buscar Producto'}
                </ModalHeader>
                <ModalBody className='page-bg'>

                    <Row>
                        <Label className='text-light'>Producto :
                            <span className='text-uppercase text-white'> {selectItemRow?.nombre || ''}</span>
                        </Label>
                    </Row>
                    <Row className='mb-3 '  >
                        <Col lg='8' className='d-flex'>
                            <Input
                                innerRef={inputRefs.current[0]}
                                value={inputValues[0]}
                                placeholder='Buscar'
                                onClick={() => handleInputClick(0)}
                                onChange={(e) => handleInputChange(e, 0)}
                                onFocus={() => handleInputFocus(0)}
                                bsSize='sm'
                                className='rounded-0'
                            />
                            <Button
                                color='danger'
                                className='rounded-0'
                                onClick={handleClear}
                            >
                                <X
                                    size={15}
                                    fill='#0dcaf0'
                                />
                            </Button>
                        </Col>
                        <Col lg='2'>
                            <Button
                                className=' d-flex align-items-center justify-content-around'
                                block
                                color='light'
                                onClick={() => setShowKeyboard(!showKeyboard)}
                            >
                                <AlignCenter size={15} />
                                <span className='fs-13'>
                                    {'Teclado'}
                                </span>
                            </Button>

                        </Col>
                        <Col lg='2'>
                            <Button
                                onClick={() => handleAddCart()}
                                block
                                color='light'
                                className=' d-flex align-items-center justify-content-around'

                            >
                                <Plus size={15} />
                                <span className='fs-13'>
                                    {'Agregar'}

                                </span>
                            </Button>
                        </Col>
                    </Row>

                    <div className='mb-1'>
                        <TableGeneric
                            columns={colums || []}
                            data={producto || []}
                            selectItemRow={setSelecItemRow || {}}
                            showFilter={false}
                            showFooter={false}
                            showInputExt={true}
                            valueSearch={inputValues[0]}
                            divClass='table-responsive text-black'
                            tableClass='w-100 fs-11  table-sm cursor-pointer'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-light border-bottom '
                            tbodyClass='bg-light'
                            customPageSize={10}
                            styleHeight='150px'
                        />
                    </div>


                    <Row className='my-2'>
                        <Col lg='' className='bg-light'>
                            {showKeyboard &&
                                <NumericKeyboard
                                    onKeyPress={onKeyPress}
                                    handleDelete={handleDelete}
                                    keyboards={keyboards}
                                    gridTemplateColumns={'10'}
                                />
                            }
                        </Col>
                    </Row>
                </ModalBody>

            </Modal>

        </>
    )
}

export default ModalBuscar