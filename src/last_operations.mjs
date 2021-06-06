import express from 'express'

const ops = express.Router()

ops.get('/', (req,res)=>{
  res.send({
    state: 'succeeded',
    description: 'Creation and Binding of loopback is a noop',
    instance_usable: true,
    update_repeatable: false
  })
})

export default ops