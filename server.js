var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require("fs");

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'secretUser'}))


/* S'il n'y a pas d'utilisateur dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.user) == 'undefined') {
        req.session.user = "";
    }
    next();
})

/* On affiche l'index et le formulaire */
.get('/', function(req, res) { 
    res.render('index.ejs', {todolist: req.session.user});
})

/* On ajoute un élément à la todolist 
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})
*/

/* Supprime un élément de la todolist 
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
*/

/* On redirige vers l'index si la page demandée n'est pas trouvée, doit etre toujour en dernier, car fin de route. */
.use(function(req, res, next){
    res.redirect('/');
})

.listen(8080);

/*

quand un utilisateur arrive, il est dirigé vers la page de connection
si il n'as pas de compte, il y a une page d'enregistrement
les infos de connexion ne sont pas codées en claire.

une fois connecter, l'utilisateur peux enregistrer un projet et y ajouter des membres deja enregitrés sur le site.
ou voir la liste des projet.

un utilisateur ne peut etre ajouter que dans un seul et unique projet.

quand une variable sera changé par un admin, la page des projet afficher les possibilitées de likes sur chaque projet.
quand on like le projet, le nom de la personne est ajouter dans l'objet json du projet. chaque projet ne peux avoir qu'un like d'un utilisateur.

un utilisateur n'est pas obligatoirement lié a un projet.

si j'ai du temps, je peux faire une page qui affichera un classement des projet par point

chaque projet sera trié par id. premier arrivé, premier affiché.

une page permettra au jury de classer les projet par ordre de preference
*/