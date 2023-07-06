function createPaymentsPdf(payments, unit) {
    const table = [
        [
            { text: 'PAGO' },
            { text: 'TIPO' },
            { text: 'FECHA DE PAGO' },
            { text: 'CANTIDAD' },
            { text: 'ESTATUS' },
            { text: 'NOTAS' },
        ]
    ];

    const body = payments.reduce((last, current, index, _arr) => {
        last.push([
            { text: index + 1 },
            { text: current.paymenttype },
            { text: new Date(current.duedate).toLocaleDateString('es-MX') },
            { text: current.paymentamount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }) },
            { text: current.paymentstatus },
            { text: current.comment ? current.comment : '-' },
        ]);

        return last;
    }, table);

    return {
        pageSize: 'A4',
        content: [
            {
                text: `Registro de Pagos de Unidad ${unit.name}.`,
                style: 'headerText'
            },
            ' ',
            {
                text: `Fecha: ${new Date().toLocaleDateString("es-MX", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
            },
            ' ',
            {
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body,
                },
                style: 'header',
                layout: {
                    fillColor: function (rowIndex, _node, _columnIndex) {
                        return (rowIndex === 0) ? '#C9C9CC' : null;
                    }
                }
            },
        ],
        styles: {
            header: {
                bold: true
            },
            headerText: {
                bold: true
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
    }
}

module.exports = { createPaymentsPdf };