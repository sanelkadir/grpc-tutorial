const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("todo.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo("localhost:4000", grpc.credentials.createInsecure())

client.createTodo({
    id: -1,
    text: "Hello from client"
}, (err, res) => {
    if (err){
        console.log(err)
    } else{
        console.log(res)
    }
})

// client.readTodos({}, (err, res) => {
//     if (err){
//         console.log(err)
//     } else{
//         console.log(res)
//     }
// })

const call = client.readTodosStream()
call.on("data", item => {
    console.log("Received item: ", item)
})

call.on("end", e => {
    console.log("Server has finished sending")
})