const homeRoute = (req, res) => {
   // #swagger.description = 'Home route'
   res.send("Welcome to my personal project.")
}

module.exports = { homeRoute }