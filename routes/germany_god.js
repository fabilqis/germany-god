var germany_god = require("../models/germany_god").germany_god;
module.exports = function(app){

    app.get("/gods", function(req, res){
        germany_god.find({}, function(err, gods){
            if (err)
            return res.send(err);
            res.json(gods)
        });
    });

    app.get("/gods/:id", function(req, res){
        germany_god.find({"_id":req.params.id}, function(err, gods){
            if (err)
            return res.send(err);
            res.json(gods)
        });
    });

    app.post("/gods", function(req, res){
        var gods= new germany_god();
        gods.name = req.body.name;
        gods.role = req.body.role;
        gods.also_known = req.body.also_known;
        gods.description = req.body.description;

        console.log(req.body.name);
        gods.save(function(err, gods){
            if(err)
            return res.send(err);
            res.json({"status" : "OK", data:gods});
        });
    });

    app.put("/gods", function(req, res){
        germany_god.findById(req.params.id, function(err, gods){
            if(err)
            return res.send(err);
            gods.name = req.body.name;
            gods.role = req.body.role;
            gods.also_known = req.body.also_known;
            gods.description = req.body.description;

            gods.save(function(err, gods){
                if(err)
                return res.send(err);
                res.json({"status":"OK", data:gods});
            })
        })
    })

    app.delete("/gods", function(req, res){
        germany_god.findById(req.params.id, function(err, gods){
            if(err)
            return res.send(err);
            gods.remove(function(err, gods){
                if(err)
                return res.send(err);
                res.json({"status":"OK"});
            })
        })
    })
};