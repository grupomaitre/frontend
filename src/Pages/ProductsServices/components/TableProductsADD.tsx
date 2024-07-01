import { FC } from 'react'
import { Button, Table } from 'reactstrap'
import { Trash2 } from 'react-feather'
import ButtonSaveProductSer from './ButtonSaveProductSer'
import { INewItem } from './interfaces/InterFormItems'
interface ITableProductsADD {
    value: any
    handledeleteItem: (index: number) => void
    columns: any
}
const TableProductsADD: FC<ITableProductsADD> = ({ value, handledeleteItem, columns }) => {
    return (
        <>
            <div className='table-responsive '>
                <Table className="table-bordered">
                    <thead className='table-light'>
                        <tr>
                            {
                                columns.map((items: any, key: number) => (
                                    <th key={key} className={items.style}>
                                        {items.name}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody >
                        {value.length ?
                            value.map((input: INewItem, key: number) => (

                                <tr key={key} className='custom-table '>
                                    <th scope="row" className="product-id">
                                        {input.code}
                                    </th>
                                    <td className="text-start" >
                                        <div>
                                            <span>
                                                {input.producto}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {input.category}

                                    </td>
                                    <td>
                                        {input.subCategory}

                                    </td>
                                    <td className='text-center'>
                                        <img src={input.imagen} className='avatar-sm rounded-circle bg-light' />
                                    </td>
                                    <td>
                                        <span>${input.price}</span>
                                    </td>
                                    <td>
                                        <span>${input.cantidad}</span>
                                    </td>
                                    <td>
                                        <span>{input.bodegas}</span>
                                    </td>
                                    <td className='text-center'>
                                        <Button outline size='sm' color='danger' onClick={() => handledeleteItem(key)} >
                                            <Trash2 />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            : null}
                    </tbody>
                </Table>
            </div>
            <ButtonSaveProductSer items={value} />
        </>
    )
}

export default TableProductsADD 
