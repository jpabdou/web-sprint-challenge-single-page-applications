import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import "./App.css"

export default function Form(){
    const starterForm = {name: "", size: "", toppings: {pepperoni: false, pineapple: false, mushrooms: false, sausage: false}, toppingsCnt:0, specialInst: ""}
    const starterErrors = {name: "", size: "", toppingsCnt: "", toppings: "", specialInst: ""}
    const [form, setForm] = useState({...starterForm})
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState({...starterErrors})


    const formSchema = yup.object().shape({
        name:yup.string().required("Name required").min(2,"name must be at least 2 characters"),
        toppingsCnt: yup.number().min(1, "At least 1 topping required"),
        size: yup.string().oneOf(["S", "M", "L", "G"], "Pizza size required"),
        specialInst: yup.string(),
        toppings: yup.object()
    })

    useEffect(()=>{
        formSchema.isValid(form).then(valid=>setDisabled(!valid))
      },[form])  

    function setFormErrors(name, value){
        yup.reach(formSchema, name).validate(value)
        .then(()=>setErrors({...errors,[name]: ""}))
        .catch(err=> setErrors({...errors, [name]:err.errors[0]}))
      }
  

    function submit(evt) {
        evt.preventDefault();
        axios.post("https://reqres.in/api/orders", form)
            .then(res => {
                console.log(res.data)
                setForm({...starterForm})
                setErrors({...starterErrors})
            })
            .catch((err)=>{
                console.log(err)})
      }
  
    function onChange(evt) {
        const {checked,value,name} = evt.target
        if (name==="toppings") {
            form[name][value]= checked
            const count = Object.values(form[name]).filter(topping=> topping===true).length
            form.toppingsCnt = count
            setForm({...form})
            console.log(form)
            setFormErrors("toppingsCnt", form.toppingsCnt)
        } else {
            setForm({...form, [name]:value})
            setFormErrors(name,value)
        }
    }

    return(
        <div id="homePage">
            <header>
                <h1>Ordering</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <br></br>
                    <Link to="/pizza" id="order-pizza">Order Pizza</Link>
                </nav>
            </header>
            <p>{errors.name} {errors.size} {errors.toppingsCnt}</p>
            <form id="pizza-form" onSubmit={submit}>
                <label>
                    Full Name:
                    <input name="name" id="name-input" type="text" value={form.name} onChange={onChange}></input>
                </label>
                <br></br>
                <label>Pizza Size:
                <select name="size" id="size-dropdown" onChange={onChange} value={form.size}>
                    <option value="">Select your pizza size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="G">Giant</option>
                </select>
                </label>
                <br></br>
                <fieldset>
                <legend>Pizza Toppings:</legend>
                <div>
                    <label><input type="checkbox" name="toppings" value="pepperoni" checked={form.toppings.pepperoni} onChange={onChange}></input>Pepperoni</label>
                </div>
                <div>
                    <label><input type="checkbox" name="toppings" value="pineapple" checked={form.toppings.pineapple} onChange={onChange}></input>Pineapple</label>
                </div>
                <div>
                    <label><input type="checkbox" name="toppings" value="mushrooms" checked={form.toppings.mushrooms} onChange={onChange}></input>Mushrooms</label>
                </div>
                <div> 
                    <label><input type="checkbox" name="toppings" value="sausage" checked={form.toppings.sausage} onChange={onChange}></input>Sausage</label>
                </div>
                </fieldset>
                <br></br>
                <label>Special Instructions:
                <textarea name="specialInst" id="special-text" value={form.specialInst} onChange={onChange}></textarea>
                </label>
                <br></br>
                <button id="order-button" disabled={disabled}>Submit Order</button>
            </form>

        </div>


    )
}
