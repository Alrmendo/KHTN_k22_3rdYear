const express = require("express")
const app = express()
const port = 3000
const expressHbs = require("express-handlebars")
const { emotions, categories, products, zodiacs } = require('./data')

//cau hinh thu muc static (web tinh)
app.use(express.static(__dirname + "/html", {
    index: "index.htm" //để cấu hình cho nó biết
}))

// cau hinh su dung template engine express-handlebars
app.engine(
    "hbs",
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout",
    })
)

// app.get("/", (req, res) => res.sendFile(__dirname + "/html/index.htm"));
// app.get("/css/main.css", (req, res) => 
//     res.sendFile(__dirname + "/html/css/main.css")
// )

app.set("view engine", "hbs")

app.get("/", (req, res) => res.render("index", { title: "Jeopardize Contest" })
);
app.get('/xyz', (req, res) => res.render("xyz", {
    layout: "admin"
}))

app.get("/task1", (req, res) => {
    res.locals.title = "Inspiring Quotes"
    res.locals.emotions = emotions;
    res.render("task1")
})

app.get("/task2", (req, res) => {
    let salary = isNaN(req.query.salary) ? 0 : parseInt(req.query.salary)
    let jar55 = (salary * 55) / 100
    let jar10 = (salary * 10) / 100
    let jar5 = (salary * 5) / 100
    console.log(salary)
    res.locals.title = "Jars Saving"
    res.render("task2", { jar55, jar10, jar5})
})

app.get("/task3", (req, res) => {
    let category = req.query.category
    res.locals.title = "TV Sales"
    res.locals.categories = categories
    res.locals.products = category ? products.filter((item) => item.category == category) : products
    res.render("task3")
})

app.use("/task4", require("./routes/task4Router"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
