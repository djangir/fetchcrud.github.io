let dataas = document.getElementById('dataa');

let single_data = document.getElementById('single_data');

let next = document.getElementById('next');

let back = document.getElementById('back');

let backpage = document.getElementById('backpage');

let nextpage = document.getElementById('nextpage');

let curpage = document.getElementById('curpage');


back.innerHTML="";
backpage.innerHTML="";
back.value=""; 
 
nextpage.innerHTML=""; 
next.innerHTML=""; 



let error  = document.getElementById("error");

let modal_close = document.getElementsByClassName('close');
 
let modal = document.getElementsByClassName('modal');
 
let newuser = document.getElementsByClassName('new1');

let tr = "" 

let tdd = ""

let lmt = "" 

for(let i = 0; i < modal_close.length ; i++){

// close start


modal_close[i].addEventListener("click" , ()=>{

for(let j = 0; j < modal_close.length ; j++){
modal[j].classList.remove('block')
modal[j].classList.add('none')
}
 })
}

// close exit
// show modal start


let showfunction = (cname)=>{
cname.classList.remove('none')
cname.classList.add('block')
}

// show modal end

var valshow = 15;
function showrec(valuee){ 
valshow = valuee;
showfunction(users);

tdd = "";
 
fetch("https://gorest.co.in/public-api/users?id="+valshow)
.then((data)=>{
    return data.json()
})
.then((dataa)=>{ 

tdd = `<td>${dataa.data[0].id}</td>
    <td>${dataa.data[0].name} </td>
    
    <td>${dataa.data[0].email} </td>

    <td>${dataa.data[0].gender} </td>

    <td>${dataa.data[0].status} </td>
 `;

single_data.innerHTML = tdd;
})
.catch((error)=>{
    console.log(error);
})
}
 
// load data function

let pageno = 1; 

next.addEventListener("click",()=>{pageno = next.value;
    loaddata()
})


back.addEventListener("click",()=>{pageno = 1;
    loaddata()
})


nextpage.addEventListener("click",()=>{pageno = pageno+1;
    loaddata()
})


backpage.addEventListener("click",()=>{pageno = pageno-1;
    loaddata()
})
 
 

loaddata() ;
function loaddata(){

let url = `https://gorest.co.in/public-api/users?page=${pageno}`;
 
fetch(url)
.then((data)=>{
	return data.json()
})
.then((dataa)=>{

let limit = dataa.meta.pagination.limit;

let page = dataa.meta.pagination.page;

let tpages = dataa.meta.pagination.pages;

let totalrecords = dataa.meta.pagination.total;

plimit = (page-1)*limit;
poffset = plimit+limit;

curpage.innerHTML=page;
back.innerHTML="≪";
backpage.innerHTML=page-1; 
nextpage.innerHTML=page+1; 
next.innerHTML="≫"; 
next.value=tpages; 
 
dataas.innerHTML = "";

if(page-1 == 0){
   back.className += " none"; 
   backpage.className += " none"; 
 }else if(page-1 > 0){
   back.className  = ""; 
   backpage.className  = "";
}

if(page == tpages){
   next.className += " none"; 
   nextpage.className += " none";
}else{
    next.className  = ""; 
   nextpage.className  = "";
} 



for(let i in dataa.data){
tr += `<tr> <td>${dataa.data[i].id}</td>
    <td>${dataa.data[i].name} </td>
    <td>
<span class="span1"  onclick="showrec(${dataa.data[i].id})" id="show${dataa.data[i].id}">show</span>
<span class="span1"  onclick="editrec(${dataa.data[i].id})">edit</span>
<span class="span1"  onclick="deleterec(${dataa.data[i].id})">delete</span>
    </td>
<tr>`;
}

dataas.innerHTML = tr;
 
 
})


.catch((error)=>{

error.innerHTML = "error Found";
error.className = 'block';
})
} 




 
// update data code

var updatedata = document.getElementById("updateee");

function editrec(valuee){ 
valshow = valuee;
showfunction(editusers);

tdd = "";
 
fetch("https://gorest.co.in/public-api/users?id="+valshow)
.then((data)=>{
    return data.json()
})
.then((dataa)=>{

tdd = ` 
<input type="text" id="id${dataa.data[0].id}" placeholder="User id" value="${dataa.data[0].id}">

<input type="text" id="n${dataa.data[0].id}" placeholder="name" value="${dataa.data[0].name}">

<input type="text" id="e${dataa.data[0].id}" placeholder="email" value="${dataa.data[0].email}">
 
<input type="text" id="s${dataa.data[0].id}" placeholder="status" value="${dataa.data[0].status}">

<input type="text" id="g${dataa.data[0].id}" placeholder="genger" value="${dataa.data[0].gender}">
 
<input type="submit" id="su${dataa.data[0].id}" value="submit update" onclick="update_data(${dataa.data[0].id});">
`

updatedata.innerHTML = tdd;
})
.catch((error)=>{
    console.log(error);
})
}

function update_data(idupdate){
console.log(idupdate);


var id = document.getElementById(`id${idupdate}`);

var name = document.getElementById(`n${idupdate}`);

var email = document.getElementById(`e${idupdate}`);

var gender = document.getElementById(`g${idupdate}`);

var status = document.getElementById(`s${idupdate}`);

var dataaa = JSON.stringify({
    id: id.value,
    name: name.value,
    email: email.value,
    gender: gender.value,
    status: status.value
  })

console.log(dataaa)
// var urll = `https://gorest.co.in/public/v1/users?id=${idupdate}`; 

 var urll = `https://gorest.co.in/public-api/users/${idupdate}`;

fetch(urll , {
  method: 'PUT',
  body: dataaa,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) =>{ 
return response.json()
console.log(response.json());
})
  
  .then((json) =>{ 
  alert("finel update result : " + json.data.message);

for(let j = 0; j < modal_close.length ; j++){
modal[j].classList.remove('block')
modal[j].classList.add('none')
}
  })
  .catch((error)=>{
alert('update error')

for(let j = 0; j < modal_close.length ; j++){
modal[j].classList.remove('block')
modal[j].classList.add('none')
}

  })


}





// save data 


function davedata(){

var id = document.getElementById('id');

var name = document.getElementById('name');

var email = document.getElementById('email');

var gender = document.getElementById('gender');

var status = document.getElementById('status');

var dataaa = JSON.stringify({
    id: id.value,
    name: name.value,
    email: email.value,
    gender: gender.value,
    status: status.value
  })

fetch('https://gorest.co.in/public-api/users', {
  method: 'POST',
  body: dataaa,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) =>{ 

    alert("finel Insert result : " + json.data.message);
 ;

var form = document.getElementById("form");

for(let j = 0; j < modal_close.length ; j++){
modal[j].classList.remove('block')
modal[j].classList.add('none')
}
form.reset();

  })
    .catch((error)=>{
console.log(error)
  })


}




// delete Data


function deleterec(iddd){

// var urll = `https://gorest.co.in/public/v1/users?id=${iddd}`; 

var urll = `https://gorest.co.in/public-api/users/${iddd}`; 


fetch(urll , {
  method: 'DELETE',
}).then((asdf)=>{
   return asdf.json();
})
.then((asdf)=>{
    alert("Delete Message : "+ asdf.data.message);
})
;
}
