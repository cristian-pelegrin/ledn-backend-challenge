import express from "express"
import 'module-alias/register'

import configs from "@configs/index"
import { loadRoutes } from "@routes/index"

if (!configs.server.port) {
   console.log(`No port value specified...`)
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// load api routes
loadRoutes(app)

app.listen(configs.server.port, () => {
   console.log(`Server is listening on port ${configs.server.port}`)
})