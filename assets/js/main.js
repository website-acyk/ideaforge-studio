/* ==========================================================================
IdeaForge Studio — Interactivity
========================================================================== */
(function () {
  'use strict';

 var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

 /* ---------------------------- Sticky navbar ---------------------------- */
 var navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

 /* ---------------------------- Mobile menu ------------------------------ */
 var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

 function closeMobileMenu() {
   mobileMenu.classList.remove('is-open');
   hamburgerBtn.classList.remove('is-active');
   hamburgerBtn.setAttribute('aria-expanded', 'false');
   document.body.style.overflow = '';
 }
  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

 if (hamburgerBtn) {
   hamburgerBtn.addEventListener('click', function () {
     var isOpen = mobileMenu.classList.contains('is-open');
     if (isOpen) { closeMobileMenu(); } else { openMobileMenu(); }
   });
 }

 document.querySelectorAll('.mobile-menu a').forEach(function (link) {
   link.addEventListener('click', closeMobileMenu);
 });

 /* ------------------------ Active nav link on scroll --------------------- */
 var sections = document.querySelectorAll('main section[id]');
  var navLinkEls = document.querySelectorAll('.nav-links a');

 function updateActiveLink() {
   var currentId = '';
   var scrollPos = window.scrollY + 140;
   sections.forEach(function (section) {
     if (scrollPos >= section.offsetTop) {
       currentId = section.getAttribute('id');
     }
   });
   navLinkEls.forEach(function (link) {
     var target = link.getAttribute('href').replace('#', '');
     link.classList.toggle('active', target === currentId);
   });
 }
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });

 /* ----------------------------- Scroll reveal ---------------------------- */
 var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

 /* -------------------------------- FAQ ----------------------------------- */
 var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    var answerInner = item.querySelector('.faq-answer-inner');

                   question.addEventListener('click', function () {
                     var isOpen = item.classList.contains('is-open');

                                             faqItems.forEach(function (other) {
                                               if (other !== item) {
                                                 other.classList.remove('is-open');
                                                 other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                                                 other.querySelector('.faq-answer').style.maxHeight = null;
                                               }
                                             });

                                             if (isOpen) {
                                               item.classList.remove('is-open');
                                               question.setAttribute('aria-expanded', 'false');
                                               answer.style.maxHeight = null;
                                             } else {
                                               item.classList.add('is-open');
                                               question.setAttribute('aria-expanded', 'true');
                                               answer.style.maxHeight = answerInner.offsetHeight + 'px';
                                             }
                   });
  });

 /* --------------------------- Cursor glow (desktop) ----------------------- */
 var cursorGlow = document.getElementById('cursorGlow');
  var canHover = window.matchMedia('(hover: hover)').matches && window.innerWidth > 980;

 if (cursorGlow && canHover && !prefersReducedMotion) {
   var mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
   var isActive = false;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isActive) {
      isActive = true;
      cursorGlow.classList.add('is-active');
    }
  });
   window.addEventListener('mouseleave', function () {
     isActive = false;
     cursorGlow.classList.remove('is-active');
   });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    cursorGlow.style.transform = 'translate(' + glowX + 'px, ' + glowY + 'px) translate(-50%, -50%)';
    requestAnimationFrame(animateGlow);
  }
   requestAnimationFrame(animateGlow);
 }

 /* ----------------------- Recalculate open FAQ on resize ------------------- */
 window.addEventListener('resize', function () {
   var openItem = document.querySelector('.faq-item.is-open');
   if (openItem) {
     var innerEl = openItem.querySelector('.faq-answer-inner');
     openItem.querySelector('.faq-answer').style.maxHeight = innerEl.offsetHeight + 'px';
   }
 });

})();
