
// GENERATIN RANDOM NUMBER
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//GENERATIN RANDOM NAME
var characterName;

function generateName(){
    var name1 = ["Den store","Den första","Den Krigande","Den Läkande","Den uthålliga","Den förvirrade","Den arbetslösa"]
    var name2 = ["Jätten","Gladiatorn","Gudinnan","Lejonet","Jokern","Dansösen"]

    function capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var name = capFirst(name1[getRandomInt(0, name1.length )]) + ' ' + capFirst(name2[getRandomInt(0, name2.length)]);
    characterName = name;
    document.getElementById("name").innerHTML = characterName;

}


//GENERATIN RANDOM SKILLS

function generateSkills(){
var skills = document.getElementsByClassName("skill");

[...skills].forEach(function(i) {
    number = getRandomInt(5,99);
    i.firstChild.nextSibling.innerHTML = number;
    i.style.width = number +"%";
    
  });

}

// DISPLEY CHARACTER BY TYPE 
document.getElementById("imgContainer").addEventListener("click", function(event){
    if(event.target.tagName === "IMG"){
        var type = event.target.nextElementSibling.textContent.toLowerCase();
    }
    displayCharacter((n)=> n.type ===  type)

});



// Click on generate button
document.getElementById("generate").addEventListener("click", function(){
    generateName();
    generateSkills();
    // duplicated = false;
});

// Save character when clicking on save button 
document.getElementById("save").addEventListener("click", function(){
    checkDup();
    createCharacter();
});

// show character when clicking on show
document.getElementById("show").addEventListener("click", function(){
    displayCharacter();
});

// Earse character after Displaying 
document.getElementById("erase").addEventListener("click", function(){
    document.getElementsByClassName("remove").remove();
});

document.getElementById("filter").addEventListener("click", function(){
    displayCharacter();
});

// Save character to arrey 
function createCharacter (){
    strength = Number(document.getElementById("strength").firstChild.nextSibling.textContent);
    vitality = Number(document.getElementById("vitality").firstChild.nextSibling.textContent);
    stamina = Number(document.getElementById("stamina").firstChild.nextSibling.textContent);
    name = document.getElementById("name").textContent;

    if(name.includes("Jätten")){
        type = "giant"
    } else if(name.includes("Gladiatorn")){
        type = "gladiator"
    } else if(name.includes("Gudinnan")){
        type = "goddess"
    } else if(name.includes("Lejonet")){
        type = "lion"
    } else if(name.includes("Jokern")){
        type = "joker"
    } else {
        type ="dancer"
    }


    id = mongoObjectId();

     obj = {
        strength: strength,
        vitality: vitality,
        stamina: stamina,
        name: name,
        type: type,
        id: id
       
    }
    save(obj);
}

function save(i) {
    
// CHECKING IF THERE IS CONTENT TO SAVE
if (document.getElementById("name").innerHTML === 'NAMN PÅ ROLLFIGUR' ){
    return alert("Finns ingen karaktär att spara")
}
let arr = [];

    if(localStorage.length == 0){
        arr.push(i)

    } else if (duplicated=== true ){
        console.log(duplicated);
        alert("Den här karaktären finns redan sparad")
        arr = getLocalS();

    } else {
        arr = getLocalS();
        arr.push(i)
    }
    console.log(i);
    localStorage.setItem('character', JSON.stringify(arr));   
}


// Check for duplicate 

var duplicated = false

  function checkDup(){
    let stored = getLocalS();
     if(!localStorage.length == 0){   
        for(var i = 0; i < stored.length; i++){
            if(document.getElementById("name").innerHTML === stored[i].name){
                duplicated = true;
            } else {
                duplicated = false;
            }
        }    
    }
}


// Get local storage 

function getLocalS() {
	var stored = JSON.parse(localStorage.getItem('character'));
    return stored
}


function displayCharacter(func = () => true){
    let x = getLocalS();
    // Sort on key
    x.sort(compare);
    let container = document.getElementById("characterContainer");
    document.getElementsByClassName("remove").remove();
        
        x.filter((n) => func(n)).forEach((x) => {
        
        let newDiv = document.createElement("div");
        let newName = document.createElement("h4");
        let newStrength = document.createElement("p");
        let newVitality = document.createElement("p");
        let newStamina = document.createElement("p");

        newName.innerHTML = ` ${x.name}`;
        newStrength.innerHTML = `strength: ${x.strength}`;
        newVitality.innerHTML = `vitality: ${x.vitality}`;
        newStamina.innerHTML = `stamina: ${x.stamina}`;

        
		newDiv.appendChild(newName);
        newDiv.appendChild(newStrength);
        newDiv.appendChild(newVitality);
        newDiv.appendChild(newStamina);
        container.appendChild(newDiv);
        newDiv.classList.add("remove");   
        });
    }


    // Function to remove elements with js

    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }

    // SORT FUNCTION 

    function compare(a, b) {
        let e = document.getElementById("filter");
        let selectValue = e.options[e.selectedIndex].value;

        switch(selectValue) {
            case "strength":
                var genreA = a.strength;
                var genreB = b.strength;
            break;
            case "vitality":
                var genreA = a.vitality;
                var genreB = b.vitality;
            break;
            default:
                var genreA = a.stamina;
                var genreB = b.stamina;
            break;

        }
    //     if(selectValue==="strength"){
    //     var genreA = a.strength;
    //     var genreB = b.strength;
    // } else if(selectValue==="vitality"){
    //     var genreA = a.vitality;
    //     var genreB = b.vitality;
    // } else {
    //     var genreA = a.stamina;
    //     var genreB = b.stamina;
    // }
       
      
        // let comparison = 0;
        // if (genreA < genreB) {
        //   comparison = 1;
        // } else {
        //   comparison = -1;
        // }
        let comparison = (genreA < genreB) ? 1 : -1;
        return comparison;
      }


    //   GENERATE ID


var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};