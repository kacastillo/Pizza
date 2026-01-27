document.getElementById("pizza-form").onsubmit = () => {
    
   function clearErrors() {
  const errors = document.getElementByClassName("err");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}

    let isValid = true;

// validate first name
let fname =document.getElementById("fname").value.trim();
if (!fname) {
    document.getElementById("err-fname").style.display = "block";
    isValid = false;
}

// validate last name
let lname =document.getElementById("lname").value.trim();
if (!lname) {
    document.getElementById("err-lname").style.display = "block";   
    isValid = false;
}

// validate email 
let email = document.getElementById("email").value.trim();
if (!email) {
    document.getElementById("err-email").style.display = "block";
    isValid = false;
    }

    // validate pizza size
    let size = document.getElementById("size").value;
    if (size === "none") {
        document.getElementById("err-size").style.display = "block";
        isValid = false;
    }

    //validate pickup or delivery
    let pickup = document.getElementById("pickup").checked;
    let delivery = document.getElementById("delivery").checked;
    if (!pickup && !delivery) {
        document.getElementById("err-pickup-delivery").style.display = "block";
        isValid = false;
    }

return isValid;
 }