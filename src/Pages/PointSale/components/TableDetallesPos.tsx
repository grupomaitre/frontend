import { useSelector } from 'react-redux';
import { Button, Table } from 'reactstrap'

const TableDetallesPos = () => {
    const cart = useSelector((state: any) => state.pointSaleSlice.cart)

    const calculateTotal = (items: any) => {
        return items.reduce((acc: any, item: any) => {
            const totalWithIva = item.precio * item.cantidad;
            return acc + (totalWithIva * item.iva);
        }, 0);
    };

    const calculateSubtotal = (items: any) => {
        return items.reduce((acc: any, el: any) => acc + ((el.precio) * (el.cantidad)), 0)
    }
    const subTotal: number = calculateSubtotal(cart)
    const totalAmount: number = calculateTotal(cart)
    return (
        <Table className='table table-sm table-success' bordered striped>
            <tbody>
                <tr>
                    <th>Sub Final</th>
                    <td>{(subTotal).toFixed(2) || 0}</td>


                </tr>
                <tr>
                    <th>Desc</th>
                    <td>0.00    <Button size='sm' className='float-end border fs-11' color='success'>%</Button></td>

                </tr>
                <tr>
                    <th>
                        B.I IVA 15%
                    </th>
                    <td>{(subTotal).toFixed(2) || 0}</td>

                </tr>
                <tr>

                    <th>B.I.0%</th>
                    <td> 0.00  </td>


                </tr>
                <tr>

                    <th>IVA 15%</th>
                    <td>{(totalAmount - subTotal).toFixed(2)}</td>
                </tr>
                <tr>

                    <th>IVA 0%</th>
                    <td>0.00</td>

                </tr>
                <tr>
                    <th>Flete</th>
                    <td>0.00</td>


                    {/* 
                    <td colSpan={2} className=' text-center fs-2 bg-black text-danger'>
                        <span>Total 14894.78</span>
                    </td> */}
                </tr>
                <tr>
                    <th>ICE</th>
                    <td>0.00</td>

                </tr>
            </tbody>
            <tfoot>
                <tr className=''>

                </tr>
            </tfoot>
        </Table>
    )
}

export default TableDetallesPos