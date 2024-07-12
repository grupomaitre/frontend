import { FC } from 'react'
import SwiperGroups from '../../ComponentsNew/Swipers/SwiperGroups'


interface IGroupsProps {
    HandleSetSubGroup: any
    setDataSubGroup: any
    grupos: any
}

const Groups: FC<IGroupsProps> = ({ HandleSetSubGroup, grupos }) => {
    return (
        <>
            {grupos.length === 0
                ? <div className='text-info w-100 py-3 h4 text-center border'>Sin registros</div>
                : <SwiperGroups
                    dataCategorias={grupos || []}
                    HandleSetSubGroup={HandleSetSubGroup || []}
                    idMesa={null}
                />
            }
        </>
    )
}

export default Groups