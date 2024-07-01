import { useEffect, useState } from "react"
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap"
import { enlacesOp, typeAmtOP } from "./Helpers/ListDocs"
import SelectGeneric from "../../../common/Select/SelectGeneric"
import { ToastContainer } from "react-toastify"
import UseFormDocs from "./Hooks/UseFormDocs"
import SelectCommon from "../../Pos/common/SelectCommon"
import { useTipoDocs } from "./Hooks/useDocsType"

const Docs = () => {
    const [testop, setTestOp] = useState<any>([])
    const [enlace, setEnlace] = useState<any>()
    const [ambiente, setAmbiente] = useState<any>()
    const [typeDoc, setTypeDoc] = useState<any>()
    const { data: tipoDocs, isLoading } = useTipoDocs()
    useEffect(() => {
        if (tipoDocs) {
            const mappedDocs = tipoDocs.map((item: any) => ({
                label: item?.nombre || '',
                value: item?.id_tipo_documento
            }));
            setTestOp(mappedDocs);
        }
    }, [tipoDocs]);

    //console.log(testop[0])
    //    console.log(parseInt(typeDoc))
    return (
        <>
            <Card>
                <CardBody>

                    <Row className="fs-12">
                        <Col lg='12'>
                            <UseFormDocs />
                        </Col>
                        <Col lg='6'>
                            <Row className="mb-1">
                                <Col lg='4'>
                                    <Label className=" text-capitalize">Tipo de Ambiente:</Label>
                                </Col>
                                <Col lg='8'>
                                    <SelectCommon
                                        value={ambiente}
                                        options={typeAmtOP}
                                        setSelectedOption={setAmbiente}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col lg='4'>
                                    <Label className=" text-capitalize">Validez:</Label>
                                </Col>
                                <Col lg='8'>
                                    <Input type="date"
                                        bsSize="sm"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col lg='4'>
                                    <Label className=" text-capitalize">Tipo Documento:</Label>
                                </Col>
                                <Col lg='8'>
                                    <div>
                                        {isLoading ? (
                                            <div>cargando...</div>
                                        ) : (
                                            <SelectGeneric
                                                optionSelect={setTypeDoc}
                                                options={testop}
                                                btnClear={false}

                                            />
                                        )}
                                    </div>
                                </Col>

                            </Row>
                            <Row className="mb-1">
                                <Col lg='4'>
                                    <Label className=" text-capitalize">Enlazar con:</Label>
                                </Col>
                                <Col lg='8'>

                                    <SelectGeneric
                                        btnClear={false}
                                        options={enlacesOp}
                                        optionSelect={setEnlace}
                                    />

                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col lg='4'>
                                    <Label className=" text-capitalize">Observacion:</Label>
                                </Col>
                                <Col lg=''>
                                    <Input type="textarea"
                                        bsSize="sm"
                                    />
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                </CardBody>
            </Card>
            <ToastContainer />
        </>
    )
}

export default Docs