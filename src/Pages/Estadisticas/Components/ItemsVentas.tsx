import { FC } from 'react'
import { Input, Label } from 'reactstrap'
interface IProps {
    ventas: any
    start: number
    end: number
}
const ItemsVentas: FC<IProps> = ({ ventas, start, end }) => {
    return (
        <>

            {ventas.slice(start, end).map((item: any, key: number) => (
                <div
                    key={key}
                    className="form-check  form-radio-outline form-radio-primary">
                    <Input
                        className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <Label className="form-check-label  fs-10 lh-sm pb-0 mb-0" for="flexRadioDefault1">
                        {item.name}
                    </Label>
                </div>
            ))}

        </>

    )
}

export default ItemsVentas