import { FC } from 'react'
import { ModalHeader } from 'reactstrap'
interface IProps {
    textHeader?: string
    fs?: string
}
const HeaderModal: FC<IProps> = ({
    textHeader,
    fs
}) => {
    return (
        <ModalHeader
            className={'p-0 px-2'}
        >
            <span className={`fs-${fs || 12}`}>{textHeader || 'Titulo'}</span>
        </ModalHeader>
    )
}

export default HeaderModal