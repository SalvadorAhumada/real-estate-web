function createPaymentsPdf(payments) {

    return {
        /*         content: [{ text: 'TESTasdasdsadsad' }] */
        content: payments.map(payment => {
            return {
                text: `${payment.id}`
            }
        })
    }
}

module.exports = { createPaymentsPdf };