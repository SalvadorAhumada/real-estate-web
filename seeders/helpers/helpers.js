function getData(data, index) {
    let row = data[index];
    if(row === 'NULL') row = null;
    return row;
}

module.exports = {
    getData
}