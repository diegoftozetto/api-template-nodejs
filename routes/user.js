const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");

const bcrypt = require("bcryptjs");

const config = require("../config/config");
const strings = require("../helpers/translate/"+config.language);

/**
 * @swagger
 * definitions:
 *   Users:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Usuários
 *     description: Requisição de lista com todos os usuários
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Um Array com todos os produtos
 *         schema:
 *           $ref: '#/definitions/Users'
 *       500:
 *          description: Falha ao processar requisição. Erro ao buscar usuários no Database.
 */
router.get('/', (req, res) => {
    User.find().sort({name: 'asc'}).then((users) => {
        res.status(200).json(users);
    }).catch(() => {
        res.status(500).json({"message": strings.msgErrorUserSearch});
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuários
 *     description: Requisição para inserir um usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: users
 *         description: Usuário a ser criado.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Falha ao processar requisição. Parâmetro(s) inválido(s). <br>
 *                      Falha ao processar requisição. Parâmetro inválido, email já cadastrado.
 *       500:
 *          description: Falha ao processar requisição. Erro ao adicionar usuário no Database.
 */
router.post('/', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({"message": strings.msgInvalidParameters});
    } else {   
        var flag = true; 
        for (key in req.body) {
            if(!req.body[key] || typeof req.body[key] == undefined || req.body[key] == null) {
                flag = false;
                return;
            }
        }   

        if(!flag) {            
            res.status(400).json({"message": strings.msgInvalidParameters});
        }
        else {
            User.findOne({email: req.body.email}).then((user) => {
                if (!user) {
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(req.body.password, salt, (error, hash) => {
                            
                            new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            }).save().then(() => {
                                res.status(201).json({"message": strings.msgOkUserAdd});
                            }).catch(() => {
                                res.status(500).json({"message": strings.msgErrorUserAdd});
                            });
                        });
                    });
                } else {
                    res.status(400).json({"message": strings.msgErrorUserAddEmail});
                }
            }).catch((e) => {
                res.status(500).json({"message": strings.msgErrorUserAdd});
            });
        }   
    }   
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     description: Requisição para remover um usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id do usuário
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso.
 *       500:
 *          description: Falha ao processar requisição. Erro ao remover usuário no Database.
 */
router.delete('/:id', (req, res) => {
    User.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({"message": strings.msgOkUserDelete});
    }).catch(() => {
        res.status(500).json({"message": strings.msgErrorUserDelete});
    }); 
});

module.exports = router;