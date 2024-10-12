import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
const app = express();
const PORT = 5000;


// all body req should be json
app.use(bodyParser.json());

// creating connection into mysql
const db = mysql.createConnection({
    host: 'localhost' ,
    user: 'root',
    password: 'lezgosqllearn21' ,
    database: 'movie_db'
});

// if the connection is successful and else
db.connect((err) => {
    if(!err){
        console.log("DB connection succeded") }
    else{
        console.log("DB connection failed \n Error:" + err);
    }
       
});

// listens for incoming requests on the specified PORT
app.listen( PORT ,() => console.log(`Server is running on http://localhost:${PORT}`)) ;


// returns all movies
app.get('/movies', (req,res) => {
    db.query('SELECT * FROM movies_db',(err,rows,fields)=> {

        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});


// returns a movie with a specific id
app.get('/movies/:id', (req,res) => {
    db.query('SELECT * FROM movies_db WHERE id = ?',[req.params.id],(err,rows,fields)=> {
 
        if (!err) {
            if (rows.length === 0) {
                return res.status(404).send('Movie not found'); //respond if the movie id is not found
            }
            res.send(rows[0]); // Send the specific movie found
        } else {
            console.error('Error retrieving movie:', err);
            res.status(500).send('Error retrieving movie');
        }

    });
});


//create or add a new movie in the table


app.post('/movies', (req,res) => {

    const { title, director, year, genre} = req.body;

    if(!title || !director  || !year || !genre){
        return res.status(400).send(`All fields are required`);
    }


    const sql = 'INSERT INTO movies_db( title,director,year,genre ) VALUES(?,?,?,?)';
    db.query(sql,[ title,director,year,genre ],(err,result) => {

        if(err){
            console.error('Error inserting data:', err);
            return res.status(500).send('Error adding movie');
        } 
        res.status(201).send('Movie Successfully added to the List of Movies');
    });

});


// Updates an existing movie 

app.put('/movies/:id', (req, res) => {
    const { id } = req.params; // gets the id http://localhost:P0RT/:id
    const { title, director, year, genre } = req.body;
    
   
    if (!title || !director || !year || !genre) {
    return res.status(400).send('All fields (title, director, year, genre) are required');
    }
    
    const sql = 'UPDATE movies_db SET title = ?, director = ?, year = ?, genre = ? WHERE id = ?';
    db.query(sql, [title, director, year, genre, id], (err, results) => {
        
    if (err) {
    return res.status(500).send({ message: 'Updating movie unsuccessful.', error: err }); // return if thre is a error in the server
    }
    
    if (!results.affectedRows) {
        return res.status(404).send('Movie not found');  // return if the movie wth specific id was not found
    }
    
    
    // return the updated movie
    const updatedMovie = {
    id,
    title,
    director,
    year,
    genre
    };
    
    res.send('Movie updated successfully');
    });
    });


//delete a movie with a specific id

app.delete('/movies/:id', (req,res) => {
    db.query('DELETE FROM movies_db WHERE id = ?',[req.params.id],(err,rows,fields)=> {
 
        if (!err) {
            if (rows.affectedRows === 0) { // checks if the rows is equal 0
                return res.status(404).send('Movie not found, nothing was deleted'); // return if the movie with specific id iis not found
            }
            res.send('The movie has been deleted.'); // return if the movie is found
        } else {
            console.error('Error deleting movie:', err);
            res.status(500).send('Error deleting movie');
        }
    });
});

// this is just the homepage

app.get('/',(req,res) => {

    res.send(`Hello from Home Page, I'm Gilbert John Gallega`)
});
