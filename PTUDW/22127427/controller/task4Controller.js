let controller = {}
let { zodiacs } = require("../data")

controller.showList = (req, res) => {
    res.locals.title = "Zodiac Characteristics"
    res.locals.zodiacs = zodiacs
    res.render("task4")
}

controller.showDetails = (req, res) => {
    let zodiac = req.params.zodiac
    let selectedZodiacs = zodiacs.filter((item) => item.name == zodiac)
    res.locals.title = "Zodiac Characteristics"
    res.locals.zodiac = selectedZodiacs.length ? selectedZodiacs[0] : zodiacs[0]
    res.render('task4-details')
}

module.exports = controller