(function () {
  'use strict';

  // Scroll-triggered reveal for "What we do" cards
  var cards = document.querySelectorAll('.focus-card-reveal');
  if (cards.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );
    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else if (cards.length) {
    cards.forEach(function (card) {
      card.classList.add('is-visible');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
