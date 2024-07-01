import { Label } from 'reactstrap'
import { FC } from 'react';
import LogoSm from '../common/Img/LogoSm';
import ButtonSalir from '../common/Button/ButtonSalir';

interface Props {
    link: string
    handleSalir?: any
}
const Header: FC<Props> = ({ link }) => {
    const data = JSON.parse(sessionStorage.getItem('authUser') || '{}')
    return (
        <div className='d-flex justify-content-between gap-3  align-items-center bg-orange py-1   px-3 text-white'

        >
            <div className='d-flex justify-content-start '>
                <LogoSm
                    width='100px'
                    height='40px'
                />
                <div>
                    <Label className='fs-12'>Gmma ( {data.company || null} )</Label>
                </div>
                <div>
                    <Label className='fs-12'>{data?.ruc || null}</Label>
                </div>
            </div>
            <ButtonSalir
                link={link}
                text=""
            />
        </div >
    )
}

export default Header