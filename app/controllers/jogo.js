module.exports.jogo = function (application, req, res) {
    if (req.session.autorizado !== true) {
        return console.log("Não autorizado");
    }

    var msg = "";
    if(req.query.msg !== ""){
        msg = req.query.msg;
    }

    var conn = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(conn);
    JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);
};

module.exports.sair = function (applicati, req, res) {
    req.session.destroy(function (err, data) {
        if (err) return console.log("erro", err);
        res.redirect("/");
    });
};

module.exports.suditos = function (applicati, req, res) {
    res.render("aldeoes", { validacao: {} });
};

module.exports.pergaminhos = function (applicati, req, res) {
    var conn = applicati.config.dbConnection;
    var JogoDAO = new applicati.app.models.JogoDAO(conn);
    JogoDAO.getAcoes(res, req.session.usuario);
};

module.exports.ordenarSudito = function (applicati, req, res) {
    var dados = req.body;

    req.assert("acao", "Ação deve ser informada!").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada!").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.redirect("jogo?msg=A");
        return;
    }

    var conn = applicati.config.dbConnection;
    var JogoDAO = new applicati.app.models.JogoDAO(conn);

    dados.usuario = req.session.usuario;
    JogoDAO.acao(dados, res);
};