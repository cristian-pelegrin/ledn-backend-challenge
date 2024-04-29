import mongoose from "mongoose"

import configs from "@configs/index"

let dbInstance: mongoose.Connection | null = null

export const connectDB = async () => {
   if (!dbInstance) {
      try {
         await mongoose.connect(configs.mongodb.connectionUri)
         console.log("Connected to MongoDB")
         dbInstance = mongoose.connection
      } catch (error) {
         console.error("Failed to connect to MongoDB:", error)
         throw error
      }
   }
   
   return dbInstance
}

export const getDbConnection = () => {
   if (!dbInstance) {
      throw new Error("Database not connected")
   }
   return dbInstance
}