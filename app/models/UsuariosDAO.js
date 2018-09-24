function UsuariosDAO(connection) { 
    this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function (user) { 
    this._connection.insert(user);
};

UsuariosDAO.prototype.autenticar = function (user, req, res) { 
    this._connection.autenticar(user, req, res);
};

module.exports = function () {
    return UsuariosDAO;
};