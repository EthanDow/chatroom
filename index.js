const app = require("express")(); 
const server = require("http").Server(app); 
const io = require("socket.io")(server); 
const PORT = process.env.PORT; 


server.listen(PORT, process.env.IP, function(){
    console.log(`Your serve is running on port ${PORT}...`); 
}); 


// route calls 

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");  
}); 

app.get("/javascript", function(req, res){
    res.sendFile(__dirname + "/public/javascript.html");  
}); 

app.get("/python", function(req, res){
    res.sendFile(__dirname + "/public/python.html");  
}); 


app.get("/css", function(req, res){
    res.sendFile(__dirname + "/public/css.html");  
}); 
//create namesapce 

const tech = io.of("/tech");


tech.on("connection", function(socket){
    socket.on("join", function(data){
        socket.join(data.room); 
        tech.in(data.room).emit("message", `New user joined ${data.room} room !`);  
        
    }); 
    
    socket.on("message", function(data){
        console.log(`Message: ${data.msg}`); 
        tech.in(data.room).emit("message", data.msg); 
    }); 
    
    socket.on("disconnect", function(){
        console.log("User disconnected"); 
        
        tech.emit("message", "user disconnected"); 
    }); 
    
    
}); 

