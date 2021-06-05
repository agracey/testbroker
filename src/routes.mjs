import express from 'express'

const v2 = express.Router()
const catalog = express.Router()
const service_instances = express.Router()


catalog.get('/',(req,res)=>{
  const c = {services:[{
    name: 'Custom Service',
    id: 'custom_service_mock_broker',
    description: 'Custom data mounted in the same way service data is',
    tags: [],
    bindable: true,
    instances_retrievable: true,
    binding_retrievable: true,
    allow_context_updates: false,
    plans:[
      {
        name: 'Loopback',
        id: 'loopback',
        description: 'Binds the data passed in while instantiating the service instance',
      }
    ]
  }]}
  res.send(c)
})

v2.use('/catalog',catalog)

const not_implemented = (req, res)=>{req.send({})}

service_instances.put('/:id', not_implemented)
service_instances.get('/:id', not_implemented)
service_instances.delete('/:id', not_implemented)



service_instances.put('/:id/service_bindings/:binding_id', not_implemented)
service_instances.get('/:id/service_bindings/:binding_id', not_implemented)
service_instances.delete('/:id/service_bindings/:binding_id', not_implemented)

service_instances.get('/:id/service_bindings/:binding_id/last_operation', not_implemented)
service_instances.get('/:id/last_operation', not_implemented)

v2.use('/service_instances',service_instances)

export default v2
