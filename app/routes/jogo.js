module.exports = function (application) {
	application.get('/jogo', function (req, res) {

		if (req.session.autorizado) {
			application.app.controllers.jogo.jogo(application, req, res);
		} else {
			res.render('index', {
				validacao: {},
				formulario: {}
			});
		}

	});

	application.get('/sair', function (req, res) {
		application.app.controllers.jogo.sair(application, req, res);
	});

	application.get('/suditos', function (req, res) {
		application.app.controllers.jogo.suditos(application, req, res);
	});

	application.get('/pergaminhos', function (req, res) {
		application.app.controllers.jogo.pergaminhos(application, req, res);
	});
	
	application.post('/ordenar-acao-sudito', function (req, res) {
		application.app.controllers.jogo.ordenarSudito(application, req, res);
	});
};