const express = require('express')
const fs = require('fs')
let bodyParser = require('body-parser')
const url = require('url')

let app = express()
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
let port = 8080

let matches_data = require("./matches.json")
let reservations = []

//########## Actions UTILISATEUR ###############################################################################
// afficher la liste des matchs (filtrer les matchs passés)
app.get('/matches',function(req,res){
    let date_today = new Date()
    let date_json = date_today.toJSON()
    console.log(date_json)
    let found = matches_data.filter(matches => matches.date > date_json)
    console.log(found)
    res.json(found)
})
// L'utilisateur réserve une place pour un match avec un pseudo
app.get('/matches/:id/reservation/:pseudo',function(req,res){
    let resa = Math.floor(Math.random()*10)+req.params.pseudo
    let reserv = {"match" : req.params.id, "name" : req.params.pseudo, "reservation" : resa}
    let data = "match n° "+req.params.id +" réservé par "+req.params.pseudo+
    " Notez bien votre numéro de réservation "+resa
    reservations.push(reserv)
    res.json(data)
})
// L'utilisateur annule sa réservation (grâce à une id fournie)
app.get('/delete/reservation/:resa_num',function(req,res){
    const found = reservations.find(resa => resa.reservation == req.params.resa_num)
    if (found === undefined) {
        console.log("cette réservation n'éxiste pas")
    } else {
        if(found.reservation == req.params.resa_num) {
            reservations.splice(reservations.indexOf(found),1)
        }
        res.json(" La réservation "+ req.params.resa_num +" a bien été supprimée")
    } 
})

//########## Actions GESTIONNAIRE ###########################################################################
// Consulter la liste des réservations pour un match.(en fournisant l'id du match)
app.get('/visualise/reservation/:match_num',function(req,res){
    const found = reservations.filter(match_num1 => match_num1.match == req.params.match_num)
    res.json(found)
})
// Créer une nouveau match (avec une requête POST + json formaté) 
app.post('/matche/add',function(req,res){
    /*let data = {
        "id": "TEST",
        "date":"Parking TEST",
        "lieu": "AIRPORT TEST",   //<----à écrire dans le raw de POSTMAN
        "nom du stade": "TEST"
    }*/
    // voir méthode splice( ajouter "data" à la fin du JSON)
    matches_data.splice(matches_data.length,0,req.body)
    res.json(matches_data)
})

//port d'écoute
app.listen(port)
console.log("\n\nserver launched at : localhost:"+port)