function appendToList() {
    "use strict";
    
    var table = document.getElementById("taskList");
    
    var row = document.createElement("tr");
    var td1 = document.createElement("td");   
    
    td1.innerHTML = document.getElementById("task").value;
    
    row.appendChild(td1);
    
    table.children[0].appendChild(row);
    
};
