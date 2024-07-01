import { FC } from 'react'
import { Button } from 'reactstrap'
import { Trash2 } from 'react-feather'
interface IBtnTrashCart {
    handleRemove: Function
}
const BtnTrashCart: FC<IBtnTrashCart> = ({ handleRemove }) => {
    return (
        <Button
            size='lg'
            color='danger' className='float-end' onClick={() => handleRemove()}>

            <Trash2 />
        </Button>
    )
}

export default BtnTrashCart