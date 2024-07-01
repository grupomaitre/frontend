import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Navigation, Pagination } from 'swiper/modules';
import Categorias from '../Categorias'
interface ITestSwiper {
    dataCategorias: Array<any>
    HandleSetSubGroup: any
    idMesa: number | null
}

const SwiperGroups: FC<ITestSwiper> = ({ dataCategorias, HandleSetSubGroup }) => {
    const slidesPerView = Math.min(10, dataCategorias.length)
    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={7}
                modules={[Pagination, Navigation]}
            >
                {
                    dataCategorias.map((item, key) => (
                        <SwiperSlide key={key} >
                            <Categorias
                                item={item}
                                HandleSetSubGroup={HandleSetSubGroup}
                            />
                        </SwiperSlide>

                    ))
                }

            </Swiper >
        </>
    )
}

export default SwiperGroups