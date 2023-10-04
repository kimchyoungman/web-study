const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 미제출 조회
app.get("/", (req, res) => {
    fs.readFile(
        __dirname + "/data/UnslovedAssignment.json",
        "utf8",
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            let jsonData = JSON.parse(data);
            const filteredData = jsonData.filter((item) => item.submit === "N");
            res.json(filteredData);
        }
    );
});

// 선택 조회
app.get("/UnslovedAssignment", (req, res) => {
    fs.readFile(
        __dirname + "/data/UnslovedAssignment.json",
        "utf8",
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            let jsonData = JSON.parse(data);
            let selectedOption = req.query.selectedOption;
            let searchText = req.query.searchText;

            let filteredData = [];

            if (selectedOption === "Subject") {
                filteredData = jsonData.filter((item) =>
                    item.subject.includes(searchText)
                );
            } else if (selectedOption === "Task_Name") {
                filteredData = jsonData.filter((item) =>
                    item.taskName.includes(searchText)
                );
            }

            res.json(filteredData);
        }
    );
});

//완료조회
app.get("/submitAssignment", (req, res) => {
    fs.readFile(
        __dirname + "/data/UnslovedAssignment.json",
        "utf8",
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
                return;
            }

            let jsonData = JSON.parse(data);
            const filteredData = jsonData.filter((item) => item.submit === "Y");
            res.json(filteredData);
        }
    );
});

let assignments = [];

app.patch("/taskName/:taskName", (req, res) => {
    const taskName = req.params.taskName;
    const updatedAssignment = req.body;

    try {
        const data = fs.readFileSync("data/UnslovedAssignment.json", "utf8");
        assignments = JSON.parse(data);

        const assignment = assignments.find(
            (assignment) => assignment.taskName === taskName
        );

        if (!assignment) {
            res.status(404).send(`(${taskName}) is not find`);
        } else {
            Object.assign(assignment, updatedAssignment);

            fs.writeFileSync(
                "data/UnslovedAssignment.json",
                JSON.stringify(assignments, null, 2)
            );

            res.send(`(${taskName}) is updated`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
