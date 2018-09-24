function UsuariosDAO(connection) { 
    this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function (user) { 
    this._connection.insert(user);
};

module.exports = function () {
    return UsuariosDAO;
};