import React, { useEffect, FC, memo, useState } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, setQuantity2, setTempProduct } from '../../../../slices/Cart/cartSlice'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import ModalReferencia from '../ComponetsMenuPos/ModalReferencia'
import ModalProductEditable from '../Modals/Modal/ModalProductEditable'
import ModalAlert from '../../../../common/Generics/Modal/ModalAlert'
interface IProps {
    //final teclado v2
    inputRef: null | any
    inputValues: any
    activeInputIndex: number
    setInputValues: any
    onChangeProp: (event: React.ChangeEvent<HTMLInputElement> | any, n: number) => void
    clearInvidualInput: (index: number) => void
    handleInputClick: (index: number) => void
    handleInputFocus: (index: number) => void
    handleKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    products: any

}
const BuscadorProductos: FC<IProps> = memo(({
    inputRef,
    inputValues,
    setInputValues,
    activeInputIndex,
    /*  activeInputIndex,
     setInputValues, */
    onChangeProp,
    // clearInvidualInput,
    handleInputClick,
    handleInputFocus,
    handleKeydown,
    products
}) => {
    const dispatch = useDispatch()
    const isAddCartSuccess = useSelector((state: any) => state.cartSlice.isAddCartSuccess)
    const idMesa = useSelector((state: any) => state.cartSlice.idMesa)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    const onModal = useSelector((state: any) => state.tecladoSlice.onModal)
    const [selectOp, setSelectOp] = useState<any>([])
    const productSliceList = useSelector((state: { productSlice: { productSliceList: any } }) => state.productSlice.productSliceList)
    const [selectedOption, setSelectedOption] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showModalPrefe, setShowModalPrefe] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [itemProd, setItemPro] = useState<any>()
    useEffect(() => {
        setSelectOp(products.map((item: any) => ({
            cantidad: item.cantidad,
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

    const handleInvInputValues = (index: number) => {
        inputRef.current[index].current?.select()
        const updatedValues = [...inputValues]
        updatedValues[index] = ''
        setInputValues(updatedValues)
    }

    useEffect(() => {
        if (isAddCartSuccess) {
            dispatch(setTempProduct({}))
        }
    }, [isAddCartSuccess])

    useEffect(() => {
        const cantidad = parseFloat(inputValues[2])
        if (activeInputIndex === 2) {
            dispatch(setQuantity2(cantidad || 1))
        }
    }, [inputValues[2]])

    useEffect(() => {
        if (onModal) {
            inputRef.current[2].current?.blur()
            inputRef.current[3].current?.blur()
        }
    }, [onModal])

    const handleOnClick = (item: any) => {
        inputRef.current[2].current?.focus();
        setItemPro(item)
        localStorage.setItem('itemCart', JSON.stringify(item))

        if (id_user === 0) {
            inputRef.current[1].current?.focus();
            setShowModal(true);
        }
        else if (item?.preferencias?.length > 0) {
            setShowModalPrefe(true);
            dispatch(addCart(item));
            inputRef.current[2].current?.focus();

        }
        else if (item?.editable) {
            inputRef.current[2].current?.focus();

            setShowModalEdit(true)
        }
        else {
            dispatch(addCart(item));
            // ClearInputKeyBoard(2);
            inputRef.current[2].current?.focus();
            handleInvInputValues(2)
        }
        /*        if (idMesa != 0 && id_user != 0) {
                   inputRef.current[2].current?.focus()
                   dispatch(addCart(e))
                   setSelectedOption(null)
                   handleInvInputValues(2)
       
               } */

    }

    interface IMenu {
        label: any
        customAbbreviation: any
        precio: any
    }
    const formatOptionLabel: FC<IMenu> = ({ label, customAbbreviation, precio }) => (
        <div style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: 'space-between' }} className='fs-11 text-black'>
            <div >${precio}</div>
            <div  >{label}</div>
            <div >
                {customAbbreviation}
            </div>
        </div>
    )
    return (
        <>
            {showModalPrefe &&
                <ModalReferencia
                    item={itemProd}
                    show={showModalPrefe}
                    onCloseClick={() => setShowModalPrefe(false)}
                    listPrefer={itemProd?.preferencias}
                />
            }
            {showModalEdit &&
                <ModalProductEditable
                    show={showModalEdit}
                    item={itemProd}
                    onCloseClick={() => setShowModalEdit(false)}

                />
            }
            {showModal &&
                <ModalAlert
                    show={showModal}
                    onCloseClick={() => setShowModal(false)}
                    onAceptar={() => setShowModal(false)}
                    onCancelar={() => setShowModal(false)}
                    text='Ingrese Vendedor'
                    showAceptar={true}
                    showCancelar={true}
                />}
            <div className='d-flex gap-1'>
                <div style={{ width: '20%' }}>

                    <InputKeyBoard
                        inputRef={inputRef.current[2]}
                        value={inputValues[2] || ''}
                        onChange={(event) => onChangeProp(event, 2)}
                        handleInputClick={() => handleInputClick(2)}
                        handleKeydown={handleKeydown}
                        classInput='text-center  fs-15'
                        styleInput={{ fontSize: '1.7rem', height: '35px', border: '1px solid rgb(0,0,0,0.4)' }}
                        type='number'
                        handleInputFocus={() => handleInputFocus(2)}
                        bsSize='sm'
                        disabled={idMesa === 0 ? true : false}

                    />
                </div>
                <div className='w-100'>

                    <Select
                        value={selectedOption}
                        isClearable={true}
                        placeholder={'Buscar Producto'}
                        ref={inputRef.current[3]}
                        onChange={(e) => handleOnClick(e)}
                        formatOptionLabel={formatOptionLabel}
                        options={selectOp}
                        isDisabled={id_user === 0 ? true : false}
                        className='rounded'
                        styles={
                            {
                                control: (base: any) => ({
                                    ...base,
                                    height: '34px',
                                    minHeight: '34px',
                                    fontSize: '11px',
                                    boxShadow: 'none',
                                    border: '1px solid rgb(0,0,0,0.4)',
                                    backgroundColor: '#fff'

                                })
                            }
                        }

                    />



                </div>
            </div>
        </>
    )
})

export default BuscadorProductos