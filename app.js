require("dotenv").config()
require('express-async-errors')
// async errors
const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const productsRouter = require('./routes/products')
const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler")
// middleware
app.use(express.json())
// routes
app.get("/", (req, res) => {
	res.send(`<h1>Store API</h1><a href='/api/v1/products'>products route</a>`)
})
// products route
app.use('/api/v1/products',productsRouter)
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
const start = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`server is listening at port ${port}...`))
	} catch (error) {
		console.log(error)
	}
}
start()
