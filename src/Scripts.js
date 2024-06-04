const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.links-container a');

console.log('Sections:', sections);
console.log('Nav Links:', navLinks);

const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.links-container a[href="#${entry.target.id}"]`);
    console.log('Observed section:', entry.target.id, 'Intersecting:', entry.isIntersecting);
    if (link) {
      if (entry.isIntersecting) {
        link.classList.add('active');
        console.log('Added active class to:', link);
      } else {
        link.classList.remove('active');
        console.log('Removed active class from:', link);
      }
    } else {
      console.log('Link not found for section:', entry.target.id);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
  console.log('Observing section:', section.id);
});

// Function to adjust arrow position
// function adjustArrowPosition() {
//   let hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
//   let arrow = document.querySelector('.shrink-arrow');
//   if (hasScrollbar) {
//     arrow.style.setProperty('--arrow-left', 'calc(50% - 7.5px)');
//     console.log('Scrollbar detected, arrow adjusted.');
//   } else {
//     arrow.style.setProperty('--arrow-left', '50%');
//     console.log('No scrollbar, arrow centered.');
//   }
// }

// Function to handle sticky navigation for section titles
function handleStickyNavigation() {
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    const scrollPosition = window.scrollY;
    const titleOffset = title.offsetTop;
    if (scrollPosition >= titleOffset) {
      title.classList.add('sticky-nav');
    } else {
      title.classList.remove('sticky-nav');
    }
  });
}

// Function to handle scrolling animation
function handleScrollAnimation() {
  var $el = $('.name-profession-container');
  var isPositionFixed = ($el.css('position') == 'fixed');
  if ($(this).scrollTop() > 200 && !isPositionFixed) {
    $el.css({ 'position': 'fixed', 'top': '0px' });
  }
  if ($(this).scrollTop() < 200 && isPositionFixed) {
    $el.css({ 'position': 'static', 'top': '0px' });
  }
}

// Function to set the current year
// function setCurrentYear() {
//   const currentYear = new Date().getFullYear();
//   document.getElementById('currentYear').textContent = currentYear;
// }

// Function to handle skills section intersection observer
function handleSkillsSectionIntersection(entries) {
  entries.forEach(entry => {
    const link = document.querySelector(`.links-container a[href="#${entry.target.id}"]`);
    console.log('Observed section:', entry.target.id, 'Intersecting:', entry.isIntersecting);
    if (link) {
      if (entry.isIntersecting) {
        link.classList.add('active');
        console.log('Added active class to:', link);
      } else {
        link.classList.remove('active');
        console.log('Removed active class from:', link);
      }
    } else {
      console.log('Link not found for section:', entry.target.id);
    }
  });
}

// Event listeners
// adjustArrowPosition();
// window.addEventListener('resize', adjustArrowPosition);
window.addEventListener('scroll', handleStickyNavigation);
window.addEventListener('scroll', handleScrollAnimation);
// setCurrentYear();

// Intersection Observer for skills section
const observerOptionsSkills = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Adjust as needed
};
const observerSkills = new IntersectionObserver(handleSkillsSectionIntersection, observerOptionsSkills);
sections.forEach(section => {
  observerSkills.observe(section);
  console.log('Observing section:', section.id);
});
