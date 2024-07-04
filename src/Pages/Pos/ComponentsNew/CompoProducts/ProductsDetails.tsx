import { FC, Fragment, useEffect, useState } from 'react'
import CompProducts from '../CompProducts'
// Import Swiper styles
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"
import "./style.css"
// import required modules
import SimpleBar from 'simplebar-react';
import { IProducts } from '../../Interfaces/InterfaceGroups'
import { useSelector } from 'react-redux'

interface IProductsDetails {
    products: Array<IProducts>
    activeInputIndex?: number
    inputValues?: any
    inputRefs: any
    ClearInputKeyBoard: (item: number) => void



}
const ProductsDetails: FC<IProductsDetails> = ({ products, activeInputIndex, inputValues, inputRefs, ClearInputKeyBoard }) => {
    const [dataProducts, setDataProducts] = useState<IProducts[]>([])
    const productSliceList = useSelector((state: { productSlice: { productSliceList: any } }) => state?.productSlice.productSliceList)
    useEffect(() => {

        setDataProducts(products?.length > 0 ? products : [])

    }, [productSliceList, products])
    return (

        <SimpleBar autoHide={true} style={{ maxHeight: "300px", height: '310px' }} className="simplebar-track-warning m-0 p-0 d card-neo">

            {activeInputIndex === 3 && inputValues[3].length > 0 ?
                <>

                </>

                : < div className=" grid-container-products ">


                    {dataProducts &&
                        (dataProducts || []).map((item: IProducts, key: number) => {
                            const colorIndex = Math.floor(key / 5);

                            const colors = ['#fff', '#fff', '#fff', '#fff', '#fff'];
                            const color = colors[colorIndex % colors.length];

                            return (
                                <Fragment key={key}>
                                    <CompProducts
                                        color={color}
                                        item={item}
                                        inputRefs={inputRefs}
                                        ClearInputKeyBoard={ClearInputKeyBoard}
                                    />
                                </Fragment >
                            );
                        })
                    }


                </div>}
        </SimpleBar >
    )
}

export default ProductsDetails