import { FC } from 'react'

interface ITestSwiper {
    item: any
    HandleSetSubGroup: any
}
const Categorias: FC<ITestSwiper> = ({ item, HandleSetSubGroup }) => {
    return (
        <div onClick={() => HandleSetSubGroup(item)}
            style={{ width: '', height: '75px', fontSize: '0.6rem', cursor: 'pointer', background: '#ffefbc', fontWeight: '200', borderRadius: '3px' }}
            className=' rounded-none d-flex justify-content-center align-items-center text-center categories-border'>
            <span className='text-uppercase'>{item.name_rubro}</span>
        </div>
    )
}

export default Categorias