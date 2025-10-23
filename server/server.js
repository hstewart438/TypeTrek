
const express = require("express");
const server = express();
const cors = require("cors");
//const pool = require("./db");



//middleware
server.use(cors());
server.use(express.json()); //req.body

//routes
/*
server.post("/todos", (req, res) => {
  try{
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *");
  } catch (err) {
    console.error(err.message);
  }
})

server.get("/todos", async(req, res) => {
  const allTodos = await pool.query("SELECT * FROM todo");
  res.json(allTodos.rows);
  })

server.get("/todos/:id", async (req, res)=> {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  } catch (err) {
    console.error(err.message);
  }
    
  res.json(todo.rows[0])
})

server.put("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
    );
  } catch (err) {
    console.error(error.message);
    }
  })

server.delete(/todos/:id, async (req, res) => {
  try {const {id} = req.params;
  const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
  [id]);
  } catch (err){
   console.error(error.message)}

server.get("/", (req, res) => {
  res.send("hello from backend Mr.Test Route");
});
*/

// Listen on port 3000
server.listen(3000, () => {
    console.log(
        "Server is running on http://localhost:3000");
});


