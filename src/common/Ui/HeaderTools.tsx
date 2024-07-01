import { useState, FC } from 'react'
import { ChevronDown } from 'react-feather'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap'
interface IProps {
    itemTools: any
    classToggle?: string
}
const HeaderTools: FC<IProps> = ({
    itemTools, classToggle
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(Array(itemTools.length || 2).fill(false)); // Inicializa el estado para dos menús
    const dropdownData = [
        {
            title: 'Edición', subItems: [

                { text: 'Salir', onClick: () => console.log('Limpiar') }
            ]
        },
    ];

    const toggleDropdown = (index: any) => {
        const newDropdownOpen = [...dropdownOpen];
        newDropdownOpen[index] = !newDropdownOpen[index];
        setDropdownOpen(newDropdownOpen);
    };

    return (
        <>
            <Nav >
                {(itemTools || dropdownData).map((menu: any, index: number) => (
                    <Dropdown
                        key={index}
                        nav
                        isOpen={dropdownOpen[index]}
                        toggle={() => toggleDropdown(index)}
                    >
                        <DropdownToggle nav className={'text-black fs-14 rounded-0 ' + classToggle} color='light'>
                            {menu.title}  <ChevronDown size={15} />
                        </DropdownToggle>
                        <DropdownMenu className='mt-2 fs-13'>
                            {menu.subItems.map((item: any, subIndex: number) => (
                                item.type === "button" ?
                                    <button key={subIndex} className='fs-13 border-0 ms-2 fw-light' style={{ background: 'transparent' }} type='submit'>
                                        <DropdownItem >
                                            {item.text}
                                        </DropdownItem>
                                    </button>
                                    : < DropdownItem key={subIndex}
                                        onClick={item.onClick} >

                                        {item.text}
                                    </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                ))}
            </Nav>

        </>
    )
}

export default HeaderTools