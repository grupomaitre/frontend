import React, { useState, useEffect, useMemo } from 'react';
import { Input, Row, Col } from 'reactstrap';
import DataTable from 'react-data-table-component';
function Datatabletest({ data, columns }) {

    const [filteredData, setFilteredData] = useState(data ?? []);

    const handleFilter = (e) => {
        const filtered = data.filter((item) => {
            if (item.name) {
                return item.name.toLowerCase().includes(value);
            }
            return false;
        });
        setFilteredData(filtered);
    };

    return (
        <>
            <Row >
                <Col lg={4}>
                    <Input type="text" onChange={handleFilter} placeholder='Buscar' />
                </Col >
            </Row>
            <Row>
                {data.length > 0 ?
                    < DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                    /> : <span className='py-3 text-center fs-1 text-muted'>Sin registros</span>}
            </Row>
        </>
    );
}
export { Datatabletest };