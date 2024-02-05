
// header sticky function 
const header = document.querySelector('header>div');

window.addEventListener('scroll', function () {
  if (window.scrollY > 4) { /* Adjust the scroll threshold as needed */
    header.classList.add('header-up');
  } else {
    header.classList.remove('header-up');
  }
});


// toggle on nav bar 

function toggleNav() {
  var navItems = document.querySelector('.primary-navigation');
  navItems.classList.toggle('show');
}


// JavaScript to toggle the dropdown menu on small screens
const toggleBtn = document.querySelector(".dropdown-toggle > a > i");
const dropdown = document.querySelector(".dropdown");

// Define the function to be used as the event listener
const toggleDropdown = () => {
  console.log("hello");
  dropdown.classList.toggle('active');
};

// Add the event listener
toggleBtn.addEventListener("click", toggleDropdown);




$(document).ready(function () {
  $('.slider').each(function () {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
      clearTimeout(timeout); // Clear the timeout when a navigation event occurs
      var animateLeft, slideLeft;

      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }

      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');

      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }

      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function () {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }


    $('.next_btn').on('click', function () {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });

    $('.previous_btn').on('click', function () {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(1);
      }
    });

    $.each($slides, function (index) {
      var $button = $('<a class="slide_btn">&bull;</a>');

      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function () {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });

  });
});






const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }


}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));






var swiper = new Swiper(".slide-content", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  centeredSlides: true, // Use centeredSlides instead of centerSlide
  fade: 'true',
  grabCursor: 'true',
  pagination: 'false',
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  draggable: true, // Enable draggable
});



document.addEventListener('DOMContentLoaded', function () {
  var elements = document.querySelectorAll('.animate-on-scroll');

  function checkVisibility() {
    elements.forEach(function (element) {
      var position = element.getBoundingClientRect();

      // If the element is in the viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('show');
      }
    });
  }

  // Initial check on page load
  checkVisibility();

  // Check on scroll
  window.addEventListener('scroll', checkVisibility);
});




// Function to handle the visibility of the "Top-Up" button
function handleTopUpVisibility(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Hero section is in the viewport
      topUpButton.style.display = 'none';
    } else {
      // Hero section is not in the viewport
      topUpButton.style.display = 'block';
    }
  });
}

const heroSection = document.getElementById('hero');
const topUpButton = document.getElementById('top-up-button');

// Set up the Intersection Observer
const observer = new IntersectionObserver(handleTopUpVisibility, { rootMargin: "-600px 0px 0px 0px", threshold: 0 });

// Observe the hero section
observer.observe(heroSection);

// Function to handle the "Top-Up" button click
function handleTopUpClick() {
  // Implement the logic to scroll back to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add a click event listener to the "Top-Up" button
topUpButton.addEventListener('click', handleTopUpClick);