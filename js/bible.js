
var pagetop, menu, yPos;
function yScroll(){
	pagetop = document.getElementById('pagetop');
	menu = document.getElementById('menu');
	yPos = window.pageYOffset;
	if(yPos > 150){
		pagetop.style.height = "53px";
		pagetop.style.paddingTop = "0px";
		menu.style.height = "0px";
	} else {
		pagetop.style.height = "95px";
		pagetop.style.paddingTop = "0px";
		menu.style.height = "40px";
	}
}
window.addEventListener("scroll", yScroll);


function toggleCP(){
	var cp = document.getElementById("cp");
	cp.style.height = window.innerHeight - 60+"px";
	if(cp.style.right == "0px"){
		cp.style.right = "-200px";
	} else {
		cp.style.right = "0px";
	}
}

			<!--
			    function toggle_visibility(id) {
			       var e = document.getElementById(id);
			       if(e.style.display == 'block')
			          e.style.display = 'none';
			       else
			          e.style.display = 'block';
			    }
			//-->
		
function show1(){
  document.getElementById('books').style.display ='none';
  document.getElementById('fullview').style.display = 'none';
  document.getElementById('index16').style.display = 'none';
}
function show2(){
  document.getElementById('books').style.display = 'block';
  document.getElementById('fullview').style.display = 'none';
  document.getElementById('index16').style.display = 'none';
}
function show3(){
  document.getElementById('index16').style.display = 'block';
  document.getElementById('books').style.display = 'none';
}
