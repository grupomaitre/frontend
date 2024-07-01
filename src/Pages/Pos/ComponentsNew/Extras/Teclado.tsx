import { FC } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
interface IProps {
    handleCantidadInput: () => void
    total: number
    getMesa: () => void
    cart: any
    orden: any
    id_mesa: any
    pax: any
    onChangeInputCantidad: (item: any) => void
}



const Teclado: FC<IProps> = ({ handleCantidadInput, /* getMesa, cart, orden, id_mesa, pax, */ onChangeInputCantidad }) => {

    /*     const handleKeyPress = (key: any) => {
            // Agrega la tecla presionada al input activo
            const activeInput = document.activeElement
            activeInput.value += key
            console.log(activeInput)
        } */
    const handleKeyPress = (key: any) => {
        // Agrega la tecla presionada al input activo
        const activeInput = document.activeElement as HTMLInputElement;
        if (activeInput && activeInput instanceof HTMLInputElement) {
            activeInput.value += key;
            console.log(activeInput);
        }
    };
  /*   const tecladoItems = [

        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '0' },
    ] */
    const KeysBoards = [
        { key: "1", type: "number" },
        { key: "2", type: "number" },
        { key: "3", type: "number" },
        { key: "4", type: "number" },
        { key: "5", type: "number" },
        { key: "6", type: "number" },
        { key: "7", type: "number" },
        { key: "8", type: "number" },
        { key: "9", type: "number" },
        { key: "0", type: "number" },
    ];
    const captureKeys = (item: any) => {
        onChangeInputCantidad(item.key)
    };
    return (


        <>

            <div className='d-flex justify-content-center mt-1'>
                <div>
                    <div className='d-flex'>
                        {KeysBoards.slice(0, 3).map((item, key) => (
                            <div key={key} className='rounded'>
                                <Button
                                    onClick={() =>
                                        handleKeyPress(item)
                                    }
                                    style={{ width: '50px' }}
                                    color='light'

                                    className="py-1 px-3 mx-1 border-1  rounded text-dark"
                                >
                                    <span className="fs-2 fw-medium">
                                        {item.key}
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex">
                        {KeysBoards.slice(3, 6).map((item, key) => (
                            <div key={key} className='rounded my-1'>
                                <Button
                                    onClick={() =>
                                        captureKeys(item)
                                    }
                                    style={{ width: '50px' }}
                                    color='light'
                                    className="py-1 px-3 mx-1 border-1  rounded text-dark"
                                >
                                    <span className="fs-2 fw-medium">
                                        {item.key}
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex mb-1">
                        {KeysBoards.slice(6, 9).map((item, key) => (
                            <div key={key} className='rounded'>
                                <Button
                                    onClick={() =>
                                        captureKeys(item)
                                    }
                                    style={{ width: '50px' }}
                                    color='light'
                                    className="py-1 px-3 mx-1 border-1  rounded text-dark"
                                >
                                    <span className="fs-2 fw-medium">
                                        {item.key}
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className='d-flex'>
                        <div className=' rounded'>
                            <Button
                                onClick={() =>
                                    captureKeys(KeysBoards[9])
                                }
                                style={{ width: '50px', height: '100%' }}
                                color='light'
                                className="py-1 px-3 mx-1 border-1  rounded text-dark"
                            >
                                <span className="fs-4 fw-medium">
                                    {KeysBoards[9].key}
                                </span>
                            </Button>
                        </div>
                        <div>
                            <Button
                                style={{ width: '113px' }}
                                color='danger'
                                className="py-3 px-3 border-1 shadow-lg rounded border"
                            >
                                <span className="fs-4 ">
                                    Borrar
                                </span>
                            </Button>
                        </div>
                    </div>

                </div>
                <ButtonGroup vertical className='ms-1 '>
                    <Button
                        onClick={handleCantidadInput}
                        color="light"
                        className=""
                        style={{ width: "65px" }}
                    >
                        <span className="fw-medium fs-5">Enter</span>
                    </Button>
                {/*     <BtnBilling
                        getMesa={getMesa}
                        cart={cart}
                        orden={orden}
                        id_mesa={id_mesa}
                        pax={pax}
                    /> */}
                </ButtonGroup>

            </div>
        </>
    )
}

export default Teclado
