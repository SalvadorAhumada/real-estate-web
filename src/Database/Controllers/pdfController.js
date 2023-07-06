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
    
    const payments = req.body.payments;
    const unit = req.body.unit;

    let dd = createPaymentsPdf(payments, unit);

    const pdfDoc = printer.createPdfKitDocument(dd);
    
    res.contentType('application/pdf');
    
    pdfDoc.pipe(res);
    
    pdfDoc.end();
}

module.exports = {
    create_payments
};