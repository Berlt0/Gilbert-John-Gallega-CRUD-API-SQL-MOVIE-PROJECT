# Gilbert-John-Gallega-CRUD-API-SQL-MOVIE-PROJECT

 This API  allow users to perform basic CRUD operations (Create, Read, Update, Delete). Including some basic validation and error handling and  myqsl database.

Each movie should have the following properties:
id (auto-generated, number)
title (string, required)
director (string, required)
year (number, required)
genre (string, required)

## How to install

1. First fo to file manager and create folder and open that folder and right click and open terminal and type code . 
2. After going to vscode open terminal and type   npm init -y  to create default package.json
3. After that type   npm install express mysql2 body-parser   so that you can import express , mysql, and body parser
4. In starting the server you type to the terminal  node index.js
5. And after you can see http://localhost:5000 if you write a code ` app.listen(PORT, () => console.log(``Server is running on http://localhost:${PORT}`)`

## How to know if the code is running 

- type http://localhost:5000 in the browser or thunder client
- Get http://localhost:5000/movies  to RETURN THE LIST OF MOVIES
- In GETTING MOVIE WWITH SPECIFIC ID , you can do GET http://localhost:5000/movies/3     ( ex. 2)
  and it will show you the movie with the specific id
- In ADDDING OR CREATING  a movie . use POST     and write the properties for exmple

  ```javascript
   
   {
     "title": "King Kong ",
     "director": "Peter Jackson",
     "year": 2005,
     "genre":  "Adventure , Action"
   }

The id is not included because it is auto generated.
  

- In UPDATING movie with a specific id  , just do PUT  `http://localhost:5000/movies/specific_id( ex. 2)`
  and it will return to the movie with a specific id and write the properties you want to change
     Example:

  ```javascript

     "title": "King Kong ", // you want to change it to "The Nun"
     "director": "Peter Jackson",             //   -     "Corin Hardy"
     "year": 2005,                            //   -     "2018"
     "genre":  "Adventure , Action"           //   -     "Horror,Mystery"
  
  

 In DELETING movie with a specific id , just go DELETE   `http://localhost:5000/movies/specific_id( ex. 2)`
 and it will delete the movie with the specified id


  

