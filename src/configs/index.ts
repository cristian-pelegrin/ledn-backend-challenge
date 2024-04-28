import * as dotenv from 'dotenv'

dotenv.config()

interface Config {
   server: {
      port: number
   },
   mongodb: {
      connectionUri: string
   }
}

const config: Config = {
   server: {
      port: parseInt(process.env.PORT || '3000'),
   },
   mongodb: {
      connectionUri: process.env.MONGODB_CONNECTION_URI!
   }
}

export default config