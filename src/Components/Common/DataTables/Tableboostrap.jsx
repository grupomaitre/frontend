import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function DataTable(props) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await axios.get('api/list-personal');
        const json = await response.data;
        setData(json);
    }

    function handlePageClick(event) {
        setCurrentPage(Number(event.target.id));
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const renderHeaders = () => {
        return (
            <thead>
                <tr>
                    {props.columns.map((column) => (
                        <th key={column.key}>{column.name}</th>
                    ))}
                </tr>
            </thead>
        );
    };

    const renderBody = () => {
        return (
            <tbody>
                {currentItems.map((item, index) => (

                    <tr key={index}>
                        {props.columns.map((column) => (
                            <td key={column.key}>{item.name}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            pageNumbers.push(
                <PaginationItem key={i} active={i === currentPage}>
                    <PaginationLink id={i} onClick={handlePageClick}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <div className="d-flex justify-content-center mt-4">
                <Pagination>
                    <PaginationItem disabled={currentPage <= 1}>
                        <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
                    </PaginationItem>
                    {pageNumbers}
                    <PaginationItem disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}>
                        <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
                    </PaginationItem>
                </Pagination>
            </div>
        );
    };

    return (
        <>
            <Table striped bordered hover>
                {renderHeaders()}
                {renderBody()}
            </Table>
            {renderPagination()}
        </>
    );
}

export default DataTable;
