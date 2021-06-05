import express from 'express'

const instances = express.Router()

const not_implemented = (req, res)=>{req.send({})}
instances.put('/', not_implemented)
instances.get('/', not_implemented)
instances.delete('/', not_implemented)

export default instances