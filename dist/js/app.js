function loadLocal(){co=0;for(var e=0,t=localStorage.length;e<t;++e){co++;var o=JSON.parse(localStorage.getItem("toDoCheck"+co)).liContent;document.getElementById("toDoList").insertAdjacentHTML("beforeend",o)}}function addFunction(){if(currentTasks in localStorage)var e=JSON.parse(localStorage.getItem(currentTasks));else e=0;if(0==(t=document.getElementById("taskInput").value).length)return alert("Pas de texte entré !"),!1;if(t in localStorage)alert("La tâche existe déjà !");else{t.value=e,e++,localStorage.setItem("current tasks",e);var t=document.getElementById("taskInput").value;localStorage.setItem(t,"task_value");var o=document.getElementById("toDoList"),a=new Date,c=(new Date).getTime(),l='<li id="li'+e+'" name="'+e+'"><input name="interest" type="checkbox" id="toDoCheck'+e+'" class="check" onchange="removeTask(this)"><label id="label'+e+'" name="'+e+'" for="toDoCheck'+e+'" class="listItem">'+t+"</label>  "+a.toLocaleTimeString("fr-FR")+"  "+a.toLocaleDateString("fr-FR")+"</li>";o.insertAdjacentHTML("beforeend",l);var n={input:t,time:c,liContent:l};localStorage.setItem("toDoCheck"+e,JSON.stringify(n))}}function removeTask(e){var t=e.id;if(e.checked){e.setAttribute("checked","checked");var o=(new Date).getTime()-JSON.parse(localStorage.getItem(t)).time;alert("Tâche complétée en "+o/1e3+" secondes")}else e.removeAttribute("checked"),alert("La tâche a été remise en cours");var a=e.parentNode.outerHTML;console.log(a);var c=JSON.parse(localStorage.getItem(t));c.liContent=a,localStorage.setItem(t,JSON.stringify(c))}function remove(){for(var e=document.getElementById("toDoList");e.hasChildNodes();)e.removeChild(e.firstChild);window.localStorage.clear()}function filterOk(e){for(var t=0;t<checkboxes.length;t++)checkboxes[t].checked?checkboxes[t].parentNode.style.display="block":checkboxes[t].parentNode.style.display="none"}function filterNot(e){for(var t=0;t<checkboxes.length;t++)checkboxes[t].checked?checkboxes[t].parentNode.style.display="none":checkboxes[t].parentNode.style.display="block"}function filterAll(e){for(var t=0;t<checkboxes.length;t++)checkboxes[t].parentNode.style.display="block"}var currentTasks="current tasks",checkboxes=document.getElementById("toDoList").getElementsByTagName("input");