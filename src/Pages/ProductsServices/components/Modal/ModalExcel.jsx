import { useState } from 'react'
import * as XLSX from "xlsx";
import {
    Col,
    Row,
    ModalBody,
    Label,
    Input,
    Modal,
    ModalHeader,
    Button,

} from "reactstrap";
import Select from "react-select";
import TableExcel from '../TableExecel/TableExcel';
import ButtonSaveExcel from '../Buttons/ButtonSaveExcel'
import { useEffect, useRef } from 'react';
import { X } from 'react-feather';

const ModalExcel = (props) => {
    const { show, onCloseClick, data, isOptionsEmpresa, sucursal, bodega, caregorias, opSubCategorias, handleChangeCategoria } = props
    const [items, setItems] = useState([])
    const [idempresa, setIdEmpresa] = useState([])
    const [idsucursal, setIdSucursal] = useState([])
    const [idbodega, setIdBodega] = useState([])
    const [isIdSubRubro, setIsIdSubRubro] = useState(null)
    const [transaccion, setTransaccion] = useState([])
    //excel
    const inputRef = useRef(null);
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {

                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
    }
    const handleEmpresa = (e) => {
        setIdEmpresa(e.value)

    }

    const handleSucursal = (e) => {

        setIdSucursal(e.value)
    }

    const handleBodega = (e) => {
        setIdBodega(e.value)
    }
    const transaciones = [{
        label: "Inventario Inicial", value: "InventarioInicial"
    }]
    const handletransaciones = (e) => {
        setTransaccion(e.value)
    }
    const vaciarExcel = () => {
        const inputFile = document.getElementById('inputFile')
        inputFile.value = ''
        setItems([])
    }
    return (
        <Modal id="showModal" isOpen={show} toggle={onCloseClick} size="xl">
            <ModalHeader className=" p-3 border-bottom border-primary" toggle={onCloseClick}>
                Agregar Mercaderia
            </ModalHeader>

            <ModalBody>
                <Button color="success" outline className="btn-label   rounded btn-border mb-2">
                    <i className="mdi mdi-tray-arrow-down  label-icon align-middle fs-16 me-2"></i>
                    Excel de  Ejemplo
                </Button>
                <Row className="mb-3">

                    <Col lg={3}>
                        <Label
                            htmlFor="correo-field"
                            className="form-label"
                        >
                            Empresa
                        </Label>
                        <Select
                            options={isOptionsEmpresa}
                            onChange={handleEmpresa}
                        />
                    </Col>
                    <Col lg={3}>
                        <Label
                            htmlFor="correo-field"
                            className="form-label"
                        >
                            Sucursal
                        </Label>
                        <Select
                            options={sucursal}
                            onChange={handleSucursal}
                        />
                    </Col>
                    <Col lg={3}>
                        <div>
                            <Label
                                htmlFor="correo-field"
                                className="form-label"
                            >
                                Bodega
                            </Label>
                            <Select
                                options={bodega}
                                onChange={handleBodega}
                            />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div>
                            <Label
                                htmlFor="correo-field"
                                className="form-label"
                            >
                                Tipo de transacción
                            </Label>
                            <Select
                                options={transaciones}
                                onChange={handletransaciones}
                            />
                        </div>
                    </Col>

                </Row>
                <Row className="mb-3">
                    <Col  >
                        <Label className="form-label">Categorias</Label>
                        <Select
                            options={caregorias}
                            onChange={(e) => handleChangeCategoria(e)}

                        />
                    </Col>

                    <Col  >
                        <Label className="form-label">Sub Categorias</Label>
                        <Select
                            options={opSubCategorias}
                            onChange={(e) => setIsIdSubRubro(e.value)}
                        />
                    </Col>
                </Row>
                <Row className='my-4'>

                    <Col lg={6} className='my-2'>
                        <div className="input-group">
                            <Input
                                accept=".xlsx"
                                className="form-control"
                                type="file" id="inputFile"
                                ref={inputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    readExcel(file);
                                }}
                            />
                            <Button
                                outline
                                color='danger'
                                type="Button" id="inputGroupFileAddon04"
                                onClick={() => vaciarExcel()}
                            >

                                <X
                                    className='text-danger'
                                    size={15}
                                />
                            </Button>
                        </div>
                    </Col>
                    <Col className='3' lg={6}>
                        <ButtonSaveExcel
                            items={items}
                            isIdSubRubro={isIdSubRubro}
                        />
                    </Col>
                </Row>

                <Row>
                    <TableExcel

                        items={items}
                        show={onCloseClick}

                    />
                </Row>
            </ModalBody>

        </Modal>
    )
}

export default ModalExcel