const db = require('../../../models');

function shouldRestoreDB(dropTable) {

    let shouldForce = dropTable === undefined ? {}: { force: true }
    
    db.sequelize.sync(shouldForce).then(() => {
        if(dropTable) {
            console.log("\u001b[41m[            \u{1F480}DB WAS DROPPED\u{1F480}            ]\x1b[0m\n")
        } else {
            console.log("\n\x1b[44m[            DB INITIALIZED            ]\x1b[0m\n")
        }
    })
}

module.exports = {
    shouldRestoreDB
}