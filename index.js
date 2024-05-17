import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import ejs from "ejs"

const app = express();
const port = 3000;
app.listen(port,()=>{
    console.log(`server running at ${port}`);
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


const db = new pg.Client({
    user:"postgres",
    host: "localhost",
    database: "toDoList",
    password: "shiv@123",
    port: 4000,
});
db.connect();

let items = [
    {   
        id:1,
        title: "Hello"
    },
    {
        id:2,
        title: "HelloWorld"
    }
];

//db.query(`INSERT INTO items (title) VALUES ('${items[0].title}'),  ('${items[1].title}')  `);

// console.log(items[0].title);
let date = new Date();
date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
// console.log(date);
app.get("/",async (req,res)=>{
    try {

        const result = await db.query("SELECT * FROM items ORDER BY id ASC");
        items = result.rows;
        // console.log(result);

        res.render("index.ejs",{
        listTitle: date,
        listItems: items,
        })
    } catch (error) {
        console.log(error);
    }
    
});

app.post("/add", async (req, res)=>{
    // console.log(req.body);
    const item = req.body.newItem;
    try {
        await db.query(`INSERT INTO items(title) VALUES ('${item}')`);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }}
);

app.post("/delete", async (req,res)=>{
    try {
        const id = req.body.deleteItemId;
        // console.log(id);
        await db.query(`DELETE FROM items WHERE id = ${id}`);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.post("/edit", async (req,res)=>{
    const item = req.body.updatedItemTitle;
    const id = req.body.updatedItemId;
    try {
        await db.query("UPDATE items SET title =($1) WHERE id = $2 ", [item,id]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});