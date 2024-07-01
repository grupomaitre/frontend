import { FC } from 'react'
interface Props {
    text?: string
}
const HeaderTest: FC<Props> = ({ text }) => {
    return (
        <div className='bg-dark text-insfo fs-5 text-center rounded-0 border-0' style={{ color: '#00cccc' }}>{text || null}</div>
    )
}

export default HeaderTest