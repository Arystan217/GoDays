const header = document.querySelector('header');
const burgerMenuIcon = document.querySelector('.burger-menu-icon')
const burgerPopup = document.querySelector(".burger-popup")

//! BURGER MENU
let burgerPopupState = false
burgerMenuIcon.addEventListener('click', function() {
  burgerMenuIcon.classList.toggle('burger-menu-icon--active')
  burgerPopup.classList.toggle('burger-popup--closed')
  if (burgerPopupState == true) {
    burgerPopupState = false
    if (window.scrollY > 0) {
      header.classList.add('header--active');
    }
  }
  else {
    burgerPopupState = true
    header.classList.remove('header--active');
  }
});

window.addEventListener('scroll', function() {
  
  if (window.scrollY > 0 && burgerPopupState == false) {
    header.classList.add('header--active');
  } else {
    header.classList.remove('header--active');
  }
});

const burgerPopupList = document.querySelector(".burger-popup__list");

burgerPopupList.addEventListener("click", function(event) {
  if (event.target.classList.contains("burger-popup__link")) {
    document.querySelector(".burger-popup").classList.add("burger-popup--closed");
  }

  burgerMenuIcon.classList.toggle('burger-menu-icon--active')
  if (burgerPopupState == true) {
    burgerPopupState = false
    if (window.scrollY > 0) {
      header.classList.add('header--active');
    }
  }
  else {
    burgerPopupState = true
    header.classList.remove('header--active');
  }
});




//! PRICING
const tabs = document.querySelectorAll('.pricing__tab');
let pricingState = 'monthly';
const price = document.querySelector('.pricing__plan:first-child .pricing__plan-price')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (!tab.classList.contains('pricing__tab--active')) {
      tabs.forEach(t => t.classList.remove('pricing__tab--active'));
      tab.classList.add('pricing__tab--active');
      pricingState = tab.id;

      if (pricingState == "yearly") {   // yearly
        price.classList.add("disappear")
        setTimeout(() => {
          price.innerHTML = "$49,99<span>/year</span>"
          price.classList.remove("disappear")
        }, 200);
      } else {  // monthly
        price.classList.add("disappear")
        setTimeout(() => {
          price.innerHTML = "$4,49<span>/mo</span>"
          price.classList.remove("disappear")
        }, 200);
      }

    }
  });
});


//! FAQs
const questions = document.querySelectorAll(".faqs__question")
questions.forEach(el => {
  el.addEventListener("click", () => {
    el.classList.toggle("faqs__question--active")
    answer = el.nextElementSibling;
    answer.classList.toggle("faqs__answer--active")

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null
    } else {
      answer.style.maxHeight = String(answer.scrollHeight + 22) + "px"
    }
  })
})



//! smooth scrolling
const links = document.querySelectorAll('a[data-scroll-to]');

links.forEach(link => {
  link.addEventListener("click", function(e) {
    let padding = 110; // Adjust the padding value as needed
    e.preventDefault();
    const targetClass = this.getAttribute("data-scroll-to");
    const targetElement = document.querySelector("." + targetClass);

    if (targetClass == "hero") {padding = 2000}

    if (targetElement) {
      const targetOffset = targetElement.offsetTop - padding;

      window.scrollTo({
        top: targetOffset,
        behavior: "smooth"
      });
    }
  });
});


//! switching dark/light mode 
const darkCSSLink = document.createElement('link');
darkCSSLink.setAttribute('rel', 'stylesheet');
darkCSSLink.setAttribute('href', 'css/style-dark.css');

const lightCSSLink = document.createElement('link');
lightCSSLink.setAttribute('rel', 'stylesheet');
lightCSSLink.setAttribute('href', 'css/style-light.css');

const adaptiveCSSLink = document.createElement('link');
adaptiveCSSLink.setAttribute('rel', 'stylesheet'); // Fix: Change 'lightCSSLink' to 'adaptiveCSSLink'
adaptiveCSSLink.setAttribute('href', 'css/adaptive.css'); // Fix: Change 'lightCSSLink' to 'adaptiveCSSLink'

const computedStyles = window.getComputedStyle(document.querySelector('.pricing__tab--active'));
const backgroundValue = computedStyles.background;

let state;

if (backgroundValue.includes("rgb(255, 255, 255)")) {
  console.log("it was light")
  state = "dark";
  document.querySelector(".mode-switcher").textContent = "Light mode";
} else {
  console.log("it was dark")
  state = "light";
  document.querySelector(".mode-switcher").textContent = "Dark mode";
}

document.querySelector(".mode-switcher").addEventListener("click", e => {
  e.preventDefault();
  
  // add light only css styles
  document.head.appendChild(lightCSSLink);

  if (state === "light") {
    state = "dark";
    document.querySelector(".mode-switcher").textContent = "Light mode";
    document.head.appendChild(darkCSSLink);
  } else {
    state = "light";
    document.querySelector(".mode-switcher").textContent = "Dark mode";

    const existingDarkLink = document.querySelector('link[href="css/style-dark.css"]');
    if (existingDarkLink) {existingDarkLink.remove()} 
  }
  document.head.appendChild(adaptiveCSSLink);

  // delte intial css styles
  const existingInitialStyleLink = document.querySelector('link[href="css/style.css"]');
  if (existingInitialStyleLink) {existingInitialStyleLink.remove()}
});







