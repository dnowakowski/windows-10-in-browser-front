//coded by Damian Nowakowski

//clock
setInterval( function showtime(){
var d = new Date();
var hours= d.getHours();
var minutes=d.getMinutes();
if(hours<10){
hours="0"+hours;
}
if(minutes<10){
minutes="0"+minutes;
}
   document.getElementById("timer").innerHTML = hours+":"+minutes;
},60);

//rest
let icons = document.querySelectorAll('.icoBox');
let pulpit = document.querySelector('body');
let clicked = false;
let heldIcon;
let heldIconP;
let mousePosXIcon;
let mousePosYIcon;
let lastClick;
let trashBin = document.querySelector('#recycler');
let browser = document.querySelector('#browser');
let appOpened = false;

	function listenForKeys(e){
		if ((e.key == 'Delete')&&(heldIcon !== trashBin)){
			heldIcon.remove();
			trashBin.children[0].style.backgroundImage = 'url(resources/img/RecycleFull.png)';
		}
	}

function hold(e){
	clicked = true;
	if(heldIcon){
		heldIcon.classList.remove('clickedIcon');
		heldIconP.classList.remove('clickedIconParagraph');
	}
	heldIconP = this.querySelector('p')	
	heldIcon = this;
	lastOffsetTop = this.offsetTop
	this.style.zIndex = '5';
	this.classList.add('clickedIcon')
	heldIconP.classList.add('clickedIconParagraph')


	document.addEventListener('keydown', listenForKeys);

}


function release(){
	//	
	if(timeoutClick) clearTimeout(timeoutClick)
		var timeoutClick = setTimeout(function(){
		lastClick = null;
		clearTimeout(this);
	},700)

	clicked = false;
	lastClick = heldIcon;
	if (heldIcon){
	heldIcon.style.zIndex = '1'
	}
}


function moveIcon(e){
	if(!clicked){return}
//	heldIcon.style.left = `${e.clientX - heldIcon.offsetWidth/2 - heldIcon.initPosX - (heldIcon.offsetWidth/2-heldIcon.offsetWidth + mousePosXIcon)-15}px`; 
	console.log(e.clientY - heldIcon.offsetHeight/2)
	heldIcon.style.top = `${e.clientY - heldIcon.offsetHeight/2}px`; 
	heldIcon.style.left = `${e.clientX - heldIcon.offsetWidth/2}px`;	
}

function unmarkicon(){
		heldIcon.classList.remove('clickedIcon');
		heldIconP.classList.remove('clickedIconParagraph');
		heldIcon = null;
}

function unmark(e){		
	if(document.getElementById('contextMenu')){document.getElementById('contextMenu').remove();}
	if((e.target == pulpit)&&(heldIcon)){
		heldIcon.classList.remove('clickedIcon');
		heldIconP.classList.remove('clickedIconParagraph');
		heldIcon = null;
		document.removeEventListener('keydown', listenForKeys);
	}

}

function initChrome(){
	console.log(lastClick);
	if(lastClick != this){return}

		unmarkicon();
	function closeChrome(){
		chromeApp.style.display = 'none';
		appOpened = false;
	}	
	appOpened = true;
	let chromeApp = document.querySelector('.chromeApp');
	chromeApp.style.display = 'block';
	chromeApp.querySelector('.exit').addEventListener('click', closeChrome);
}

function context(e){
	e.preventDefault();	
	if(appOpened){return}
	let rightClickMenu = document.createElement('div');		
	if(document.getElementById('contextMenu')){document.getElementById('contextMenu').remove();}
	rightClickMenu.style.width = "170px";
	rightClickMenu.style.height = "250px";
	rightClickMenu.style.background = "gray";
	rightClickMenu.style.color = "white";
	rightClickMenu.style.position = "absolute";
	rightClickMenu.style.left = `${e.clientX}px`;
	rightClickMenu.style.top = `${e.clientY}px`;
	rightClickMenu.style.zIndex = 10;
	rightClickMenu.setAttribute('id', 'contextMenu');
	document.querySelector('body').appendChild(rightClickMenu);
	console.log(e);
}


//id recycler context menu (bin)

icons.forEach(icon =>{
	icon.addEventListener('mousedown', hold);	
	document.querySelector('body').addEventListener('mousedown', unmark);	
	icon['initPosY'] = icon.offsetTop;
	icon['initPosX'] = icon.offsetLeft;
	document.addEventListener('mouseup', release );	
	document.addEventListener('mousemove', moveIcon);	
	browser.addEventListener('mouseup', initChrome);
	document.addEventListener('contextmenu', context);
})

icons.forEach(icon =>{
	icon.style.position = 'absolute';
	console.log(icon.initPosY);
	icon.style.top = `${icon.initPosY}px`;
	icon.style.left = `${icon.initPosX}px`;
})