const fs = require('fs')
const path = require('path')


/* const queryUpload = (req, res) => {
    fs.access(
        path.join(__dirname, '/../uploads', req.params.image),
        fs.constants.R_OK,
        (error) => {
            res.status(error ? 404 : 200).end()
        }
    )
} */

const queryUpload = (req, res) => {
    fs.access(
        req.localpath,
        fs.constants.R_OK,
        (error) => {
            res.status(error ? 404 : 200).end()
        }
    )
}

module.exports = queryUpload