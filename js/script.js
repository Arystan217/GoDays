const header = document.querySelector('header');
const burgerMenuIcon = document.querySelector('.burger-menu-icon')
const burgerPopup = document.querySelector(".burger-popup")

// BURGER MENU
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
