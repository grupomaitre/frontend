import React from 'react'

const ContenidoTd = ({ item }) => {
    return (
        <td>
            {item.code}
            {item.producto}
            {item.category}
            {item.subCategory}
        </td>

    )
}

export default ContenidoTd