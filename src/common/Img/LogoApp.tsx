import { FC } from 'react'
interface IProps {
    urlImg: string
    width?: string
    height?: string
}

const LogoApp: FC<IProps> = ({ width, urlImg, height }) => {
    return (
        <div className={'d-flex justify-content-center'}>
            <img src={urlImg} style={{ width: width || '220px', height: height || '100px' }} />
        </div>
    )
}

export default LogoApp

