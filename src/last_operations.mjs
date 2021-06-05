import express from 'express'

const ops = express.Router()

const not_implemented = (req, res)=>{req.send({})}
ops.get('/', not_implemented)

export default ops