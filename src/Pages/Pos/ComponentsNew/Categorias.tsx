import { FC } from 'react'
import '../css/categorias.css'
interface ITestSwiper {
    item: any
    HandleSetSubGroup: any
}
const Categorias: FC<ITestSwiper> = ({ item, HandleSetSubGroup }) => {
    return (
        <div onClick={() => HandleSetSubGroup(item)}
            className='mx-1 rounded shadow-lg  d-flex justify-content-center align-items-center text-center items-categorias'
        >
            <span className='text-uppercase text-white'>{item.name_rubro}</span>
        </div>
    )
}

export default Categorias