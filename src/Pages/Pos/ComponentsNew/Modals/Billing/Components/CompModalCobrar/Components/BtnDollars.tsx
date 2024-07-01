import { FC } from 'react'
import { Button, ButtonGroup, Col, Row, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
interface Props {
    isactiveBtn: boolean
}
const BtnDollars: FC<Props> = ({ isactiveBtn }) => {
    return (
        <>
            {isactiveBtn && <Row>
                <Col className='mb-1'>
                    <ButtonGroup>
                        <Button>1</Button>
                        <Button>5</Button>
                        <Button>10</Button>
                        <Button>20</Button>
                        <Button>30</Button>
                        <UncontrolledButtonDropdown id="btnGroupDrop1">
                            <DropdownToggle color="primary" caret>
                                0.1
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem> 0.20 </DropdownItem>
                                <DropdownItem> 0.30 </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ButtonGroup>
                </Col>
            </Row>}
        </>
    )
}

export default BtnDollars