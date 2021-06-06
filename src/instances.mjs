import express from 'express'

const instances = express.Router()

instances.put('/', (req,res)=>{
  console.log("INSTANCE_PUT: ",req.body)

  res.send({
    operation: req.params.instance_id
  })
})


instances.get('/', (req,res)=>{
  console.log("INSTANCE_GET: ",req.body)

  res.send({
    plan_id: 'loopback',
    instance_id: req.params.instance_id
  })
})


instances.delete('/', (req,res)=>{
  console.log("INSTANCE_DELETE: ",req.body)

  res.send({
    operation: null
  })
})

export default instances