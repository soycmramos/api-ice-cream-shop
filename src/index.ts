import { config } from 'dotenv'
import app from './app.js'

config()

const port = app.get('port')

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
