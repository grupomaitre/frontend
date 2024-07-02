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

            outline
            color='warning'
            className='text-black'
            style={{ height: '50px' }}
            block
            onClick={() => setDataProducts(item)}        >
            <span className='fs-12'>{item.name_sub_rubro}</span>
        </Button>
    );
};

export default CompSubCategorias;
