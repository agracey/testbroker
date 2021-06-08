import express from 'express'

import instances from './instances.mjs'
import bindings from './binding.mjs'
import last_ops from './last_operations.mjs'
import catalog from './catalog.mjs'

const v2 = express.Router()
const service_instances = express.Router()

v2.use('/catalog',catalog)

service_instances.use('/:instance_id', instances)

service_instances.use('/:instance_id/service_bindings/:binding_id', bindings)

service_instances.use('/:instance_id/service_bindings/:binding_id/last_operation', last_ops)
service_instances.use('/:instance_id/last_operation', last_ops)

v2.use('/service_instances',service_instances)

export default v2
