

import { FC, useEffect } from 'react';
import Select from 'react-select';
interface IProps {
    value?: any
    setSelectedOption?: any
    isClearable?: boolean
    options: any
    fontSize?: string
    height?: string

}
const SelectCommon: FC<IProps> = ({
    value,
    setSelectedOption,
    isClearable,
    options,
    fontSize,
    height

}) => {
    useEffect(() => {
        setSelectedOption(options[0])
    }, [options])
    return (
        <div>
            <Select
                value={value}
                onChange={(value) => setSelectedOption(value)}
                options={options}
                className='text-black'
                isClearable={isClearable}
                placeholder={''}
                styles={
                    {
                        control: (base: any) => ({
                            ...base,
                            height: height || '30px',
                            minHeight: '30px',
                            fontSize: fontSize || '11px',
                        }),


                    }
                }
            />

        </div>
    );
};

export default SelectCommon;
