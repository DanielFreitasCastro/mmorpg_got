module.exports.jogo = function (application, req, res) {
    if (req.session.autorizado !== true) {
        return console.log("Não autorizado");
    }

    var conn = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(conn);
    JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa);
};

module.exports.sair = function (applicati, req, res) {
    req.session.destroy(function (err, data) {
        if (err) return console.log("erro", err);
        res.redirect("/");
    });
};

module.exports.suditos = function (applicati, req, res) {
    res.render("aldeoes", {validacao: {}});
};

module.exports.pergaminhos = function (applicati, req, res) {
    res.render("pergaminhos", {validacao: {}});
};