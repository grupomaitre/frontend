import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getRefencias, saveRefencia, } from '../../Helpers/ApiReferencias'
import ListaRefencia from './CompReferencia/ListaRefencia'
import PushRefencia from './CompReferencia/PushRefencia'
import { useDispatch, useSelector } from 'react-redux'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import TestTelcado from './Components/TestTelcado'
import { Menu } from 'react-feather'

import './css/preference.css'
import { addCart, addPreferences, setIsPreference } from '../../../../slices/Cart/cartSlice'
import { useQuery } from 'react-query'

interface Items {
    cantidad: number
    nombre: string
    id_cart: number
    id_product: number
}
interface IProps {
    show: boolean
    onCloseClick: () => void
    item?: Items | any
    setItemUniCart?: any
    moduleItems?: boolean
    listPrefer?: any
}
const ModalReferencia: React.FC<IProps> = ({ item, show, onCloseClick, moduleItems, listPrefer }) => {
    const producto = JSON.parse(localStorage.getItem('itemCart') || '')
    const dispatch = useDispatch()
    const [referencias, setReferencias] = React.useState([])
    const [listReferencias, setListReferencias] = useState<any>([])
    const [newReferencia, setNewReferencia] = useState('')
    const [activeItem, setActiveItem] = useState<number>(0)
    const [btnIsCartSuccess, setBtnIsCartSuccess] = useState(false)
    const [itemRemove, setItemRemove] = useState<any>()
    const [newRefeData, setnewRefeData] = useState<any[]>([])

    useEffect(() => {
        setnewRefeData((listPrefer || []).map((item: any) => (item.preferecencias)))
    }, [listPrefer, show])

    const cart = useSelector((state: any) => state.cartSlice.cart)


    const { data: refeData, refetch: referenciaCaja, isLoading } = useQuery(["referenciasData"], getRefencias, {
        cacheTime: 6 * 60 * 60 * 1000,
        staleTime: 6 * 60 * 60 * 1000,
    })

    const handleAddReferencia = () => {
        //add item to setListReferencias
        if (itemRemove && itemRemove.id_referencia_product !== undefined) {
            const isItemAlreadyAdded = listReferencias.some((item: any) => item.id_referencia_product === itemRemove.id_referencia_product);

            if (!isItemAlreadyAdded) {
                setListReferencias([...listReferencias, itemRemove]);
                setActiveItem(itemRemove.id_referencia_product);
            }
        }
    }

    const handleRemoveReferencia = () => {
        const newListReferencias = listReferencias.filter((item: any) => item.id_referencia_product !== itemRemove?.id_referencia_product)
        setListReferencias(newListReferencias)

    }

    useEffect(() => {
        if (itemRemove) {
            setActiveItem(itemRemove.id_referencia_product)
        }
    }, [itemRemove])

    const handleSaveReferencia = () => {
        saveRefencia(newReferencia).then((data) => {
            if (data) {
                setListReferencias([...listReferencias, data])
                getRefencias().then((res) => {
                    referenciaCaja()
                    setReferencias(res)
                    setNewReferencia('')
                    setInputs({ ...inputs, preferencias: '' })
                })
            }
        })
    }

    useEffect(() => {
        const cartSuccess = cart.some((item: any) => item.isCartSuccess === true);
        setBtnIsCartSuccess(cartSuccess)
    }, [cart])
    const saveReferense = async () => {
        const newItem = {
            ...item || producto,
            preferences: listReferencias
        }
        if (listPrefer?.length || 0 > 0) {
            dispatch(addPreferences({ item: producto, preferences: listReferencias }))
            onCloseClick()
        } else {
            dispatch(addPreferences({ item: producto, preferences: listReferencias }))
            onCloseClick()

        }


    }

    const [showKeyBoard, setShowKeyBoard] = useState(false);
    /*Teclado funciones */
    const keyboard = useRef();
    const [inputs, setInputs] = useState<any>({})
    const [layoutName, setLayoutName] = useState("default")
    const [inputName, setInputName] = useState("default");

    const onChangeAll = (inputs: any) => {
        setInputs({ ...inputs })
    }

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default"
        setLayoutName(newLayoutName)
    }

    const onKeyPress = (button: any) => {
        // console.log("Button pressed", button)
        if (button === "{shift}" || button === "{lock}") handleShift()
    }

    const onChangeInput = (event: any) => {
        const inputValue = event.target.value
        setInputs({
            ...inputs,
            [inputName]: inputValue
        })
        if (keyboard.current) {
            (keyboard.current as any).setInput(inputValue)
        }
    }
    const getInputValue = (inputName: string) => {
        return inputs[inputName] || ""
    }

    const customTeclas = {
        default: [
            '1 2 3 4 5 6 7 8 9 0',
            "Q W E R T Y U I O P",
            "A S D F G H J K L Ñ",
            "Z X C V B N M {bksp}",
            "{space}"
        ],
        shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L Ñ",
            "{shiftactivated} Z X C V B N M {bksp}",
            "{space}"
        ]
    };

    const onHandleCloseClick = () => {
        localStorage.removeItem('itemCart')

        onCloseClick()
        /*     
              setItemUniCart([])
              dispatch(setSelectedProduct({})) */

    }
    useEffect(() => {
        setNewReferencia(inputs.preferencias)
    }, [inputs.preferencias])
    return (
        <Modal isOpen={show} toggle={onCloseClick} backdrop="static" style={{ maxWidth: '750px' }} className='' fade={false}>
            <ModalHeader toggle={onCloseClick}>
                {'Preferencias'}
            </ModalHeader>
            <ModalBody className='page-bg'>
                <Row>
                    <Col className=' text-white  fs-15 d-flex justify-content-between w-100'>
                        <Label>Cantidad: {producto?.cantidad || null}   </Label>
                        <Label>Item: {producto?.nombre || null}</Label>
                    </Col>
                </Row>
                <Row>
                    <Col lg='5' className=''>

                        <Card>
                            <CardHeader className='m-0 px-1 p-0 py-1 fs-11 bg-primary text-white'>
                                Preferencias
                            </CardHeader>
                            <CardBody className='p-1'>
                                {!isLoading && <ListaRefencia
                                    item={listPrefer?.length > 0 ? newRefeData : refeData || []}
                                    activeItem={activeItem}
                                    setItemRemove={setItemRemove}
                                />}
                            </CardBody>
                        </Card>

                    </Col>
                    <Col className='d-flex  justify-content-between flex-column ' lg='3'>

                        <Card className='h-100 ' style={{ background: '#e8e8e8' }}>
                            <CardBody>
                                <ButtonGroup vertical className='h-100'>
                                    {/*    */}
                                    <Button
                                        block
                                        color=''
                                        className='fs-14 prefeButton rounded'
                                        onClick={handleAddReferencia}
                                        disabled={moduleItems || false}
                                    >
                                        Agregar Preferencia
                                    </Button>
                                    <Button
                                        disabled={moduleItems || false}
                                        block color=''
                                        className='fs-14 my-3 prefeButton rounded'
                                        onClick={handleRemoveReferencia} >
                                        Quitar Preferencia
                                    </Button>
                                    <Button
                                        block
                                        color=''
                                        className='fs-14 prefeButton rounded'
                                        onClick={handleSaveReferencia} >
                                        Agregar Nueva Preferencia

                                    </Button>
                                    {/*      > */}
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg='4' className='m-0 p-0'>
                        <Card>
                            <CardHeader className='m-0 px-1 p-0 py-1 fs-11 bg-primary text-white'>
                                Preferencias
                            </CardHeader>
                            <CardBody className='p-1'>
                                <PushRefencia
                                    item={listReferencias}
                                    setItemRemove={setItemRemove}
                                    activeItem={activeItem}
                                />
                            </CardBody>
                        </Card>
                    </Col>

                </Row>


                <div className='d-flex align-items-center '>
                    <Button color="info" className="d-flex align-items-center btn-label rounded-0 rounded-start text-white fs-12"
                        onClick={() => setShowKeyBoard(!showKeyBoard)}
                    >
                        <Menu className='label-icon align-middle mt-1' />
                        <span>Teclado</span>

                    </Button>
                    <Input
                        id="preferencias"
                        value={getInputValue("preferencias")}
                        onFocus={() => setInputName("preferencias")}
                        onChange={onChangeInput}
                        placeholder='Escribir Nueva Preferencia'
                        className='my-1 rounded-0 '
                        bsSize='sm'
                    />
                </div>
                {
                    showKeyBoard && <TestTelcado
                        customLayout={customTeclas}
                        inputName={inputName}
                        onChangeAll={onChangeAll}
                        onKeyPress={onKeyPress}
                    />
                }
                <BtnPosModal
                    btnDisabled={listReferencias.length === 0}
                    onAceptarClick={saveReferense}
                    onCloseClick={onHandleCloseClick}
                />
            </ModalBody>


        </Modal>
    )
}

export default ModalReferencia