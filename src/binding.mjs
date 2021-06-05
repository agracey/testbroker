import express from 'express'

const binding = express.Router()

const not_implemented = (req, res)=>{req.send({})}
binding.put('/', not_implemented)
binding.get('/', not_implemented)
binding.delete('/', not_implemented)

export default binding