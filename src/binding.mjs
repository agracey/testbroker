import express from 'express'

const binding = express.Router()

binding.put('/', (req,res)=>{
  console.log("BINDING_PUT: ",req.body)

  res.send({
    credentials: {
      creds: 'somecreds'
    },
    parameters: {
      params: 'someparams'
    },
    endpoints: {
      uri: 'someuri'
    }
  })
})


binding.get('/', (req,res)=>{
  console.log("BINDING_GET: ",req.body)

  res.send({
    credentials: {
      creds: 'somecreds'
    },
    parameters: {
      params: 'someparams'
    },
    endpoints: {
      uri: 'someuri'
    }
  })
})

binding.delete('/', (req,res)=>{
  console.log("BINDING_DELETE: ",req.body)

  res.send({
    operation: req.params.binding_id
  })
})

export default binding