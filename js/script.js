$(function() {
	var carouselList = $("#carousel ul");
	setInterval(changeSlides, 5000);

	function moveFirstSlide() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
	}

	function changeSlides() {
		carouselList.animate({'marginLeft':-400}, 500, moveFirstSlide);
	}
})