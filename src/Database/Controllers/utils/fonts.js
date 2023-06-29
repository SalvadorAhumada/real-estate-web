var path = require('path');

const fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
};

module.exports = { fontDescriptors }