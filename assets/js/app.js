//alert("bienvenue dans la todo list des vrais !");

//creates an INT starting at 0 to count the LI that will be created
var currentTasks = "current tasks"

function loadLocal() {
    // var localTotal = localStorage.length;
    // console.log(localTotal);
        //this can be useful to count the localstorage items, unused but kept for learning purposes
    co=0
    //I create a blank counter

    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            //Now we check all items in the local storage
        co++;
            //for each one the counter is incremented

        var val1 = JSON.parse(localStorage.getItem('toDoCheck'+co));
            //now I search only for the keys with toDoCheck, it's a little bit cumbersome, but it actually works
    
        var val2 = val1["liContent"];  
            //now looking for the values licontent, the rest is just html magic

        var ul = document.getElementById('toDoList');

        ul.insertAdjacentHTML('beforeend', val2);  
                
      }
}

function addFunction() {
    //function : when the user click on "Ajouter", the input text is displayed 

    if(currentTasks in localStorage){
        var a = JSON.parse(localStorage.getItem(currentTasks));
    } else {
        var a = 0;
    }

    var inputValue = document.getElementById("taskInput").value;
    //gets the value set by the user in the input
    if (inputValue.length == 0)  
    //If the user input is empty,
    {   
       alert("Pas de texte entré !");        
       return false; 
       //stop all, tell the user and do nothing
    }

    if(inputValue in localStorage){
        //if the user input already exists in the localstorage
        alert('La tâche existe déjà !');
        //alert and end the task (the remainder is in the ELSE)
    } else {
    //else, set the user input in a localstorage, as val/val
    inputValue.value = a;
//    storage.removeItem("current tasks");
    a++;
    //the "a" val that started is incremented with each LI created, so each LI has a different INT value
    localStorage.setItem("current tasks", a);

    var inputValue = document.getElementById("taskInput").value;
    //gets the input content
    localStorage.setItem(inputValue, "task_value");
    //puts the input in localstorage, so that you can't enter multiple task with the same text
    var list = document.getElementById("toDoList");
    //find the ul (named 'toDoList')

    var now = new Date();
    //gets the current date and hour to display
    //and below, the current date and hour is stored in milliseconds to be reused later to know how long it took to complete it.
    var n = now.getTime();
//    localStorage.setItem("hourAdded"+a, n);

    var currentHour = now.toLocaleTimeString("fr-FR");
    var currentDate = now.toLocaleDateString("fr-FR");
    //format the date & so it's actually readable

    var contentLi = "<li id=\"li"+a+"\" name=\""+a+"\"><input name=\"interest\" type=\"checkbox\" id=\"toDoCheck"+a+"\" class=\"check\" onchange=\"removeTask(this)\"><label id=\"label"+a+"\" name=\""+a+"\" for=\"toDoCheck"+a+"\" class=\"listItem\">"+inputValue+"</label>  "+currentHour+"  "+currentDate+"</li>"


    //<a name=\""+a+"\" class=\"removeBtn waves-effect waves-light\" "+a+"\" href=\"#\" onclick=\"remove(this)\">remove</a>
    //IMPORTANT : creates the visual value of the whole li, adding the input content, the checkbox, the hour, date and finally the remove button
    list.insertAdjacentHTML('beforeend', contentLi);
    //and this inserts all this string in the ul, since it's a li, it works
    //localStorage.setItem(contentLi, a);
    //the whole li is stored in locale storage, to be displayed again, I dunno.

//        var value = [inputValue,n]
        var value = {
            input: inputValue,
            time: n,
            liContent: contentLi
        }​​​​​​​;

        localStorage.setItem("toDoCheck"+a, JSON.stringify(value));
    }
}

function removeTask(checkboxElem) {
        //when the task is checked as completed, we click on the checkbox
    var idCheck = checkboxElem.id;
        //find the id of the checkbox

    if (checkboxElem.checked) {
        //if the checkbox is really checked

        checkboxElem.setAttribute("checked", "checked");

        var hourRemoved = new Date();
            //create a new current date (to know when it was set as completed)
        var tRemoved = hourRemoved.getTime();
            //correct the time so we can use it
        var hour = JSON.parse(localStorage.getItem(idCheck));
            //get back the local stored values of the input (to get the creation time)
        var hour1 = hour["time"];
            //getting the specific value of the creation time
        var timeDiff = tRemoved - hour1;
            //difference in ms      
        alert("Tâche complétée en "+timeDiff/1000+" secondes");
            //difference in seconds

    }
    else {
        checkboxElem.removeAttribute("checked");
        alert ("La tâche a été remise en cours");
            //else gives what happens if the task is back in To Do state (unchecked)
    }
    var liUpdate = checkboxElem.parentNode.outerHTML;
console.log(liUpdate);
    var liUpdated = JSON.parse(localStorage.getItem(idCheck));

    liUpdated.liContent = liUpdate;

    localStorage.setItem(idCheck, JSON.stringify(liUpdated));


    //var liUpdate = checkboxElem.parentNode.innerHTML;

    //var liUpdated = JSON.parse(localStorage.getItem(idCheck));
    //console.log(liUpdated);
    //idCheck.liContent = liUpdate;
}

//function remove(link) { 
    //YE OLDE CODE THAT WOULD NOT WORK
    //function for when you click on a remove button, it removes the parent object (in this case, the whole LI)
//    link.parentNode.parentNode.removeChild(link.parentNode);
//Now I need to remove both local storage values
//var idCheck = link.name;
//localStorage.removeItem("toDoCheck"+idCheck);
//OK POUR UN
//var labelx = ".label"+idCheck;
//console.log(labelx);
//}

function remove() {
    var list = document.getElementById("toDoList");
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    } 
    window.localStorage.clear();
}

var checkboxes = document.getElementById("toDoList").getElementsByTagName("input");
//search all checkboxes in the page
function filterOk(input) {
            //var checkboxesChecked = [];
                //create an empty table (optionnal)

    for (var i=0; i<checkboxes.length; i++) {
    // loop over all checkboxes in the page
       if (!checkboxes[i].checked) {
        // And stick the checked ones onto an array...
                //checkboxesChecked.push(checkboxes[i]);
                    //but allows to see if the value is correctly set (optionnal)
            checkboxes[i].parentNode.style.display='none';
                //all checkboxes in the array have their parent set to display none !
        }
        else {
            checkboxes[i].parentNode.style.display='block';
                //if the reverse is true, display it
        }
    }
//    console.log(checkboxesChecked);
}

function filterNot(input) {
    //function to hide the finished taskes
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxes[i].parentNode.style.display='none';               
        }
        else {
            checkboxes[i].parentNode.style.display='block';          
        }
    }
}

function filterAll(input) {
        //function to hide the current taskes
    for (var i=0; i<checkboxes.length; i++) {
        checkboxes[i].parentNode.style.display='block';
    }
}