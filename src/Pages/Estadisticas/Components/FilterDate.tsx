import { FC, useRef, useState } from 'react'
import { Col, Input, Row } from 'reactstrap'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Calendar } from 'react-feather';
interface IProps {
    dateStart: any
    dateEnd: any
    setDateStart: any
    setDateEnd: any
}
const FilterDate: FC<IProps> = ({
    dateStart,
    dateEnd,
    setDateStart,
    setDateEnd
}) => {


    const itemsDate = [
        {
            name: 'Fecha desde',
            icon: Calendar,
            function: () => console.log("1"),
            onchange: (e: any) => setDateStart(e),
            style: '',
            value: dateStart,
        },
        {
            name: 'Fecha hasta',
            icon: Calendar,
            function: () => console.log('fecha hasta'),
            onchange: (e: any) => setDateEnd(e),
            style: '',
            value: dateEnd,
        }
    ]


    return (
        <Row className='mb-1'>

            {
                itemsDate.map((item: any, key: number) => (
                    <Col key={key}>
                        <div className="input-group ">
                            <span className="input-group-text " id="basic-addon1"><item.icon size={15} /></span>
                            <Flatpickr
                                value={item.value}
                                className="form-control shadow-sm   fs-13"
                                onChange={(date) => item.onchange(date[0].toISOString().split('T')[0])}
                                style={{ height: '30px' }}

                            />
                        </div>
                    </Col>
                ))
            }

        </Row>

    )
}

export default FilterDate