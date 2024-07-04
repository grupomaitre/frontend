import { useDispatch, useSelector } from 'react-redux'
import { combinedSelector } from './States/Selectors'
import React, { lazy, useEffect, useMemo, useRef, useState } from 'react'
import './css/index.css'
//redux
import {
    addCart,
    minusCart,
    addOrden,
    setQuantity2,
    setNewCart,
    setIdMesa,
    addMesa,
    setIDCart,
    setVendedorSlice,
    addPax,
    setIsCartSuccess,
    setIDUser,
} from '../../slices/Cart/cartSlice'
import { setMesa } from '../../slices/Facturacion/Mesa/mesaSlice'

interface IrefInput {
    current: HTMLInputElement | null
}

const MenuPos = lazy(() => import('./ComponentsNew/MenuPos'))
import { getAllMesas } from './Helpers/GetMesas'
import { getOrdens } from "./Helpers/ApiOrders"
import Groups from './Samples/Groups/Groups'
import { IGroups, IProducts, ISubGroups } from './Interfaces/InterfaceGroups'
import PosCompoTree from './Components/PosCompoTree'
import PosCompoTwo from './Components/PosCompoTow'
import { BuscarMesa } from './Helpers/ApiMesas';
import { setOnUserName, setPaxTeclado } from '../../slices/Cart/tecladoSlice';
import { BuscarUser } from './Helpers/ApiUser';
import { getProductsList } from '../../helpers/fakebackend_helper';
import { setProductList } from '../../slices/Cart/productSlice';
import { socketTest } from './Socket/ConctSocket';
import { setInputMesa, setInputVendedor } from '../../slices/Cart/cartStatusSlice'
import { useQuery } from 'react-query'
import { fetchGroupsTipo } from './Api/ApiGroups'
import Overlay from '../../common/Loading/Overlay'
const PosNew = () => {
    const dispatch = useDispatch()
    const [dataSubRubros, setDataSubGroup] = useState<ISubGroups[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    const [itemUniCart, setItemUniCart] = useState([])

    const {
        mesas

    } = useSelector(combinedSelector)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)

    //react query rubros
    const { data: grupos, isLoading, refetch }: any = useQuery(['posRubros'], () => fetchGroupsTipo(1), {
        refetchOnWindowFocus: false
    });
    useEffect(() => {
        refetch()
    }, [])
    const HandleSetSubGroup = (Items: IGroups) => {

        setDataSubGroup(Items?.sub_rubros || [])
        setProducts(Items.sub_rubros[0]?.products || [])
    }

    const setDataProducts = (Items: ISubGroups) => {
        setProducts(Items?.products || [])
    }
    useEffect(() => {
        if (!isLoading) {
            const newProductos = grupos[0]?.sub_rubros[0]?.products.map((item: any) => (
                {
                    cantidad: item.cantidad,
                    id_bodega: item.id_bodega,
                    id_product: item.id_product,
                    id_sub_rubro: item.id_sub_rubro,
                    iva: item.iva,
                    nombre: item.nombre,
                    //    precio: item.iva === "1.0000" ? (parseFloat(item.precio) / 1.12).toFixed(2) : item.precio,
                    precio: item.iva === "1.0000" ? Math.round((parseFloat(item.precio) / 1.15) * 100) / 100 : item.precio,

                    precio_final: item.precio_final,
                    servicio: item.servicio,
                    status: item.status,
                    tipo_impuesto: item.tipo_impuesto,
                    tota_servicio: item.tota_servicio,
                    total: item.total,
                    total_iva: item.total_iva,
                    url_imagen: item.url_imagen,
                    editable: item.editable,
                    editable_precio: item.editable_precio,
                    editable_nombre: item.editable_nombre,
                    preferencias: item?.preferencias_prod,
                    impresora: item.impresora?.sitios?.asignacion?.direccion_impresora || null,
                    copias: item?.impresora?.sitios?.asignacion?.copias || 1
                }
            ))
            setDataSubGroup(grupos[0]?.sub_rubros)
            //setProducts(grupos[0]?.sub_rubros[0]?.products)
            setProducts(newProductos)
        }
    }, [isLoading, refetch, grupos])

    const getMesa = () => { getAllMesas().then(res => res && dispatch(setMesa(res))) }

    useEffect(() => { getMesa() }, [])

    const memoizedItemUniCart = useMemo(() => itemUniCart, [itemUniCart])


    useEffect(() => {
        getOrdens().then(res => res && dispatch(addOrden(res.data)))
    }, [])
    /*Teclado funciones */
    const [inputValues, setInputValues] = useState<Array<string>>(['', '', '', '']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => React.createRef()));

    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1);
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
    const clearInvidualInput = (index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = '';
        setInputValues(newInputValues);
    }
    //list products
    useEffect(() => {
        socketTest.on('productosActualizados', (data: any) => {
            dispatch(setProductList(data.data))
        });

        return () => {
            socketTest.off('productosActualizados');
        };
    }, []);

    useEffect(() => {
        getProductsList().then(res => {
            dispatch(setProductList(res.data))
        })
    }, [])

    useEffect(() => {
        // Escuchar el evento 'mesasActualizadas' emitido desde el servidor
        socketTest.on('mesasActualizadas', (nuevasMesas) => {
            if (nuevasMesas.status) {
                dispatch(setMesa(nuevasMesas.data || []))
            }

        });

        // Limpiar el listener al desmontar el componente
        return () => {
            socketTest.off('mesasActualizadas');
        };
    }, []);

    const handleEnter = () => {
        if (activeInputIndex === 0) {
            inputValues[0] ?
                BuscarMesa(inputValues[0], idCart).then((res: any) => {

                    if (res.message === "Mesa no encontrada") {
                        setInputValues(['', '', '', '']);
                        setTimeout(() => {
                            inputRefs.current[0].current?.focus();
                        }, 100)
                        dispatch(setIdMesa(0))
                        dispatch(addMesa(''))
                        return
                    }
                    if (res.message === "Cuenta sin items") {
                        dispatch(setInputMesa(true))
                        dispatch(setInputVendedor(false))
                        dispatch(setIdMesa(res.data.id_mesa))
                        dispatch(addMesa(res.data.nombre_mesa))
                        inputRefs.current[0].current?.blur()
                        setInputValues([res.data.nombre_mesa, '', '', ''])
                        setTimeout(() => {
                            inputRefs.current[1].current?.focus();
                        }, 100)
                        return
                    }
                    if (res.id_cart > 0) {
                        dispatch(setInputMesa(true))
                        dispatch(setInputVendedor(true))
                        inputRefs.current[0].current?.blur()
                        inputRefs.current[1].current?.blur()
                        setTimeout(() => {
                            inputRefs.current[2].current?.focus();

                        }, 100)
                        dispatch(setNewCart(res.product))
                        dispatch(setIDCart(res.id_cart))
                        dispatch(addPax(res.pax))
                        dispatch(setIsCartSuccess(true))
                        dispatch(addMesa(res.nombre_mesa))
                        dispatch(setIdMesa(res.id_mesa))
                        dispatch(setIDUser(res.id_user))
                        dispatch(setVendedorSlice(res.resposable))
                        setInputValues([res.id_mesa, '****', '', '']);
                        return
                    }
                    return
                })
                : inputRefs.current[0].current?.focus();

        }

        if (activeInputIndex === 1) {
            // inputRefs.current[2].current?.focus()

            BuscarUser(inputValues[1]).then((res: any) => {

                if (res === "No existe Vendedor") {

                    setTimeout(() => {
                        inputRefs.current[1].current?.focus()
                        setInputValues([mesacart, '', '', '']);
                    }, 100)
                } else {

                    dispatch(setVendedorSlice(res.persona.name + ' ' + res.persona.last_name))
                    dispatch(setInputVendedor(true))
                    //setShowModalPax(!shoModalPax)
                    dispatch(setPaxTeclado(true))
                    dispatch(setIDUser(res.id_user))
                    dispatch(setOnUserName(true))
                    setTimeout(() => {
                        inputRefs.current[2].current?.focus()
                        setInputValues([mesacart, '****', '', '']);
                    }, 100)
                }


            }).catch((err: any) => {
                return err
            })
        }
        if (activeInputIndex === 2) {
            const cantidad = parseFloat(inputValues[2])
            if (cantidad >= 0) {
                inputRefs.current[3].current?.focus();
                dispatch(setQuantity2(cantidad || 1))
            }
        }
        if (activeInputIndex === 3) {
            dispatch(setQuantity2(0))

            inputRefs.current[2].current?.focus();
            setInputValues(prevInputValues => {
                const updatedValues = [...prevInputValues];
                updatedValues[2] = '';
                updatedValues[3] = '';
                return updatedValues;
            });
        }
    }
    const ClearInputKeyBoard = (item: number) => {
        const nuevosValores = [...inputValues];
        nuevosValores[item] = '';
        setInputValues(nuevosValores);
    }
    //const cart = useSelector((state: any) => state.cartSlice.cart)
    //console.log(cart)
    return (

        <>
            {!isLoading ? <div  >
                {/*  <ModalMapMesas
                          items={mesas}
                      /> */}
                <MenuPos
                    mesas={mesas}
                    item={memoizedItemUniCart}
                    addCart={addCart}
                    minusCart={minusCart}
                    getMesa={getMesa}
                    setItemUniCart={setItemUniCart}
                />

                <Groups
                    HandleSetSubGroup={HandleSetSubGroup}
                    setDataSubGroup={setDataSubGroup}
                    grupos={grupos}
                />

                <PosCompoTwo
                    dataSubRubros={dataSubRubros}
                    setDataProducts={setDataProducts}
                    inputRef={inputRefs}
                    inputValues={inputValues}
                    handleInputChange={handleInputChange}
                    activeInputIndex={activeInputIndex}
                    clearInvidualInput={clearInvidualInput}
                    handleInputClick={handleInputClick}
                    setInputValues={setInputValues}
                    handleInputFocus={handleInputFocus}
                    setItemUniCart={setItemUniCart}
                    handleEnter={handleEnter}
                    products={products}

                />

                <PosCompoTree
                    handleDelete={() => handleDelete()}
                    handleKeyPress={(e) => onKeyPress(e)}
                    getMesa={getMesa}
                    products={products}
                    handleEnter={handleEnter}
                    activeInputIndex={activeInputIndex}
                    inputValues={inputValues}
                    inputRefs={inputRefs}
                    ClearInputKeyBoard={ClearInputKeyBoard}

                />

            </div> : <Overlay />}

        </>

    )
}

export default PosNew