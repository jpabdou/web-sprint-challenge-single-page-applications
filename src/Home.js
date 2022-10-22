import React from "react";
import { Link } from "react-router-dom";
import "./App.css"

export default function Home(){
    return(
        <div id="homePage">
            <header>
                <h1>Lambda Eats</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <br></br>
                    <Link to="/pizza" id="order-pizza">Order Pizza</Link>
                </nav>
            </header>
            <h2>Welcome! Our page may be a little undercooked, but our pizzas sure aren't! Click the order link above or <Link to="/pizza">here!</Link></h2>
        </div>


    )
}
