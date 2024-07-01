import React from 'react';

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
        <div
            onClick={() => setDataProducts(item)}
            className=' rounded-none d-flex justify-content-center align-items-center shadow-sm text-uppercase py-3 subcategories-border mx-1 text-center border-icons'
            style={{ background: '#fff', height: '50px', cursor: 'pointer', borderRadius: '4px' }}
        >
            <span className='fs-10'>{item.name_sub_rubro}</span>
        </div>
    );
};

export default CompSubCategorias;
