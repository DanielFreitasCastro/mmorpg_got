module.exports.index = function(application, req, res){
    res.render('index', {
        validacao: {},
        formulario: {}
    });
};

module.exports.autenticar = function(application, req, res){
    var dados = req.body;

    req.assert('usuario', 'Nome não pode ser vazio!').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if(erros.length){
        res.render('index', {
            validacao: erros,
            formulario: dados
        });
        return;
    }
    
    var conn = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);

    UsuariosDAO.autenticar(dados, req, res);
};