import { FC } from 'react'
import { Input, Label } from 'reactstrap'
interface IProps {
    list: any
    handleToggleField: (item: any) => void
}
const UseCheckBoxs: FC<IProps> = ({ list, handleToggleField }) => {

    return (
        <>
            {
                (list || []).map((item: any, key: number) => (
                    <div className="form-check mb-2" key={key}>
                        <Input className="form-check-input" type={item?.type} id={item?.id}
                            onClick={() => handleToggleField(item.label)}
                        />
                        <Label className="form-check-label" for={item?.id}>
                            {item?.label || ''}
                        </Label>
                    </div>
                ))
            }
        </>
    )
}

export default UseCheckBoxs