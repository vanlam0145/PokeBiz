const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const pokeRoutes = express.Router();
const PORT = 4000;

const random = require('random');
let Account = require('./account.model');
let Character = require('./character.model');
let Pokestop = require('./pokestop.model');
let Pokemon = require('./pokemon.model');
let User = require('./user.model');
let Admin = require('./admin.model');
let Item = require('./item.modal');
// var session = require('express-session');
var idchar = '';

app.use(cors());
app.use(bodyParser.json());
// mongoose.connect('mongodb://127.0.0.1:27017/testpokevs1', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://cross:123xyz@cluster0-lstqi.mongodb.net/pokebizz?retryWrites=true', { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', function () {
//     console.log("MongoDB database connection established successfully");
// })
mongoose.connect('mongodb+srv://cross:123xyz@cluster0-lstqi.mongodb.net/pokebizz?retryWrites=true', { useNewUrlParser: true }, (err) => {
    if (err)
        console.log('Error in DB connection : ' + err);
    console.log('connect');
});

pokeRoutes.route('/char/checkexisacc/:usernamepr').get(function (req, res) {
    Account.findOne({ username: req.params.usernamepr }, function (err, account) {
        if (!account)
            res.json("dcdangki");
        else {
            res.json("tkcoroi");
        }
    })
});
pokeRoutes.route('/char/getAll/:id').get(function (req, res) {
    Character.findById(req.params.id, function (err, character) {
        if (!character)
            res.status(404).send("data is not found");
        else
            res.json(character);     
    })
})
pokeRoutes.route('/char/bag/:id').get(function (req, res) {
    Character.findById(req.params.id, function (err, character) {
        if (!character) {
            res.status(404).send("data is not found");
        } else {
            res.json(character.pokemonofyou);
        }
    })
});
pokeRoutes.route('/char/item/:id').get(function (req, res) {
    Character.findById(req.params.id, function (err, character) {
        if (!character)
            res.status(404).send("data is not found");
        else {
            Item.find(function (err, item) {
                if (err)
                    console.log(err);
                else {
                    var LeIOU = character.itemofyou.length;
                    var LeI = item.length
                    for (var ii = 0; ii < LeIOU; ii++) {
                        for (var jj = 0; jj < LeI; jj++) {
                            if (character.itemofyou[ii]._id == item[jj]._id) {
                                var itemadd = {
                                    _id: item[jj]._id,
                                    infox: {
                                        name: item[jj].name,
                                        image: item[jj].image,
                                        infor: item[jj].infor,
                                        rate: item[jj].rate
                                    },
                                    count: character.itemofyou[ii].count
                                }
                                character.itemofyou[ii] = itemadd;
                            }
                        }
                    }
                    res.json(character.itemofyou);
                }
            })
        }
    })
});
pokeRoutes.route('/char/checkacc/:usernamepr/:passpr').get(function (req, res) {
    Account.findOne({ username: req.params.usernamepr }, function (err, account) {
        if (!account)
            res.json("saiuser");
        else {
            var obj = { _idchar: '', check: '', _idad: '' };
            if (account.pass == req.params.passpr) {
                if (!account.isadmin) {
                    obj.check = 'dungr';
                    User.findOne({ _idacc: account._id }, function (err, user) {
                        obj._idchar = user._idchar;
                        //console.log('truoc');
                        // req.session.lam=user._idchar;
                        // console.log(req.session.lam);
                        idchar = user._idchar;
                        console.log(idchar);
                        res.json(obj);
                    })
                }
                else {
                    obj.check = 'isadmin';
                    Admin.findOne({ _idacc: account._id }, function (err, admin) {
                        obj._idad = admin._id;
                        res.json(obj);
                    })
                }
            }
            else {
                obj.check = 'sair';
                res.json(obj)
            };
        }
    })
});
pokeRoutes.route('/acc').get(function (req, res) {
    Account.find(function (err, account) {
        if (err)
            res.status(404).send("data is not found");
        else
            res.json(account);
    })
});
pokeRoutes.route('/char/:id').get(function (req, res) {
    Character.findById(req.params.id, function (err, character) {
        if (err)
            res.status(404).send("data is not found");
        else
            res.json(character);
    })
})
pokeRoutes.route('/chars').get(function (req, res) {
    Character.find(function (err, character) {
        if (err)
            res.status(404).send("data is not found");
        else
            res.json(character);
    })
});
pokeRoutes.route('/pokestop').get(function (req, res, callback) {
    Pokestop.find(function (err, pokestop) {
        if (err)
            res.status(404).send("data is not found");
        else {
            Item.find(function (err, item) {
                if (err)
                    res.status(404).send("data is not found");
                else {
                    var LePS = pokestop.length
                    for (var ii = 0; ii < LePS; ii++) {
                        for (var jj = 0; jj < 2; jj++) {
                            var r = random.int(min = 0, max = 4);
                            var it = {
                                _id: item[r]._id,
                                name: item[r].name,
                                image: item[r].image,
                                count: 1
                            }
                            pokestop[ii].itemofpokeStop.push(it);
                        }
                    }
                    res.json(pokestop);
                }
            })
        }
    })
})
pokeRoutes.route('/item').get(function (req, res) {
    Item.find(function (err, items) {
        if (err)
            res.status(404).send("data is not found");
        else {
            var LeI = items.length;
            for (var i = 0; i < LeI; i++) {
                if (items[i].rate)
                    items[i].price = items[i].rate * 100;
                items[i].pb = 'item';
            }
            res.json(items);
        }
    })
})
pokeRoutes.route('/pokemon/:lat/:lng').get(function (req, res) {
    Pokemon.find(function (err, pokemon) {
        if (err)
            res.status(404).send("data is not found");
        else {
            console.log(req.params.lat,req.params.lng);
            var LeP = pokemon.length
            for (var i = 0; i < LeP; i++) {
                pokemon[i].lat = random.float(min = parseFloat(req.params.lat)-0.005, max = parseFloat(req.params.lat)+0.005);
                pokemon[i].lng = random.float(min = parseFloat(req.params.lng)-0.005, max = parseFloat(req.params.lng)+0.005);
                pokemon[i].pb = 'pokemon';
                pokemon[i].xh = false;
                pokemon[i].dex = '0.2';
                if (pokemon[i].lv && pokemon[i].cp && pokemon[i].catchBall)
                    pokemon[i].price = pokemon[i].lv * 10 + pokemon[i].cp * 10 + pokemon[i].catchBall * 100
            }
            res.json(pokemon);
        }
    })
})

pokeRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Account.findById(id, function (err, account) {
        res.json(account);
    });
});

pokeRoutes.route('/char/additem').post(function (req, res) {
    Character.findById(req.body.idchar, function (err, character) {
        if (!character)
            res.status(404).send("data is not found");
        else {
            var pokeStops = req.body;
            var LeIOPS = pokeStops.itemofpokestop.length;
            console.log(pokeStops);
            console.log(character);
            console.log(LeIOPS)
            for (var ii = 0; ii < LeIOPS; ii++) {
                var a = { _id: pokeStops.itemofpokestop[ii]._id, count: 1 }
                console.log(a);
                var kttt = 0;
                var LeIOU = character.itemofyou.length;
                console.log(LeIOU)
                for (var jj = 0; jj < LeIOU; jj++) {
                    console.log(a._id)
                    if (character.itemofyou[jj]._id == a._id) {
                        console.log('trungnhau');
                        character.itemofyou[jj].count = Number(character.itemofyou[jj].count) + 1;
                        console.log(character.itemofyou[jj].count)
                        character.save().then(character => { res.json('get olditem') }).catch(err => {
                            res.status(400).send("Update not possibless");
                        });
                        break;
                    }
                    else
                        kttt += 1;
                }
                if (kttt == LeIOU) {
                    console.log('kotrungnhau');
                    character.itemofyou.push(a);
                    character.save().then(character => { res.json('get olditem') }).catch(err => {
                        res.status(400).send("Update not possibless");
                    });
                }
            }
        }
    })
});
pokeRoutes.route('/char/update/').post(function (req, res) {
    Character.findById(req.body.idchar, function (err, character) {
        if (!character)
            res.status(404).send("data is not found");
        else {
            character.coin = character.coin - req.body.item.price;
            if (req.body.item.pb == 'pokemon') {
                console.log('mua pokemon')
                var pokemonn = {
                    _id: req.body.item._id,
                    name: req.body.item.name,
                    cp: req.body.item.cp,
                    lv: req.body.item.lv,
                    image: req.body.item.image,
                }
                character.pokemonofyou.push(pokemonn);
                character.save().then(character => { res.json('get olditem') }).catch(err => {
                    res.status(400).send("Update not possibless");
                });
            }
            if (req.body.item.pb == 'item') {
                console.log('mua item')
                var itemm = {
                    _id: req.body.item._id,
                    count: '1'
                }
                var kttt = 0;
                LePOU = character.itemofyou.length;
                for (var ii = 0; ii < LePOU; ii++) {
                    if (character.itemofyou[ii]._id == req.body.item._id) {
                        console.log('trung nhau')
                        character.itemofyou[ii].count = Number(character.itemofyou[ii].count) + 1;
                        character.save().then(character => { res.json('get olditem') }).catch(err => {
                            res.status(400).send("Update not possibless");
                        });
                        break;
                    }
                    else
                        kttt += 1
                }
                if (kttt == LePOU) {
                    character.itemofyou.push(itemm);
                    character.save().then(character => { res.json('get olditem') }).catch(err => {
                        res.status(400).send("Update not possibless");
                    });
                }
            }
        }
    });
});
pokeRoutes.route('/char/addpokemon/').post(function (req, res) {
    Character.findById(req.body.idchar, function (err, character) {
        console.log(idchar)
        if (!character)
            res.status(404).send("data is not found");
        else {
            var a = {
                _id: req.body.onePoke._id,
                name: req.body.onePoke.name,
                cp: req.body.onePoke.cp,
                lv: req.body.onePoke.lv,
                image: req.body.onePoke.image
            }
            character.pokemonofyou.push(a);
            character.save().then(character => { res.json('get one pokemon!') }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    })
});

pokeRoutes.route('/update/:id').post(function (req, res) {
    Account.findById(req.params.id, function (err, account) {
        if (!account)
            res.status(404).send("data is not found");
        else
            account.username = req.body.username;
        account.pass = req.body.pass;
        account.isdadmin = req.body.isadmin;
        account.creadate = req.body.creadate;
        account.save().then(account => {
            res.json('account updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
pokeRoutes.route('/add').post(function (req, res) {
    let account = new Account(req.body);
    account.save()
        .then(account => {
            res.json(account);
        })
        .catch(err => {
            res.status(400).send('adding new account failed');
        });
});
pokeRoutes.route('/acc').get(function (req, res) {
    Account.find(function (err, account) {
        if (err)
            console.log(err);
        else
            res.json(account);
    })
});
pokeRoutes.route('/adduser').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'user added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});
app.use('/poke', pokeRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port...: " + PORT);
});