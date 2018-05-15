
import express from 'express'
import path from 'path'
const app = express()
import router from './routes/api'

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded())

app.use('/api',router)
app.listen(2000, () => console.log('server started!!'))
