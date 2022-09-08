// const cookieParser = require('cookie-parser')
require("dotenv").config()
require("express-async-errors");
const express = require("express")
const app = express();
const { authRouter,
    blogRouter,
    adminUserRouter,
    adminBlogRouter } = require("./router/index")
const connectDB = require("./db/connect")
const {
    authAdmin, 
    authenticate,
  errorHandler,
  notFound, 
} = require("./middleware/index");
//path
const path = require("path");
const cors = require("cors")
//security
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require('morgan')
const helmet = require('helmet')

app.disable("x-powered-by"); 
const auth = [authenticate, authAdmin]

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const corOpt = {
  origin: ["http://localhost:3000", "https://tyrantx-blog-app.netlify.app"],
  credentials: true,
};

// only when ready to deploy
app.use("/main-app",express.static(path.resolve(__dirname, './public/build')))
//utils
app.use(express.json()) 
app.use(helmet())
app.use(xss());
app.use(mongoSanitize());
app.use(cors(corOpt));
//routes
app.use("/v1/auth", authRouter)
app.use("/v1/blog", authenticate, blogRouter)
app.use("/v1/admin/users",auth, adminUserRouter);
app.use("/v1/admin/blogs", auth, adminBlogRouter);
//middleware
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`server listening at ${port}...`));
    } catch (error) {
        console.log(error)
    }
}
start();