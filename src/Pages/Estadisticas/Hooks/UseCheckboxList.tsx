import { FC } from 'react'
import { Input, Label } from 'reactstrap'
interface IProps {
    listCheck: any[]
    classDiv?: string
}
const UseCheckboxList: FC<IProps> = ({ listCheck, classDiv }) => {

    return (
        <>
            {(listCheck || []).map((item: any, key) => (
                <div className={classDiv + " form-check "} key={key}>
                    <Input
                        className="form-check-input"
                        type="checkbox"
                        name={item?.value}
                        id={item?.label || '1'}
                        onChange={(e) => item?.function(e, item?.checked)}
                        checked={item?.checked}
                    />
                    <Label className="form-check-label" for={item?.label || '1'}>
                        {item?.label || ''}
                    </Label>
                </div>
            ))}
        </>
    )
}

export default UseCheckboxList 