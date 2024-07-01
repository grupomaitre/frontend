import { FC } from 'react'
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
interface IProp {
    handleChange: (item: any) => void
}
const FilterFormaPago: FC<IProp> = ({ handleChange }) => {


    const colourOptions = [
        { value: 'Efectivo', label: 'Efectivo', color: '#f30000', isFixed: true },
        { value: 'Tarjeta', label: 'Tarjeta', color: '#0052CC' },
        { value: 'Cheque', label: 'Cheque', color: '#5243AA' },
        { value: 'Despósito', label: 'Despósito', color: '#FF5630' },
    ];

    return (
        <>
            <Row>
                <Col lg=''>
                    <Select
                        className='shadow-sm'
                        onChange={(e) => handleChange(e)}
                        defaultValue={[colourOptions[0], colourOptions[1]]}
                        isMulti
                        options={colourOptions}
                        styles={
                            {
                                control: (base: any) => ({
                                    ...base,
                                    height: '35px',
                                    minHeight: '35px',
                                    border: '1px solid #ced4da',
                                    fontSize: '13px',
                                }),
                                menu: (base: any) => ({
                                    ...base,
                                    borderRadius: 0,
                                    marginTop: 0,
                                }),
                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )
}

export default FilterFormaPago