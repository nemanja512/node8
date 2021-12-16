var express = require('express');
var path = require('path');
var app=express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const con = mysql.createConnection({
host: 'localhost', user: 'root',database: 'prodavnica'
});
app.set('view engine','pug');
app.get('/proizvod/:id',function(req,res)
{
        var id=req.params.id;   
        let upit = `SELECT pdroizvodi.id,proizvodi.ime,proizvodi.cena,proizvodi.kolicina, dobavljaci.ime as ime_dobavljaca,kategorije.ime as naziv_kategorije FROM proizvodi INNER JOIN dobavljaci ON dobavljaci.id=proizvodi.dobavljac_id INNER JOIN kategorije ON kategorije.id=proizvodi.kategorija_id WHERE proizvodi.id=?`;
        con.query( upit,[id], function(err, rows) 
        {
            if (err)
            {
                res.render('prikaz',{greska:'Dogodila se greška.Pokušajte kasnije.'});
                throw err;
            }
            var row=rows[0];//posto uvek vraca niz,a mi selektujemo samo 1 proizvod,tako da ce u ovom slucaju uvek vratiti samo 1 element u nizu
            res.render('prikaz',{proizvod:row});
        });
    
})
app.listen(3000)

    
