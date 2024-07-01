import { FC } from 'react'
import logoSm from './logo-sm.png'

interface IProps {
    width?: string
    height?: string
}

const LogoSm: FC<IProps> = ({ width, height }) => {
    return (
        <div className={'d-flex justify-content-center'}>
            <img src={logoSm} style={{ width: width || '100px', height: height || '50px' }} />
        </div>
    )
}

export default LogoSm

