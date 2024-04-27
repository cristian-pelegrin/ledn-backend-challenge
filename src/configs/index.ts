import * as dotenv from 'dotenv'

dotenv.config()

interface Config {
   server: {
      port: number
   }
}

const config: Config = {
   server: {
      port: parseInt(process.env.PORT || '3000'),
   }
}

export default config