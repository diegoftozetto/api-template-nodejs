const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");

//Listar Usuários
router.get('/', (req, res) => {
    User.find().sort({name: 'asc'}).then((users) => {
        res.status(200).json(users);
    }).catch(() => {
        res.status(500).json({"message": "Falha ao processar requisição. Erro ao buscar usuários no Database."});
    });
});

//Adicionar Usuário
router.post('/', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({"message": "Falha ao processar requisição. Parâmetros Inválidos."});
    } else {   
        var flag = true; 
        for (key in req.body) {
            if(!req.body[key] || typeof req.body[key] == undefined || req.body[key] == null) {
                flag = false;
                return;
            }
        }   

        if(!flag) {            
            res.status(400).json({"message": "Falha ao processar requisição. Parâmetros Inválidos."});
        }
        else {
            new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).save().then(() => {
                res.status(201).json({"message": "Usuário adicionado com sucesso."});
            }).catch(() => {
                res.status(500).json({"message": "Falha ao processar requisição. Erro ao adicionar usuário no Database."});
            });
        }   
    }   
});

//Remover Usuário
router.delete('/:id', (req, res) => {
    User.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({"message": "Usuário removido com sucesso."});
    }).catch(() => {
        res.status(500).json({"message": "Falha ao processar requisição. Erro ao remover usuário no Database."});
    }); 
});

module.exports = router;