$(function() {
	var carouselList = $("#carousel ul");
	var pictureCount = carouselList.find("li").length;
	var indicators = $(".indicators-container").find('div.picture-indicator');
	var indicatorsContainer = $(".indicators-container");
	var buttonPrevious = $(".navigation").find("#previous");
	var buttonNext = $(".navigation").find("#next");
	var currentPicture = -1;
	var direction = -1;

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
	});

	function doCount() {
		var intervalCounter  = setInterval(function(){ //dlaczego musze w ten sposob zmieniac ta funkcje a nie moge po prostu setInterval(changSlides(1), 500)
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
		carouselList.css({marginLeft:0});
	}

	function changeSlides(direction) {
		if (direction < 0) {
			carouselList.animate({'marginLeft': -400 }, 500, moveLeftSide);
			}
		else {
			carouselList.animate({'marginLeft': 400 }, 500, moveRightSide);
		}
		updateIndicators();
	}

	function updateIndicators(){
		clearIndicators();
		currentPicture -= direction;
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