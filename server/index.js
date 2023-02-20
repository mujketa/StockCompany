const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const mysql = require ("mysql2");
const cors = require ("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mujketa7265",
    database: "db_zalihe224"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();  
  
  })

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM korisnik_db";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
})

app.get("/api/get/sirovine", (req, res) => {
    const sqlGet = "SELECT * FROM sirovine_db";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
})

app.get("/api/get/proizvodi", (req, res) => {
    const sqlGet = "SELECT * FROM proizvodi_db";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    })
})

app.post("/api/post", (req, res) =>{
    const {ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza} = req.body;
    const sqlInsert = "INSERT INTO korisnik_db (ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza], (error, result) =>{
        if (error) {
            console.log(error);
        }
    })

})

app.post("/api/post/sirovine", (req, res) =>{
    const {naziv, kolicina, min_kolicina, cijena, jedinica_mjere, koristenje, dobavljac_id} = req.body;
    const sqlInsert = "INSERT INTO sirovine_db (naziv, kolicina, min_kolicina, cijena, jedinica_mjere, koristenje, dobavljac_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [naziv, kolicina, min_kolicina, cijena, jedinica_mjere, koristenje, dobavljac_id], (error, result) =>{
        if (error) {
            console.log(error);
        }
    })

})

app.post("/api/post/proizvodi", (req, res) =>{
    const {naziv, slika, proizvodni_proces_id, marza, cijena} = req.body;
    const sqlInsert = "INSERT INTO proizvodi_db (naziv, slika, proizvodni_proces_id, marza, cijena) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [naziv, slika, proizvodni_proces_id, marza, cijena], (error, result) =>{
        if (error) {
            console.log(error);
        }
    })

})


app.delete("/api/remove/:id", (req, res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE from korisnik_db where id = ?"
    db.query(sqlRemove, id, (error, result) =>{
        if (error) {
            console.log(error);
        }
    })

})



app.delete("/api/remove/sirovine/:id", (req, res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE from sirovine_db where id = ?"
    db.query(sqlRemove, id, (error, result) =>{
        if (error) {
            console.log(error);
        }
    })

})

app.delete("/api/remove/proizvodi/:id", (req, res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE from proizvodi_db where id = ?"
    db.query(sqlRemove, id, (error, result) =>{
        if (error) {
            console.log(error);
        }
    })

})

app.get("/api/get/:id", (req, res) => {
    const{id}=req.params;
    const sqlGet = "SELECT * FROM korisnik_db WHERE id = ?";
    db.query(sqlGet, id,  (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.get("/api/get/sirovine/:id", (req, res) => {
    const{id}=req.params;
    const sqlGet = "SELECT * FROM sirovine_db WHERE id = ?";
    db.query(sqlGet, id,  (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.get("/api/get/proizvodi/:id", (req, res) => {
    const{id}=req.params;
    const sqlGet = "SELECT * FROM proizvodi_db WHERE id = ?";
    db.query(sqlGet, id,  (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/update/:id", (req, res) => {
    const{id}=req.params;
    const {ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza} = req.body;
    const sqlUpdate = "UPDATE korisnik_db SET ime = ?, prezime = ?, broj_telefona = ?, adresa = ?, email_adresa = ?, datum_zaposlenja = ?, datum_otkaza = ? WHERE id = ?";
    db.query(sqlUpdate, [ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza, id],  (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/update/sirovine/:id", (req, res) => {
    const{id}=req.params;
    const {naziv, kolicina, min_kolicina, cijena, jedinica_mjere, koristenje, dobavljac_id} = req.body;
    const sqlUpdate = "UPDATE sirovine_db SET naziv = ?, kolicina = ?, min_kolicina = ?, cijena = ?, jedinica_mjere = ?, koristenje = ?, dobavljac_id = ? WHERE id = ?";
    db.query(sqlUpdate, [naziv, kolicina, min_kolicina, cijena, jedinica_mjere, koristenje, dobavljac_id, id],  (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/update/proizvodi/:id", (req, res) => {
    const{id}=req.params;
    const {naziv, slika, proizvodni_proces_id, marza, cijena} = req.body;
    const sqlUpdate = "UPDATE proizvodi_db SET naziv = ?, slika = ?, proizvodni_proces_id = ?, marza = ?, cijena = ? WHERE id = ?";
    db.query(sqlUpdate, [naziv, slika, proizvodni_proces_id, marza, cijena, id],  (error, result) =>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.get("/", (req, res) =>{
    const sqlInsert = "INSERT INTO korisnik_db (ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza) VALUES ('hamza', 'mujke', 'fdgfgfdgfd' ,'lupac40','hamzamujke@gmail.com','2020-12-01', '2020-12-01')";
    db.query(sqlInsert, (error, result) =>{
        console.log("error", error);
        console.log("result", result);
        res.status(200).json("helouuu");
    })


})

app.get("/sirovine", (req, res) =>{
    const sqlInsert = "INSERT INTO sirovine_db (naziv, kolicina, min_kolicina, cijena, jedinica_mjere, koristenje, dobavljac_id ) VALUES ('aluminij',1000,20,55,'tona','da',1)";
    db.query(sqlInsert, (error, result) =>{
        console.log("error", error);
        console.log("result", result);
        res.status(200).json("helouuu");
    })


})

app.get("/proizvodi", (req, res) =>{
    const sqlInsert = "INSERT INTO proizvodi_db (naziv, slika, proizvodni_proces_id, marza, cijena) VALUES ('armirana zica','https://zenica.arcelormittal.com/wp-content/uploads/2022/02/19212.jpg',1,50,'150')";
    db.query(sqlInsert, (error, result) =>{
        console.log("error", error);
        console.log("result", result);
        res.status(200).json("helouuu");
    })


})


app.listen(5000, () =>{
    console.log("Server is running on port 5000");
})
