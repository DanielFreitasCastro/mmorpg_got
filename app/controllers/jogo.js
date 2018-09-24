module.exports.jogo = function(applicati, req, res){
    res.render('jogo');
};

module.exports.sair = function(applicati, req, res){
    req.session.destroy(function(err, data){
        if(err) return console.log("erro", err);
        res.redirect("/");
    });
};