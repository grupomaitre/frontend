import { FC } from 'react'
import { FileText, LogOut, PieChart, Play, Printer, Trash } from 'react-feather'
import { Button, Col } from 'reactstrap'
interface IProps {
    handleReporte: () => void
    handleClear: () => void
    handleExcel: () => void
   // setShowGrafic: () => void
}
const BtnFunciones: FC<IProps> = ({ handleReporte, handleClear, handleExcel, /* setShowGrafic */ }) => {
    const btns = [
        {
            name: 'Ejecutar',
            color: 'light',
            icon: Play,
            color_icon: 'primary',
            function: () => handleReporte()
        },
        {
            name: 'Excel',
            color: 'light',
            icon: FileText,
            color_icon: 'success',
            function: () => handleExcel()
        },
        {
            name: 'Graficos',
            color: 'light',
            icon: PieChart,
            color_icon: 'info',
            function: () => console.log('first')
        },
        {
            name: 'Imprimir',
            color: 'light',
            icon: Printer,
            color_icon: 'warning',
            function: () => console.log('imprimir')
        },
        {
            name: 'Salir',
            color: 'light',
            icon: LogOut,
            color_icon: 'danger',
            function: () => console.log('salir')

        },
        {
            name: 'Limpiar',
            color: 'light',
            icon: Trash,
            color_icon: 'danger',
            function: () => handleClear()
        }

    ]

    return (
        <Col style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 3fr)', gap: '5px'
        }}>
            {
                btns.map((item: any, key: number) => (
                    <Button
                        onClick={() => item.function()}
                        key={key}
                        block
                        color={item.color}
                        className=' rounded-0   border d-flex flex-column justify-content-center align-items-center'>
                        <span className=' fs-12' >{item.name}  </span>

                        <item.icon
                            size={25}
                            className={'fs-4 ' + `text-${item.color_icon}`} />

                    </Button>
                ))






            }
        </Col>
    )
}

export default BtnFunciones