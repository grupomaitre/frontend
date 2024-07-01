import React, { FC, useEffect } from 'react'
import Select from 'react-select'
interface IComponent {
    ventas: any
    setOnColumns?: any
    setUrl?: any
    setValueSelect: any
}
const CompVentas: FC<IComponent> = ({ ventas, setOnColumns, setUrl, setValueSelect }) => {
    const [selectedOption, setSelectedOption] = React.useState<any>(null);
    useEffect(() => {
        setSelectedOption(ventas.map((item: any) => ({ value: item.id, label: item.name, columnas: item.column, url: item.url })))
    }, [ventas])
    const handleChange = (selectedOption: any) => {
        setValueSelect(selectedOption.value)
        setOnColumns(selectedOption.columnas)
        setUrl(selectedOption.url)
    }
    return (
        <>

            <Select
                placeholder='Seleccione una opcion '
                className='shadow-sm mb-1'
                options={selectedOption}
                onChange={(e: any) => handleChange(e)}
                styles={
                    {
                        control: (base: any) => ({
                            ...base,
                            height: '35px',
                            minHeight: '35px',
                            border: '1px solid #ced4da',
                            fontSize: '12px',
                        }),
                        menu: (base: any) => ({
                            ...base,
                            borderRadius: 0,
                            marginTop: 0,
                        }),
                    }
                }
            />

        </>
    )
}

export default CompVentas