import express from 'express'

import instances from './instances.mjs'
import bindings from './bindings.mjs'
import last_ops from './last_operations.mjs'

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

service_instances.use('/:instance_id', instances)

service_instances.use('/:instance_id/service_bindings/:binding_id', bindings)

service_instances.use('/:instance_id/service_bindings/:binding_id/last_operation', last_ops)
service_instances.use('/:instance_id/last_operation', last_ops)

v2.use('/service_instances',service_instances)

export default v2
