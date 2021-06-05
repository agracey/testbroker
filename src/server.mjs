import express from 'express'
import routes from './routes.mjs'

const app = express()
app.get('/',(req,res)=>{
  res.send('Hello, World!')
})

app.use(express.json())

app.use('/v2',routes)

app.listen(8080, ()=>{
  console.log('App listening')
})