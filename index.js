const http = require("http")
const app = require("./app")

// const server = http.createServer((req,res)=>{
//     res.end("voilà la répense du serveur !")
// })

const port =process.env.PORT || 5000
app.set("port",port)
const server = http.createServer(app)
server.listen(port,() =>{console.log("listening on " + port)})