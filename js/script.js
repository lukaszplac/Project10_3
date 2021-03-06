$(function() {
	var carousel = $('#carousel');
	var carouselList = $("#carousel ul");
	var pictureCount = carouselList.find("li").length;
	var indicators = $(".indicators-container").find('div.picture-indicator');
	var indicatorsContainer = $(".indicators-container");
	var buttonPrevious = $(".navigation").find("#previous");
	var buttonNext = $(".navigation").find("#next");
	var jumpOffset = 0;
	var currentPicture = -1;
	var direction = -1;
	var intervalCounter;
 
 	carousel.hover(
 		function() {
 			clearInterval(intervalCounter);
 		},
 		function() {
 			doCount();
 		}
 	);


	doCount();
	updateIndicators();


	buttonNext.click(function(){
		direction = -1;
		changeSlides(direction);

	});
	buttonPrevious.click(function(){
		direction = 1;
		changeSlides(direction);
	});

	indicatorsContainer.click(function(e){
		var clickedIndicator = e.target;
		var indexOfPicture = $(clickedIndicator).index();
		if (indexOfPicture != currentPicture) {
			jumpOffset = currentPicture - indexOfPicture;
			moveToClickedPicture();
		}
	});

	function doCount() {
		intervalCounter  = setInterval(function(){ 
			changeSlides(direction);
		}, 5000);
	}

	function moveLeftSide() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
	}

	function moveRightSide() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		firstItem.before(lastItem);
		carouselList.css({marginLeft:-400});
	}

	function changeSlides(direction) {
		if (direction < 0) {
			carouselList.animate({'marginLeft': -400 }, 500, moveLeftSide);
			} else {		
			moveRightSide();
			carouselList.animate({'marginLeft': 0 }, 500);
		}
		updateIndicators();
	}

	function moveToClickedPicture() {
		var jump = Math.abs(jumpOffset);
		if (jumpOffset < 0) {
			for (var i = 0 ; i < jump; i++){
				carouselList.animate({'marginLeft': -400 }, 150, moveLeftSide);
			}
		} else {
			for (var i = 0 ; i < jump; i++){
				moveRightSide();
				carouselList.animate({'marginLeft': 0 }, 150);				
			}
		}
		updateIndicators();
		jumpOffset = 0;
	}

	function updateIndicators(){
		clearIndicators();
		if (jumpOffset === 0 ) currentPicture -= direction;
		else {
			 currentPicture -= jumpOffset;
		}
		if (currentPicture > pictureCount - 1) currentPicture = 0;
		if (currentPicture < 0) currentPicture = pictureCount - 1;
		markNextIndicator(currentPicture);
	}

	function clearIndicators() {
		indicators.css('background-color', 'initial')
	}

	function markNextIndicator(currentPicture) {
		var indicator = indicators.eq(currentPicture);
		indicator.css('background-color','red');
	}
})
