const fs = require('fs')


const queryUpload = (req, res) => {
    fs.access(
        req.localpath,
        fs.constants.R_OK,
        (error) => {
            res.status(error ? 404 : 200).end()
        }
    )
}

module.exports = { queryUpload }