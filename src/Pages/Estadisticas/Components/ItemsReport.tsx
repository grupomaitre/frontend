import { FC, useEffect } from 'react'
import { Col, Input, Label } from 'reactstrap'
interface IProps {
    reporte: any
    ChangeItemReport: any
}
const ItemsReport: FC<IProps> = ({ reporte, ChangeItemReport }) => {

    useEffect(() => {
        ChangeItemReport(reporte[0])
    }, [])

    return (
        <>
            {/*  <Col className='d-flex justify-content-between' lg='2' md='2' sm='2'> */}
            {
                reporte.map((item: any, key: number) => (
                    <div
                        key={key}
                        className="
                          form-check
                           mb-2 ">
                        <Input
                            onClick={() => ChangeItemReport(item)}
                            className="form-check-input"
                            type="radio"
                            defaultChecked={key === 0}
                            name="flexRadioDefault"
                            id="flexRadioDefault1" />
                        <Label className="form-check-label text-black fs-12" for="flexRadioDefault1">
                            {item.name}
                        </Label>
                    </div>
                ))}

            {/*   </Col> */}
        </>
    )
}

export default ItemsReport