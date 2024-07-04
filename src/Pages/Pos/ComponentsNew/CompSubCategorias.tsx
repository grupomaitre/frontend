import React from 'react';
import { Button } from 'reactstrap';

interface IItem {
    id_sub_rubro: number;
    name_sub_rubro: string;
    products: Array<any>;
}

interface IProps {
    item: IItem;
    setDataProducts: (data: IItem) => void;
}

const CompSubCategorias: React.FC<IProps> = ({ item, setDataProducts }) => {
    return (
        <Button

            className='text-white border-light'
            style={{ height: '50px', background: '#ff16e2' }}
            block
            onClick={() => setDataProducts(item)}        >
            <span className='fs-14'>{item.name_sub_rubro}</span>
        </Button>
    );
};

export default CompSubCategorias;
