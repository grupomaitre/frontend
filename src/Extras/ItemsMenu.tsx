import { FC } from 'react'
import { Link } from 'react-router-dom'
import './styles/itemsMenu.css'
interface Item {
    name: string,
    link: string,
    img: string
}
interface Props {
    items: Array<Item>
}

const ItemsMenu: FC<Props> = ({ items }) => {
    return (
        <>

            <div className='d-flex flex-wrap'>
                {items.map((item, key: number) => (
                    <Link className="btn  m-1 me-2 d-flex flex-column align-items-center justify-content-center item-border card-animate"
                        key={key}
                        to={`/${item.link}`}>
                        <img src={item.img}
                            width="60"
                            height="60"
                            alt={item.name} />
                        <span style={{fontWeight:'500'}} className='text-uppercase mt-2'> {item.name}</span>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default ItemsMenu