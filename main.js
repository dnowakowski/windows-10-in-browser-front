//coded by Damian Nowakowski

//clock
setInterval( function clock(){
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
let icons = Array.from(document.querySelectorAll('.icoBox'));
let body = document.querySelector('body');
let clicked = false;
let heldIcon;
let heldIconP;
let mousePosXIcon;
let mousePosYIcon;
let lastClick;
let trashBin = document.querySelector('#recycler');
let browser = document.querySelector('#browser');
let appOpened = false;
let storage;
var test;
var newCopyY
var newCopyX

	function listenForKeys(e){
		if (heldIcon !== trashBin){
			if(e.key == "Delete"){
			heldIcon.remove();
			trashBin.children[0].style.backgroundImage = 'url(resources/img/RecycleFull.png)';
			resetIcons();
					setUpIcons();
				}

				if(e.key == "c"){
					storage = heldIcon.cloneNode(true)
				}
				if((e.key == "v")&&(storage)){
				icons.push(body.appendChild(storage));
				let thisIcon = icons[icons.length-1];
				clearIconClasses(thisIcon);
					thisIcon.addEventListener('mousedown', hold);	
					thisIcon.style.zIndex = '1';
					newCopyY = thisIcon.offsetTop + 80;
					newCopyX = thisIcon.offsetLeft;
					if(newCopyY > body.offsetHeight){
						newCopyX += 60;
						newCopyY = 0;
						if(newCopyX > body.offsetWidth){
							newCopyX = 0;
						}
						thisIcon.style.left = `${newCopyX}px`
					}
					//console.log(newCopyY);
					thisIcon.style.top = `${newCopyY}px`
					newCopyY += 80;
					storage = thisIcon.cloneNode(true)
				}
		}
	}

//TODO: Make function for pasting and add key combination CTRL + C & CTRL + V 

	function clearIconClasses(icon){
		if(icon){
			icon.classList.remove('clickedIcon');
			icon.children[0].children[0].classList.remove('clickedIconParagraph');
		}
	}

function hold(e){
	clicked = true;
		clearIconClasses(heldIcon);

	heldIconP = this.querySelector('p')	
	heldIcon = this;
	lastOffsetTop = this.offsetTop
	this.style.zIndex = '5';
	this.classList.add('clickedIcon')
	heldIconP.classList.add('clickedIconParagraph')


	document.addEventListener('keydown', listenForKeys);

}


function release(){
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
	if((e.target == body)&&(heldIcon)){
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
	body.appendChild(rightClickMenu);
	console.log(e);
}


//id recycler context menu (bin)

icons.forEach(icon =>{
	body.addEventListener('mousedown', unmark);	
	icon.addEventListener('mousedown', hold);	
	icon['initPosY'] = icon.offsetTop;
	icon['initPosX'] = icon.offsetLeft;
	document.addEventListener('mouseup', release );	
	document.addEventListener('mousemove', moveIcon);	
	browser.addEventListener('mouseup', initChrome);
	document.addEventListener('contextmenu', context);
})


function setUpIcons(){
	icons.forEach(icon =>{
		icon.style.position = 'absolute';
		icon.style.top = `${icon.initPosY}px`;
		icon.style.left = `${icon.initPosX}px`;
	});
};

function resetIcons(){
	icons.forEach(icon =>{
		icon.style.position = 'static';
		icon['initPosY'] = icon.offsetTop;
		icon['initPosX'] = icon.offsetLeft;
	});
};

setUpIcons();