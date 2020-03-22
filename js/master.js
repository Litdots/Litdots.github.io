/////////////////////////////////////////////////////////////////////////////
//

function toggle_visibility(id) {
			       var e = document.getElementById(id);
			       if(e.style.display == 'block')
			          e.style.display = 'none';
			       else
			          e.style.display = 'block';
			    }

      // You can change global variables here:
      var radius = 240; // how big of the radius
      var autoRotate = true; // auto rotate or not
      var rotateSpeed = -60; // unit: seconds/360 degrees
      var imgWidth = 120; // width of images (unit: px)
      var imgHeight = 170; // height of images (unit: px)

      // Link of background music - set 'null' if you dont want to play background music
      var bgMusicURL =
        "null";
      var bgMusicControls = true; // Show UI music control

      /*
     NOTE:
       + imgWidth, imgHeight will work for video
       + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
       
*/

      // ===================== start =======================
      setTimeout(init, 100);

      var odrag = document.getElementById("drag-container");
      var ospin = document.getElementById("spin-container");
      // var aImg = ospin.getElementsByTagName("img");
      // var aVid = ospin.getElementsByTagName("video");
      // var aEle = [...aImg, ...aVid]; // combine 2 arrays
      var aEle = document.getElementsByClassName('item');

      // Size of images
      ospin.style.width = imgWidth + "px";
      ospin.style.height = imgHeight + "px";

      // Size of ground - depend on radius
      var ground = document.getElementById("ground");
      ground.style.width = radius * 3 + "px";
      ground.style.height = radius * 3 + "px";

      function init(delayTime) {
        for (var i = 0; i < aEle.length; i++) {
          aEle[i].style.transform =
            "rotateY(" +
            i * (360 / aEle.length) +
            "deg) translateZ(" +
            radius +
            "px)";
          aEle[i].style.transition = "transform 1s";
          aEle[i].style.transitionDelay =
            delayTime || (aEle.length - i) / 4 + "s";
        }
      }

      function applyTranform(obj) {
        // Constrain the angle of camera (between 0 and 180)
        if (tY > 180) tY = 180;
        if (tY < 0) tY = 0;

        // Apply the angle
        obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
      }

      function playSpin(yes) {
        ospin.style.animationPlayState = yes ? "running" : "paused";
      }

      var sX,
        sY,
        nX,
        nY,
        desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;

      // auto spin
      if (autoRotate) {
        var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
        ospin.style.animation = `${animationName} ${Math.abs(
          rotateSpeed
        )}s infinite linear`;
      }

      // add background music
      if (bgMusicURL) {
        document.getElementById("music-container").innerHTML += `
<audio src="${bgMusicURL}" ${
          bgMusicControls ? "controls" : ""
        } autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
      }

      // setup events
      document.onpointerdown = function(e) {
        clearInterval(odrag.timer);
        e = e || window.event;
        var sX = e.clientX,
          sY = e.clientY;

        this.onpointermove = function(e) {
          e = e || window.event;
          var nX = e.clientX,
            nY = e.clientY;
          desX = nX - sX;
          desY = nY - sY;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTranform(odrag);
          sX = nX;
          sY = nY;
        };

        this.onpointerup = function(e) {
          odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
              clearInterval(odrag.timer);
              playSpin(true);
            }
          }, 17);
          this.onpointermove = this.onpointerup = null;
        };

        return false;
      };

      document.onmousewheel = function(e) {
        e = e || window.event;
        var d = e.wheelDelta / 20 || -e.detail;
        radius += d;
        init(1);
      };
	  
/* JQUERY CODES
-------------------------------------------------*/

$(document).ready(function() {

	$.fn.animateRotate = function(angle, duration, easing, complete) {
	  var args = $.speed(duration, easing, complete);
	  var step = args.step;
	  return this.each(function(i, e) {
		args.complete = $.proxy(args.complete, e);
		args.step = function(now) {
		  $.style(e, 'transform', 'rotate(' + now + 'deg)');
		  if (step) return step.apply(e, arguments);
		};

		$({deg: 0}).animate({deg: angle}, args);
	  });
	};
	
	$("#main-page").css("background-color", "#000");
	$("#main-page").css("height", "100vh");
	$("#main-page").css("width", "100%");
	$("#main-page").fadeIn();
	$(".maincontent").fadeIn();
	
	$(".mainlink").on("click", function() {
		$(".maincontent").fadeOut();
		$("#main-page").animate({
			width: "25px",
			height: "375px"
		}, function() {
			$(this).animateRotate(90);
		});
		
		setTimeout(function() {
			$("#main-page").fadeOut();		 
		}, 1500);
		
		setTimeout(function() {
			$("#next-page").animateRotate(0, 0);
			$("#next-page").css("height", "25px");
			$("#next-page").css("width", "375px");
			$("#next-page").fadeIn();
			$("#next-page").animate({
				backgroundColor: "#000"
			}, function() {
				$(this).animate({
					height: "100vh"
				}, function() {
					$(this).animate({
						width: "100%"
					}, function() {
						$(".nextcontent").fadeIn(300);
					});
				});
			});
		}, 800);
	});
		
	$(".nextlink").on("click", function() {
		$(".nextcontent").fadeOut();
		$("#next-page").animate({
			width: "25px",
			height: "375px"
		}, function() {
			$(this).animateRotate(-90);
		});
		
		setTimeout(function() {
			$("#next-page").fadeOut();			
		}, 1500);
		
		setTimeout(function() {
		$("#main-page").animateRotate(0, 0);
		$("#main-page").css("height", "25px");
		$("#main-page").css("width", "375px");
			$("#main-page").fadeIn();
			$("#main-page").animate({
				height: "100vh"
			}, function() {
				$(this).animate({
					width: "100%"
				}, function() {
					$(".maincontent").fadeIn(300);
				});
			});
		}, 1400);
	});
	
});