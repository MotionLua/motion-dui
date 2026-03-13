
let menu=document.getElementById("menu")
let setup=document.getElementById("keybindSetup")
let pressedKey=document.getElementById("pressedKey")
let menuKeyDisplay=document.getElementById("menuKey")

let menuKey=null
let chosenKey=null
let open=false

let tabs=document.querySelectorAll(".tab")
let currentTab=0

let dragging=false
let offsetX=0
let offsetY=0

function updateTabs(){
tabs.forEach(t=>t.classList.remove("active"))
tabs[currentTab].classList.add("active")
}

document.addEventListener("keydown",(e)=>{

if(setup.style.display!=="none"){

if(e.key!=="Enter" && e.key!=="Meta"){
chosenKey=e.key
pressedKey.innerText=e.key
}

if(e.key==="Enter" && chosenKey){
menuKey=chosenKey
menuKeyDisplay.innerText=menuKey
setup.style.display="none"
}

return
}

if(e.key===menuKey){

open=!open
menu.style.display=open?"block":"none"

}

if(!open) return

if(e.key==="q"){
currentTab--
if(currentTab<0)currentTab=tabs.length-1
updateTabs()
}

if(e.key==="e"){
currentTab++
if(currentTab>=tabs.length)currentTab=0
updateTabs()
}

if(e.key==="Backspace"){
fetch(`https://${GetParentResourceName()}/back`)
}

})

document.addEventListener("keydown",(e)=>{

if(e.key==="x"){
dragging=true
}

})

document.addEventListener("keyup",(e)=>{

if(e.key==="x"){
dragging=false
}

})

menu.addEventListener("mousedown",(e)=>{

if(dragging){

offsetX=e.clientX-menu.offsetLeft
offsetY=e.clientY-menu.offsetTop

document.onmousemove=(ev)=>{

menu.style.left=(ev.clientX-offsetX)+"px"
menu.style.top=(ev.clientY-offsetY)+"px"

}

document.onmouseup=()=>{
document.onmousemove=null
}

}

})
