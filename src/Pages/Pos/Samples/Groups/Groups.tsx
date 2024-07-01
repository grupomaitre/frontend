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
            {grupos
                ? <SwiperGroups
                    dataCategorias={grupos || []}
                    HandleSetSubGroup={HandleSetSubGroup || []}
                    idMesa={null}
                /> :
                <><div>Sin registros</div></>}
        </>
    )
}

export default Groups