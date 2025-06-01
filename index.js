import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { name } from "ejs";

const app = express();
const port = 1000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/random", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/random.php");
        // console.log(JSON.stringify(result.data.drinks[0].strDrink));
        // console.log(JSON.stringify(result.data.drinks[0].strDrinkThumb));
        // console.log(JSON.stringify(result.data.drinks.length));
        res.render("index.ejs", {
            name: result.data,
            img: result.data,   
            id: result.data,
            instructions: result.data,
            array: result.data.drinks,
        });
    } catch (error) {
        console.log("Failed to fetch data. Please check your internet connection.");
    }
});

app.post("/filter" , async (req, res) => {
    try {
        console.log(req.body.select);
        const result = await axios.get(API_URL + `/filter.php?c=${req.body.select}`);
        // console.log(JSON.stringify(result.data));
        res.render("index.ejs", {
            name: result.data,
            img: result.data,   
            id: result.data,
            array: result.data.drinks,
        });
    } catch (error) {
        console.log("Failed to fetch data. Please check your internet connection.");
    }
});

app.post("/searchByName" , async (req, res) => {
    try {
        // console.log(req.body.name);
        const result = await axios.get(API_URL + `/search.php?s=${req.body.name}`);
        // console.log(JSON.stringify(result.data));
        res.render("index.ejs", {
            name: result.data,
            img: result.data,   
            id: result.data,
            instructions: result.data,
            array: result.data.drinks,
        });
    } catch (error) {
        console.log("Failed to fetch data. Please check your internet connection.");
    }
});

app.post("/searchById" , async (req, res) => {
    try {
        // console.log(req.body.id);
        const result = await axios.get(API_URL + `/lookup.php?i=${req.body.id}`);
        // console.log(JSON.stringify(result.data));
        res.render("index.ejs", {
            name: result.data,
            img: result.data,   
            id: result.data,
            instructions: result.data,
            array: result.data.drinks,
        });
    } catch (error) {
        console.log("Failed to fetch data. Please check your internet connection.");
    }
});

app.listen(port, () => {
    console.log(`Drinking on port ${ port } =>`);
});