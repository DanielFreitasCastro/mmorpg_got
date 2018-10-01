module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {
        validacao: {},
        formulario: {}
    });
};

module.exports.cadastrar = function(application, req, res){

    var dados = req.body;

    req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
    req.assert('usuario', 'Usuario não pode ser vazio!').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio!').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio!').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render("cadastro", {
            validacao: erros,
            formulario: dados
        });
        return;
    }

    var conn = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);
    
    UsuariosDAO.inserirUsuario(dados);
    
    //Gerar Parametros
    var JogoDAO = new application.app.models.JogoDAO(conn);
    JogoDAO.gerarParametros(dados.usuario);

    res.send("Podemos Cadastrar!");
};