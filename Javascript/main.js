var navLinks = document.getElementById("navLinks");

function showMenu() {
  navLinks.style.right = "0";
}

function hideMenu() {
  navLinks.style.right = "-200px";
}

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("backToTopBtn");

  // Show or hide the button based on the scroll position
  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  // Scroll to the top smoothly and slowly when the button is clicked
  button.addEventListener("click", function () {
    scrollToTop(1000); // You can adjust the duration (in milliseconds) as needed
  });

  // Function to scroll to the top gradually
  function scrollToTop(duration) {
    var start = document.documentElement.scrollTop || document.body.scrollTop;
    var startTime = Date.now();

    function scrollStep() {
      var currentTime = Date.now();
      var timeElapsed = currentTime - startTime;

      document.documentElement.scrollTop = document.body.scrollTop = easeInOut(
        timeElapsed,
        start,
        -start,
        duration
      );

      if (timeElapsed < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    function easeInOut(t, b, c, d) {
      // Easing function (you can replace this with other easing functions if needed)
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollStep);
  }
});



//===========================//

document.addEventListener("DOMContentLoaded", function () {
 
	makeMovable("total-display");
  
	var priceRows = document.querySelectorAll(".price-row");
  
	priceRows.forEach(function (row) {
		row.addEventListener("click", function () {
  
			row.classList.toggle("selected");
  
			updateTotal();
  
			toggleWidgetVisibility();
		});
	});
  
	function updateTotal() {
	  var selectedRows = document.querySelectorAll(".price-row.selected");
	  var total = 0;
  
	  var selectedServicesList = document.getElementById("selected-services");
	  selectedServicesList.innerHTML = "";
  
	  selectedRows.forEach(function (row) {
		  var title = row.querySelector(".price-title").textContent;
		  var amount = row.querySelector(".price-amount").textContent;
  
		  total += parseFloat(amount.replace("N", "").replace(",", ""));
  
		  var listItem = document.createElement("li");
		  listItem.innerHTML = `${title} - ${amount}`;
		  selectedServicesList.appendChild(listItem);
	  });
  
	  var formattedTotal = "Total: N" + total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
	  document.getElementById("total-display").getElementsByTagName("span")[0].innerText = formattedTotal;
  }
  
	function toggleWidgetVisibility() {
		var selectedRows = document.querySelectorAll(".price-row.selected");
		var widget = document.getElementById("total-display");
  
		widget.style.display = selectedRows.length > 0 ? "flex" : "none";
	}
	toggleWidgetVisibility();
  
	function makeMovable(elementId) {
		var element = document.getElementById(elementId);
		var isDragging = false;
		var offsetX, offsetY;
  
		element.addEventListener("mousedown", function (e) {
			isDragging = true;
			offsetX = e.clientX - element.getBoundingClientRect().left;
			offsetY = e.clientY - element.getBoundingClientRect().top;
		});
  
		document.addEventListener("mousemove", function (e) {
			if (isDragging) {
				element.style.left = e.clientX - offsetX + "px";
				element.style.top = e.clientY - offsetY + "px";
			}
		});
  
		document.addEventListener("mouseup", function () {
			isDragging = false;
		});
	}
  });
  
  // Function to handle booking appointment
  function bookAppointment() {
  
	var selectedRows = document.querySelectorAll(".price-row.selected .price-title");
	var total = 0;
	var selectedServices = "";
  
   
	selectedRows.forEach(function (title, index) {
	  total += parseFloat(title.nextElementSibling.innerText.replace("N", "").replace(",", ""));
	  selectedServices += "<li>" + title.textContent + "</li>";
	});
  
	sessionStorage.setItem("selectedServices", selectedServices);
	sessionStorage.setItem("total", total.toFixed(2));
  
	// Redirect to the booking page
	window.location.href = "booking.html";
  };


    if (window.location.pathname.endsWith('.html')) {
        window.history.replaceState({}, document.title, window.location.pathname.slice(0, -5));
    }
