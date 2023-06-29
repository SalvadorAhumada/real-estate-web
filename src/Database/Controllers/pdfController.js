require("dotenv").config();
const PdfPrinter = require('pdfmake');
const { fontDescriptors } = require('./utils/fonts');
const { createPaymentsPdf } = require('./utils/pdfs/payments');

const printer = new PdfPrinter(fontDescriptors);

/**
 * Crea un PDF con todos los pagos de una unidad
 * POST api/pdf-creator/payments
 */
const create_payments = async (req, res) => {
    /**
     * TODO: Connect to frontend
     */
    // payments = req.body.payments
    let payments = [];

    // payments temp example
    payments = [
        {
            "id": 6,
            "paymentno": 5,
        //...
        }
    ]

    let dd = createPaymentsPdf(payments);

    const pdfDoc = printer.createPdfKitDocument(dd, { autoPrint: true });
    res.contentType('application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
}

module.exports = {
    create_payments
}; {

}