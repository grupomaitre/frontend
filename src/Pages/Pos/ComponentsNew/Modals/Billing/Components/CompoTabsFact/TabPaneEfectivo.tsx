import { FC } from 'react'
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
interface Props {
    onKeyPress: any
    handleDelete: any
}
export const TabPaneEfectivo: FC<Props> = ({ onKeyPress, handleDelete }) => {

    return (

        <>

            <NumericKeyboard
                handleDelete={() => handleDelete()}
                onKeyPress={(e) => onKeyPress(e)}
                btnClass={'cursor-pointer keyBoard rounded'}
                widthKey='70px'
                heightKey='70px'
                fontSizeKey='1.55rem'
                heightBtnDelete='70px'
                fondoKey='#e6ecec'
                colorKeys='#13284e'
                widthBorrar='70px'
                gridColumn='span 1'
                sizeBorrar={'0.9rem'}
                bgDelete={'#e6ecec'}
                colorDelete={'#13284e'}
                keyboards={[
                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'
                ]}
            />

        </>
    )
}
