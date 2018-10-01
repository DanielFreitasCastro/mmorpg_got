function JogoDAO(connection) {
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    this._connection.insertJogo({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
    });
};

JogoDAO.prototype.iniciaJogo = function (res, usuario, casa, msg) {
    this._connection.iniciaJogo(res, usuario, casa, msg);
};

JogoDAO.prototype.acao = function (acao, res) {
    this._connection.executaAcao(acao, res);
};

JogoDAO.prototype.getAcoes = function (res, usuario) {
    this._connection.getAcoes(res, usuario);
};

module.exports = function () {
    return JogoDAO;
};