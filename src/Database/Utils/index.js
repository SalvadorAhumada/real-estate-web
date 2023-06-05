const db = require('../../../models');

function shouldRestoreDB(restore) {

    if (restore) {
        db.sequelize.sync({ force: true }).then(() => {
            console.log("db has been re sync")
        })
    }
}

module.exports = {
    shouldRestoreDB
}