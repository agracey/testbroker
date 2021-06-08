import express from 'express'

const catalog = express.Router()


catalog.get('/',(req,res)=>{
  const c = {services:[{
    name: 'custom',
    id: 'custom-service',
    description: 'Custom data mounted in the same way service data is',
    tags: [],
    bindable: true,
    instances_retrievable: true,
    binding_retrievable: true,
    allow_context_updates: false,
    plans:[
      {
        name: 'loopback',
        id: 'loopback',
        description: 'Binds the data passed in while instantiating the service instance',
      }
    ]
  }]}
  res.send(c)
})


export default catalog
