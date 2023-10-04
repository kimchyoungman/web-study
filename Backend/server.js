const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.get('/', (req, res) => res.sendFile(__dirname+"/ajax.html"));

var obj;

var ajax_obj=["jinwoo", "seoultech", "iise"];

app.get('/ajax/:id',(req,res)=>res.json(ajax_obj[req.params.id]));
app.get("/obj", (req, res) => res.send(obj));

app.post('/obj', (req, res) => {
    if(req.body.name) {
    obj={name:req.body.name}
    console.log(req.body.name);
    }
    else obj={name:'jinwoo'};
    res.sendStatus(200);
});
    
app.post('/form',(req,res)=>{s
    console.log(req.body.stuName);
    console.log(req.body.stuFirst);
    console.log(req.body.stuJob);
    res.sendStatus(200);
    })

app.put("/obj", (req, res) => {
    if (!obj) res.status(500).send("object not found");
    else {
        obj.name = "updated";
        res.sendStatus(200);
    }
});

app.post("/obj", (req, res) => {
    if (req.body.name) {
        obj = { name: req.body.name };
        console.log(req.body.name);
    } else obj = { name: "jinwoo" };
    res.sendStatus(200);
});

app.delete("/obj", (req, res) => {
    if (!obj) res.status(500).send("object not found");
    else {
        obj = undefined;
        res.sendStatus(200);
    }
});

app.use((req, res, next) => {
    res.status(404).send("<h1>Sorry, Page Not Found</h1>");
    console.log("404 Error sent");
});

app.get("/obj", (req, res) => {
    let name = req.query.name;
    let gender = req.query.gender;
    let eNum = req.query.eNum;
    res.send({ obj });
});

app.get("/obj", (req, res) => {
    let name = req.query.name;
    let gender = req.query.gender;
    let eNum = req.query.eNum;
    res.send({ name, gender, eNum });
});

app.get("/obj/:eNum", (req, res) => {
    let eNum = req.params.eNum;
    res.send(eNum);
});

app.listen(3000, () => {
    console.log("server running at  port:3000");
});
