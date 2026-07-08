// Get HTML elements
const username = document.getElementById("username");
const password = document.getElementById("password");
const progressBar = document.getElementById("progress-bar");
const strengthText = document.getElementById("strength-text");
const suggestionList = document.getElementById("suggestion-list");
const saveBtn = document.getElementById("saveBtn");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");

// Requirement list
const lengthCheck = document.getElementById("length");
const upperCheck = document.getElementById("uppercase");
const lowerCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");


// Check password whenever user types
password.addEventListener("input", checkPassword);


// Show / Hide Password
showPassword.addEventListener("change", function () {

    if (showPassword.checked) {
        password.type = "text";
    }
    else {
        password.type = "password";
    }

});


// Save Password Button
saveBtn.addEventListener("click", savePassword);


// -------------------------
// Check Password Function
// -------------------------

function checkPassword() {

    fetch("/check", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username: username.value,

            password: password.value

        })

    })

    .then(response => response.json())

    .then(data => {

        updateStrength(data);

        updateSuggestions(data.suggestions);

        updateChecklist();

    });

}



// -------------------------
// Update Strength Bar
// -------------------------

function updateStrength(data){

    progressBar.style.width = data.score + "%";

    strengthText.innerHTML =
        data.strength + " (" + data.score + "%)";

    if(data.strength==="Weak"){

        progressBar.style.background="red";

    }

    else if(data.strength==="Medium"){

        progressBar.style.background="orange";

    }

    else{

        progressBar.style.background="green";

    }

}



// -------------------------
// Suggestions
// -------------------------

function updateSuggestions(suggestions){

    suggestionList.innerHTML="";

    suggestions.forEach(function(item){

        let li=document.createElement("li");

        li.innerHTML=item;

        suggestionList.appendChild(li);

    });

}



// -------------------------
// Checklist
// -------------------------

function updateChecklist(){

    let pass=password.value;

    updateItem(lengthCheck,pass.length>=12);

    updateItem(upperCheck,/[A-Z]/.test(pass));

    updateItem(lowerCheck,/[a-z]/.test(pass));

    updateItem(numberCheck,/\d/.test(pass));

    updateItem(specialCheck,
    /[!@#$%^&*(),.?":{}|<>]/.test(pass));

}



// -------------------------
// Helper Function
// -------------------------

function updateItem(item,status){

    if(status){

        item.innerHTML=item.innerHTML.replace("❌","✅");

    }

    else{

        item.innerHTML=item.innerHTML.replace("✅","❌");

    }

}



// -------------------------
// Save Password
// -------------------------

function savePassword(){

fetch("/save",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

username:username.value,

password:password.value

})

})

.then(response=>response.json())

.then(data=>{

message.innerHTML=data.message;

});

}