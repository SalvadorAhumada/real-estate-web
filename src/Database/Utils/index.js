const db = require('../../../models');

function shouldRestoreDB(restore) {

    if (restore === true) {
        db.sequelize.sync({ force: true }).then(() => {
            console.log("\n\x1b[44m[            DB UPDATED            ]\x1b[0m\n")
        })
    }
}

module.exports = {
    shouldRestoreDB
}