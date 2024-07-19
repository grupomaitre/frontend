import { Fragment } from 'react'
export const InfoMesas = () => {
    const items = [
        { id: 1, name: 'Libre', color: 'bg-white' },
        { id: 2, name: 'Precuenta', color: 'bgPrecuenta' },
        { id: 3, name: 'Reservada', color: 'bg-warning' },
        { id: 4, name: 'Abierta', color: '#33ff00' },
        { id: 5, name: 'Cobrar', color: 'bg-danger' }

    ]
    return (
        <div className='d-flex flex-row  justify-content-around align-items-center rounded-0' style={{ background: '#07709d', userSelect: 'none' }} >
            {
                items.map((item, key) => (

                    <Fragment key={key}>
                        <div className={item.color} style={{ width: '7px', height: '7px', borderRadius: '10px', marginLeft: '1px', background: item.color }}>
                        </div>
                        <span className='text-white py-1 fs-11' style={{ fontSize: '11px' }}> {item.name}</span>

                    </Fragment>
                ))
            }

        </div>
    )
}
