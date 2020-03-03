const express = require ('express');

const app = express ();

app.use (express.json())

const usuarios = [
    {id: 1, nome: 'Lucas'},
    {id: 2, nome: 'Daenerys'},
    {id: 3, nome: 'João das Neves'},
    {id: 4, nome: 'Drogon'}
]

app.get ('/', function (req, res) {
    res.send('Olá mundo!')
});

// GET usuarios - devolver todos os usuários

app.get ('/usuarios', function (req, res) {

    res.json(usuarios)

});

//  POST /usuarios - criar um novo usuário

app.post ('/usuarios', function (req, res){
    const usuario = {
        id: req.body.id,
        nome: req.body.nome
    }

    usuarios.push(usuario)

    res.status(201).json (usuario);
});

const usuarioExiste = function (req, res, next) {
    const usuario = usuarios.find (u => u.id == req.params.id);
    if (!usuario){
        return res.status(404).json({ erro: 'Usuário não encontrado'});
    }
    req.usuario = usuario;
    next();
}

// GET /usuarios/:id - devolve um usuário específico

app.get ('/usuarios/:id', usuarioExiste, function (req, res){ //ID do usuário cadastrado
    return res.status(200).json(req.usuario);
}); 

// PUT /usuarios/:id - alterar os dados de um usuário

app.put ('/usuarios/:id', usuarioExiste, function (req, res){
    req.usuario.nome = req.body.nome;
    return res.status(200).json(req.usuario);
}); 

// DELETE /usuarios/:id - deleta o usuário

app.delete ('/usuarios/:id', usuarioExiste, function (req, res){
    const index = usuarios.indexOf(req.usuario);
    usuarios.splice(index, 1);
    res.status(204).end();
}); 


app.listen (3000, function(){
    console.log('rodando na porta 3000');
});