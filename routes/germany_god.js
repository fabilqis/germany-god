var Germany = require("../models/germany").Germany;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = function (app){
    app.get("/gods", function (req, res) {
        Germany.find({}, function (err, goddess) {
            if (err)
                return res.send(err);
            res.json(goddess)
        });
    });

    app.get("/gods/:id", function (req, res) {
        Germany.find({
            "_id": req.params.id
        }, function (err, goddess) {
            if (err)
                return res.send(err);
            res.json(goddess)
        });
    });

    app.post("/gods", function (req, res) {
        var thegermany = new Germany();
        bcrypt.hash(req.body.password, 12, function(err, hash){
            
            thegermany.name = req.body.name;
            thegermany.role = req.body.role;
            thegermany.also_known = req.body.also_known;
            thegermany.description = req.body.description;
            thegermany.username = req.body.username;
            thegermany.email = req.body.email;
            thegermany.password = hash;
    
            console.log(req.body.name);
            thegermany.save(function (err, goddess) {
                if (err)
                    return res.send(err);
                res.json({
                    "status": "OK",
                    data: goddess
                });
            });
        });  
    });

    app.post('/gods', function(req, res, next){
        Germany.findOne({email : req.body.email}, function(err, goddess){
            if(err){
                next(err)
            }
            else{
                if(bcrypt.compareSync(req.body.password, goddess.password)){
                    const token =jwt.sign({id: goddess._id}, req.app.get('gods'), {expiresIn:'1h'})
                    res.json({'status':'OK!', data: goddess, token:token})
                }
                else{
                    res.json({status:'ERROR!'})
                }
            }
        })
    })

    app.put("/gods", function (req, res) {
        Germany.findById(req.params.id, function(err, goddess) {
            if (err)
                return res.send(err);
            thegermany.name = req.body.name;
            thegermany.role = req.body.role;
            thegermany.also_known = req.body.also_known;
            thegermany.description = req.body.description;
            thegermany.username = req.body.username;
            thegermany.email = req.body.email;
            thegermany.password = req.body.password;
    
            thegermany.save(function (err, goddess) {
                if (err)
                    return res.send(err);
                res.json({
                    "status": "OK",
                    data: goddess
                });
            })
        })
    })

    app.delete("/gods", function (req, res) {
        Germany.findById(req.params.id, function (err, goddess) {
            if (err)
                return res.send(err);
   thegermany.remove(function (err, goddess) {
                if (err)
                    return res.send(err);
                res.json({
                    "status": "OK"
                });
            })
        })
    })
};

   // app.post('/gods', function(res, req){
    //     const german = new Germany()
    //     bcrypt.hash(req.body.password, 12, function(err, hash){
    //         german.username = req.body.username
    //         german.email = req.body.email
    //         german.password = hash
    //         german.name = req.body.name
    //         german.role = req.body.role
    //         german.also_known = req.body.also_known
    //         german.description = req.body.description

    //         console.log(req.body.username)
    //         german.save(function (err, german){
    //             if(err)
    //             return res.send(err)
    //             res.json({'status' : 'OK!', data : german})
    //         })
    //     })
    // })

    // app.post('/gods', function(req,res, next){
    //     Germany.findOne({email: req.body.email}, function(err, german){
    //         if(err){
    //             next(err)
    //         }
    //         else{
    //             if(bcrypt.compareSync(req.body.password, german)){
    //                 const token = jwt.sign({id: german._id}, req.app.get('billylab'),{expiresIn:'1h'})
    //                 res.json({'status':'OK!', data:german, token:token})
    //             }
    //             else{
    //                 res.json({status:'ERROR!'})
    //             }
    //         }
    //     })
    // })

    // app.put('/gods', function(req, res){
    //     Germany.findById(req.body.id, function(err, german){
    //         if(err)
    //         return res.send(err)
    //         german.username = req.body.username
    //         german.email = req.body.email
    //         german.password = req.body.password
    //         german.name = req.body.name
    //         german.role = req.body.role
    //         german.also_known = req.body.also_known
    //         german.description = req.body.description

    //         german.save(function(err, german){
    //             if(err)
    //             return res.send(err)
    //             res.json({'status': 'OK!', data:german})
    //         })
    //     })
    // })

    // app.delete('/gods/:id', function(req, res){
    //     Germany.findById(req.params.id, function(err, german){
    //         if(err)
    //         return res.send(err)
    //         german.remove(function(err){
    //             if(err)
    //             return res.send(err)
    //             res.json({'status': 'OK!'})
    //         })
    //     })
    // })