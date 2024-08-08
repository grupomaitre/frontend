import { useState } from 'react'
import { Card, CardBody, Col, Container, Row, TabContent, TabPane } from 'reactstrap'
import NavsConfig from '../Navs/NavsConfig';
import ItemsContentConfig from '../TabContent/ItemsContentConfig';
import HeaderTools from '../../../../common/Ui/HeaderTools';

const TabConfig = () => {
    // Pills Justified Tabs
    const [justifyPillsTab, setjustifyPillsTab] = useState("1");
    const [dataForm, setDataForm] = useState()
    const justifyPillsToggle = (tab: any) => {

        if (justifyPillsTab !== tab) {
            setjustifyPillsTab(tab);
        }

    };
    const handleSave = () => {

        switch (justifyPillsTab) {
            case "1":
                console.log("Seleccionaste la opción 1");
                break;
            case "2":
                console.log("Seleccionaste la opción 2");
                break;
            case "3":
                console.log("Seleccionaste la opción 3");
                break;
            case "4":
                console.log("Seleccionaste la opción 4");
                console.log(dataForm)
                break;
            default:
                console.log("Opción no válida");
                break;
        }

    }
    const dropdownData = [
        {
            title: 'Edición',
            subItems: [

                { text: 'Ingresar Clave de Administrador', onClick: () => console.log('Limpiar') },
                { text: 'Actualizar Configuración', onClick: () => handleSave() },
                { text: 'Salir', onClick: () => console.log('Limpiar') },
            ]
        },
    ];
    return (
        <Container fluid>
            <Card>
                <HeaderTools
                    itemTools={dropdownData}
                />
            </Card>
            <Row>

                <Col xxl={12}>
                    <Card>
                        <CardBody className=''>

                            <NavsConfig
                                justifyPillsTab={justifyPillsTab}
                                justifyPillsToggle={justifyPillsToggle}
                            />
                            <ItemsContentConfig
                                justifyPillsTab={justifyPillsTab}
                                setDataForm={setDataForm}
                            />

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default TabConfig