
const useColumnsDocs = () => {
    const columns = [
        {
            Header: 'Documento',
            accessor: 'nombre',
        },
        {
            Header: 'Secuencial',
            accessor: 'secuencial',
        },
        {
            Header: 'Tipo de documento',
            accessor: 'tipo_documento.nombre',
        }
    ]
    return columns
}

export default useColumnsDocs