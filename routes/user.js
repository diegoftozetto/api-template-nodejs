const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("users");

const bcrypt = require("bcryptjs");

const config = require("../config/config");
const strings = require("../helpers/translate/"+config.language);

//Listar Usuários
router.get('/', (req, res) => {
    User.find().sort({name: 'asc'}).then((users) => {
        res.status(200).json(users);
    }).catch(() => {
        res.status(500).json({"message": strings.msgErrorUserSearch});
    });
});

//Adicionar Usuário
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

//Remover Usuário
router.delete('/:id', (req, res) => {
    User.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({"message": strings.msgOkUserDelete});
    }).catch(() => {
        res.status(500).json({"message": strings.msgErrorUserDelete});
    }); 
});

module.exports = router;