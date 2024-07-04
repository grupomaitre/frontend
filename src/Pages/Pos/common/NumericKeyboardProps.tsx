import { FC } from 'react';
import { Button } from 'reactstrap';
interface NumericKeyboardProps {
    onKeyPress: (value: number | string) => void;
    handleDelete: () => void;
    keyboards?: Array<number | string>
    //style keys
    gridTemplateColumns?: string
    widthKey?: string
    heightKey?: string
    heightBtnDelete?: string
    fontSizeKey?: string
    fondoKey?: any
    colorKeys?: any
    widthBorrar?: any
    gridColumn?: any
    sizeBorrar?: any
    bgDelete?: any,
    colorDelete?: any
    showDelete?: any
    btnClass?: any
}
const NumericKeyboard: FC<NumericKeyboardProps> = ({
    onKeyPress,
    handleDelete,
    keyboards,
    heightKey,
    heightBtnDelete,
    fontSizeKey,
    gridTemplateColumns,
    widthKey,
    fondoKey,
    colorKeys,
    widthBorrar,
    gridColumn,
    sizeBorrar,
    bgDelete,
    colorDelete,
    showDelete,
    btnClass
}) => {
    const handleKeyPress = (value: number | string) => {
        onKeyPress(value);

    };
    const listNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (
        <>
            <div className="numeric-keyboard" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridTemplateColumns || 3}, 1fr)`,
                gridTemplateRows: 'repeat(1,2fr)',
                gap: '5px'
            }}>
                {(keyboards || listNumbers).map((number) => (
                    <Button
                        type='button'
                        color='light'
                        style={{
                            width: widthKey,
                            height: heightKey || '71px',
                            border: '1px solid #ccc',
                            borderRadius: '1px',
                            color: colorKeys || "#000",
                            fontSize: fontSizeKey || '1.5rem',
                        }}
                        key={number}
                        className={btnClass}
                        onClick={() => handleKeyPress(number)}>
                        <span >{number}</span>
                    </Button>
                ))}


                {!showDelete &&
                    <Button
                        block
                        color='danger'
                        onClick={() => handleDelete()}
                        className='shadow rounded fs-6'
                        style={{
                            fontSize: sizeBorrar || '10px',
                            gridColumn: gridColumn || 'span 2',
                            height: heightBtnDelete || '71px',
                            margin: '2px', borderRadius: '2px',
                            //  background: bgDelete || 'red',
                            width: widthBorrar || '',
                            color: colorDelete || '#fff'
                        }}
                    >Borrar</Button>}

            </div >
        </>
    );
};


export default NumericKeyboard;
