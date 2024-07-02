import { FC } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CompSubCategorias from '../CompSubCategorias';
interface IProps {
    dataSubRubros: any;
    setDataProducts: any;
}


const SwiperSubCategorias: FC<IProps> = ({ dataSubRubros, setDataProducts }) => {
    const slidesPerView = Math.min(5, dataSubRubros.length);

    return (

        <>
            <Swiper
                className='w-100'
                spaceBetween={5}
                slidesPerView={slidesPerView}
            >
                {(dataSubRubros || []).map((item: any, key: number) => (
                    <SwiperSlide key={key} >
                        <CompSubCategorias item={item} key={key} setDataProducts={setDataProducts} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/*    */}

        </>

    )
}

export default SwiperSubCategorias