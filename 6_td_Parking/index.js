// npm init -y (pour le json package)
// npm i express (pour express)
// npm i body-parser
//-------------------------------------------------------
//body-parser extrait la partie entière du corps d'un flux 
//de demandes entrantes et l'expose sur req.body .
//-------------------------------------------------------
const express = require('express')
const fs = require('fs')
let bodyParser = require('body-parser')
const url = require('url')

let app = express()
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static('public'))
let port = 8080

let parkings_data = require("./parkings.json")
let reservation_data = require("./reservations.json")

//html
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

//########## Parkings ###############################################################################
// afficher tous les parkings
app.get('/parkings',function(req,res){
    res.json(parkings_data)
})
// afficher un parking en particulier
app.get('/parkings/:id',function(req,res){
    //console.log((req.params.id))
    //console.log(req.params)
    const found = parkings_data.find(parking => parking.id == req.params.id)
    res.json(found)
})
// supprimer un parking avec son id
app.delete('/parkings/delete/:id',function(req,res){
    const found = parkings_data.find(parking => parking.id == req.params.id)
    //console.log(found)
    parkings_data.splice(parkings_data.indexOf(found),1)
    //console.log(parkings_data)
    res.json(parkings_data)
})
// ajouter un parking à la fin du JSON
app.post('/parkings/add',function(req,res){
    /*let data = {
        "id": "TEST",
        "name":"Parking TEST",
        "type": "AIRPORT TEST",   //<----à écrire dans le raw de POSTMAN
        "city": "TEST"
    }*/
    // voir méthode splice( ajouter "data" à la fin du JSON)
    parkings_data.splice(parkings_data.length,0,req.body)
    console.log(parkings_data)
    res.json(parkings_data)
})
// Modifier un parking
app.patch('/parkings/modif/:id',function(req,res){
    const found = parkings_data.find(parking => parking.id == req.params.id)
    found.name=req.body.name
    found.type=req.body.type
    found.city=req.body.city
    res.json(parkings_data)
    // A envoyer en RAW format JSON dans le body
    /*{
        "name":"Parking TEST",
        "type":"AIRPORT TEST",
        "city":"TEST"
    }*/
})

//########## Reservation ###########################################################################
// Prendre une réservation d’une place dans un parking
app.post('/parking/reservations/:id',function(req,res){
    const found = parkings_data.find(parking => parking.id == req.params.id)

    reservation_data.splice(reservation_data.length,0,req.body)
})
// Lister l’ensemble des réservations
app.get('/parking/reservations',function(req,res){
    res.json(reservation_data)
})
//Afficher les détails d’une réservation en particulier
app.get('/parking/reservations/:id',function(req,res){
    const found = reservation_data.find(resa => resa.id == req.params.id)
    res.json(found)
})
//Supprimer une réservation
app.delete('/parking/reservations/delete/:id',function(req,res){
    const found = reservation_data.find(resa => resa.id == req.params.id)
    reservation_data.splice(reservation_data.indexOf(found),1)
    res.json(reservation_data)
})

//port d'écoute
app.listen(port)
console.log("\n\nserver launched at : localhost:"+port)