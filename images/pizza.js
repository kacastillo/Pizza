document.getElementById("pizza-form").onsubmit = () => {

    let isValid = true;
// validate first name
let fname =document.getElementById("fname").value.trim();
if (!fname) {
    document.getElementById("err-fname").style.display = "block";
}

// validate last name
let lname =document.getElementById("lname").value.trim();
if (!lname) {
    document.getElementById("err-lname").style.display = "block";   
}
return isValid
}