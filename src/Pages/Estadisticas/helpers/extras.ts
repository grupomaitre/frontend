export const reporte = [
    {
        id: 1, name: 'Ventas', value: 1,
        subItems: [
            {
                id: 1,
                name: 'Ventas Netas',
                url: 'v1/list/ventas/netas',
                value: 1,
                column: [
                    {
                        Header: 'Tipo Comprobante',
                        accessor: 'documento',
                    },
                    {
                        Header: 'Ice',
                        accessor: 'cantidad',
                    },
                    {
                        Header: 'Sub total',
                        accessor: 'sub_total',
                    },
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    {
                        Header: 'BI_NC',
                        accessor: 'BI_NC',
                    },
                    {
                        Header: 'Sub final',
                        accessor: 'sub_final',
                    },
                    {
                        Header: 'IVA',
                        accessor: 's_iva',
                    },
                    {
                        Header: 'IVA_NC',
                        accessor: 'IVA_NC',
                    },
                    {
                        Header: 'IVA FINAL',
                        accessor: 'IVA_FINAL',
                    },
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    {
                        Header: 'Transporte',
                        accessor: 'Transporte',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
                    },
                    {
                        Header: 'Propinas',
                        accessor: 'Propinas',
                    },
                    {
                        Header: 'PAX',
                        accessor: 'PAX'
                    },
                    //total vente divido para el pax
                    {
                        Header: 'TK PROMEDIO',
                        accessor: 'tk',
                        /*       Cell: ({ row }: any) => (
                                  <div className='d-flex align-items-center'
                                   onClick={() => console.log(row.original)}>
                                  <span >{row.original}</span>
                                    </div>
                                  ),
                              } */

                    },

                ],
            },
            {
                id: 2,
                name: 'Productos Facturados',
                url: 'v1/list/productos/servicios/facturados',
                value: 2,
                column: [
                    {
                        Header: 'Item',
                        accessor: 'nombre',
                    },
                    {
                        Header: 'Cantidad',
                        accessor: 'cantidad',
                    },
                    {
                        Header: 'ICE',
                        accessor: 'ICE',
                    },
                    {
                        Header: 'Precio costo',
                        accessor: 'precio',
                    },
                    {
                        Header: 'Precio bruto',
                        accessor: 'precio_final',
                    },
                    {
                        Header: 'Total precio bruto',
                        accessor: 'total_precio_bruto',
                    },
                    {
                        Header: 'Descuento 1',
                        accessor: 'decuento',
                    },
                    {
                        Header: 'IVA',
                        accessor: 'iva',
                    },
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    {
                        Header: 'Precio total neto',
                        accessor: 'precio_total_neto',
                    },
                    {
                        Header: 'M L',
                        accessor: 'M_L',
                    },
                    //costo resta
                    {
                        Header: 'Utilidad',
                        accessor: 'utilidad',
                    },
                    {
                        Header: 'Utilidad ventas',
                        accessor: 'utilidad_ven',
                    },
                    {
                        Header: 'Contenido',
                        accessor: 'contenido',
                    },

                ]
            },
            {
                id: 3, name: 'Tipo de Cuentas', value: 3,
                column: [
                    //add totales agrupados
                    {
                        Header: 'Tipo de servicio',
                        accessor: 'name',
                    },
                    {
                        Header: 'Cuenta',
                        accessor: 'cuenta',
                    },
                    {
                        Header: 'Precuenta',
                        accessor: 'precuenta',
                    },
                    {
                        Header: 'Sub total',
                        accessor: 'subtotal',
                    },
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }
                ]
            },
            {
                id: 4, name: 'Tipo de Servicio', value: 4,
                column: [
                    {
                        Header: 'Tipo de servicio',
                        accessor: 'name',
                    },
                    {
                        Header: 'Cantidad',
                        accessor: 'cantidad',
                    },
                    {
                        Header: 'Sub total',
                        accessor: 'subtotal',
                    },
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }

                ]



            },
            {
                id: 5, name: 'Vendedor', value: 5,
                column: [
                    {
                        Header: 'Vendedor',
                        accessor: 'name',
                    },
                    {
                        Header: 'Sub total',
                        accessor: 'subtotal',
                    },
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
                    },
                    {
                        Header: 'Propina Tarjeta',
                        accessor: 'propina_tarjeta',
                    },
                    {
                        Header: 'Pax',
                        accessor: 'pax',
                    }

                ]
            },
            {
                id: 6, name: 'Propinas Tarjetas', value: 6,
                column: [
                    {
                        Header: 'Vendedor',
                        accessor: 'name',
                    },
                    {
                        Header: 'Num',
                        accessor: 'num',
                    },
                    {
                        Header: 'T_propina_tarjeta',
                        accessor: 't_propina_tarjeta',
                    },
                    {
                        Header: 'Promedio',
                        accessor: 'promedio',
                    }

                ]
            },
            {
                id: 7, name: 'Comandas(Generadas/Anuladas/Reimprecion)', value: 7,
                column: [
                    //fecha anulacion
                    {
                        Header: 'Fecha Anulacion',
                        accessor: 'fecha_anulacion',
                    },
                    //tipo
                    {
                        Header: 'Tipo',
                        accessor: 'tipo',
                    },
                    //cantidad
                    {
                        Header: 'Cantidad',
                        accessor: 'cantidad',
                    },
                    //item
                    {
                        Header: 'Item',
                        accessor: 'item',
                    },
                    //motivo
                    {
                        Header: 'Motivo',
                        accessor: 'motivo',
                    },
                    //Vendedor
                    {
                        Header: 'Vendedor',
                        accessor: 'vendedor',
                    },
                    //cuenta
                    {
                        Header: 'Cuenta',
                        accessor: 'cuenta',
                    },
                    //sitio
                    {
                        Header: 'Sitio',
                        accessor: 'sitio',
                    },
                    //Orden pedido
                    {
                        Header: 'Orden pedido',
                        accessor: 'orden_pedido',
                    },
                    //Orden Comanda
                    {
                        Header: 'Orden comanda',
                        accessor: 'orden_comanda',
                    },
                    //orden dilivery
                    {
                        Header: 'Orden dilivery',
                        accessor: 'orden_dilivery',
                    },
                    //cierre caja
                    {
                        Header: 'Cierre caja',
                        accessor: 'cierre_caja',
                    }
                ]

            },
            {
                id: 8, name: 'Items Quitados (Comandas Anuladas)', value: 8,
                column: [
                    //fecha anulacion
                    {
                        Header: 'Fecha Anulacion',
                        accessor: 'fecha_anulacion',
                    },
                    //cantidad
                    {
                        Header: 'Cantidad',
                        accessor: 'cantidad',
                    },
                    //item
                    {
                        Header: 'Item',
                        accessor: 'item',
                    },
                    //motivo
                    {
                        Header: 'Motivo',
                        accessor: 'motivo',
                    },
                    //Vendedor
                    {
                        Header: 'Vendedor',
                        accessor: 'vendedor',
                    },
                    //cuenta
                    {
                        Header: 'Cuenta',
                        accessor: 'cuenta',
                    },
                    //sitio
                    {
                        Header: 'Sitio',
                        accessor: 'sitio',
                    },
                    //Orden pedido
                    {
                        Header: 'Orden pedido',
                        accessor: 'orden_pedido',
                    },
                    //Orden Comanda
                    {
                        Header: 'Orden comanda',
                        accessor: 'orden_comanda',
                    },
                    //orden dilivery
                    {
                        Header: 'Orden dilivery',
                        accessor: 'orden_dilivery',
                    },
                    //cierre caja
                    {
                        Header: 'Cierre caja',
                        accessor: 'cierre_caja',
                    }
                ]

            },
            {
                id: 9, name: 'Mudación Items/Cuentas', value: 9,
                column: [
                    //fecha anulacion
                    {
                        Header: 'Fecha Anulacion',
                        accessor: 'fecha_anulacion',
                    },
                    //cantidad
                    {
                        Header: 'Cantidad',
                        accessor: 'cantidad',
                    },
                    //item
                    {
                        Header: 'Item',
                        accessor: 'item',
                    },
                    //motivo
                    {
                        Header: 'Motivo',
                        accessor: 'motivo',
                    },
                    //Vendedor
                    {
                        Header: 'Vendedor',
                        accessor: 'vendedor',
                    },
                    //cuenta
                    {
                        Header: 'Cuenta',
                        accessor: 'cuenta',
                    },
                    //sitio
                    {
                        Header: 'Sitio',
                        accessor: 'sitio',
                    },
                    //Orden pedido
                    {
                        Header: 'Orden pedido',
                        accessor: 'orden_pedido',
                    },
                    //Orden Comanda
                    {
                        Header: 'Orden comanda',
                        accessor: 'orden_comanda',
                    },
                    //orden dilivery
                    {
                        Header: 'Orden dilivery',
                        accessor: 'orden_dilivery',
                    },
                    //cierre caja
                    {
                        Header: 'Cierre caja',
                        accessor: 'cierre_caja',
                    }
                ]


            },
            {
                id: 10,
                name: 'Pax',
                value: 10,
                url: 'v1/reporte-pax',
                column: [
                    //pax
                    {
                        Header: 'Pax',
                        accessor: 'total_pax',
                    }
                ]
            },
            {
                id: 11, name: 'Top Clientes por Recaudación', value: 11,
                column: [
                    //cliente
                    {
                        Header: 'Cliente',
                        accessor: 'cliente',
                    },
                    //total compronbante
                    {
                        Header: 'Total comprobante',
                        accessor: 'total_comprobante',
                    },
                    //subtotal
                    {
                        Header: 'Subtotal',
                        accessor: 'subtotal',
                    },
                    //iva
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    //servicio
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    //total
                    {
                        Header: 'Total',
                        accessor: 'total',
                    },
                    //codigo
                    {
                        Header: 'Codigo',
                        accessor: 'codigo',
                    },
                    //direccion
                    {
                        Header: 'Direccion',
                        accessor: 'direccion',
                    },
                    //telefono trabajo
                    {
                        Header: 'Telefono trabajo',
                        accessor: 'telefono_trabajo',
                    },
                    //email
                    {
                        Header: 'Email',
                        accessor: 'email',
                    }
                ]
            },
            {
                id: 12, name: 'Top Clientes por Frecuencia', value: 12,

                column: [
                    //cliente
                    {
                        Header: 'Cliente',
                        accessor: 'cliente',
                    },
                    //total compronbante
                    {
                        Header: 'Total comprobante',
                        accessor: 'total_comprobante',
                    },
                    //subtotal
                    {
                        Header: 'Subtotal',
                        accessor: 'subtotal',
                    },
                    //iva
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    //servicio
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    //total
                    {
                        Header: 'Total',
                        accessor: 'total',
                    },
                    //codigo
                    {
                        Header: 'Codigo',
                        accessor: 'codigo',
                    },
                    //direccion
                    {
                        Header: 'Direccion',
                        accessor: 'direccion',
                    },
                    //telefono trabajo
                    {
                        Header: 'Telefono trabajo',
                        accessor: 'telefono_trabajo',
                    },
                    //email
                    {
                        Header: 'Email',
                        accessor: 'email',
                    }
                ]
            },
            {
                id: 13, name: 'Vendedor por Producto-> Desglozado por Factura', value: 13,
                column: [
                    //vendedor
                    {
                        Header: 'Vendedor',
                        accessor: 'vendedor',
                    },
                    //total item 
                    {
                        Header: 'Total item',
                        accessor: 'total_item',
                    },
                    //SUBTOTAL
                    {
                        Header: 'Subtotal',
                        accessor: 'subtotal',
                    },
                    //descuento
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    //iva
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    //servicio
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    //total
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }

                ]
            },
            {
                id: 14, name: 'Vendedor por Producto-> Agrupado por Producto', value: 14,
                column: [
                    //vendedor
                    {
                        Header: 'Vendedor',
                        accessor: 'vendedor',
                    },
                    //total item 
                    {
                        Header: 'Total item',
                        accessor: 'total_item',
                    },
                    //SUBTOTAL
                    {
                        Header: 'Subtotal',
                        accessor: 'subtotal',
                    },
                    //descuento
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    //iva
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    //servicio
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    //total
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }

                ]
            },
            {
                id: 15, name: 'Vendedor por Producto-> Agrupado por Grupo', value: 15,
                column: [
                    //vendedor
                    {
                        Header: 'Vendedor',
                        accessor: 'vendedor',
                    },
                    //total item 
                    {
                        Header: 'Total item',
                        accessor: 'total_item',
                    },
                    //SUBTOTAL
                    {
                        Header: 'Subtotal',
                        accessor: 'subtotal',
                    },
                    //descuento
                    {
                        Header: 'Descuento',
                        accessor: 'descuento',
                    },
                    //iva
                    {
                        Header: 'Iva',
                        accessor: 'iva',
                    },
                    //servicio
                    {
                        Header: 'Servicio',
                        accessor: 'servicio',
                    },
                    //total
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }

                ]
            },
            {
                id: 16, name: 'Movimiento Ingreso/Egreso Caja', value: 16,

                column: [
                    //id transferencia

                    {
                        Header: 'Usuario',
                        accessor: 'Usuario',
                    },
                    {
                        Header: 'Detalle',
                        accessor: 'Detalle',
                    },
                    //ingreso
                    {
                        Header: 'Ingreso',
                        accessor: 'ingreso',
                    },
                    {
                        Header: 'Egreso',
                        accessor: 'egreso',
                    },
                    //observacion
                    {
                        Header: 'Observacion',
                        accessor: 'observacion',
                    },
                    //FECHA
                    {
                        Header: 'Fecha',
                        accessor: 'fecha',
                    },
                    //caja
                    {
                        Header: 'Caja',
                        accessor: 'caja',
                    }
                ]

            },
            {
                id: 17, name: 'Total Reacudado por tipo de pago', value: 17,
                column: [
                    //tipo de pago
                    {
                        Header: 'Tipo de pago',
                        accessor: 'tipo_pago',
                    },
                    //transaccion
                    {
                        Header: 'Transaccion',
                        accessor: 'transaccion',
                    },
                    //total 
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }
                ]

            },
            {
                id: 18, name: 'Total Reacudado en tarjeta por tipo de banco', value: 18,
                column: [
                    //tarjeta
                    {
                        Header: 'Tarjeta',
                        accessor: 'tarjeta',
                    },
                    {
                        Header: 'Banco',
                        accessor: 'banco',
                    },
                    //transaccion
                    {
                        Header: 'Transaccion',
                        accessor: 'transaccion',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }
                ]
            },
            {
                id: 19, name: 'Pago creditos', value: 19,
                column: [
                    //tarjeta
                    {
                        Header: 'Tarjeta',
                        accessor: 'tarjeta',
                    },
                    {
                        Header: 'Banco',
                        accessor: 'banco',
                    },
                    //transaccion
                    {
                        Header: 'Transaccion',
                        accessor: 'transaccion',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
                    }
                ]
            },
        ],
        producosServiciosFacturados: []

    },
 /*    {
        id: 2, name: 'Gastos', value: 2,
        subItems: [
            { id: 1, name: 'Gastos', value: 1 },
        ]
    }, */

]