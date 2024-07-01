import { FC } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from 'swiper/modules';
import CompSubCategorias from '../CompSubCategorias';
interface IProps {
    dataSubRubros: any;
    setDataProducts: any;
}


const SwiperSubCategorias: FC<IProps> = ({ dataSubRubros, setDataProducts }) => {
    const slidesPerView = Math.min(5, dataSubRubros.length);

    return (

        <>

            {(dataSubRubros || []).map((item: any, key: number) => (
                <SwiperSlide key={key} >
                    <CompSubCategorias item={item} key={key} setDataProducts={setDataProducts} />
                </SwiperSlide>
            ))}

        </>

    )
}

export default SwiperSubCategorias