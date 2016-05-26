// Navigation

console.log('--> navigation.js');

// Vars
var ww = window.innerWidth;

var desktopNav = $('#main-nav');
var hamburger = $('#mobile-menu');
var mobileNavPageTrigger = $('.trigger-nav');
var mobileNavWrap = $('#mobile-menu-wrap');
var mobileNav = $('#mobile-nav');
var mobileNavLi = $('#mobile-nav li');
var mobileNavBounds = $('#mobile-nav-bounds');
var mobileNavOverlap = $('#mobile-nav-overlap');

var mobileNavClose = $('#close-mobile-menu');
var liFlyaway = $('li.flyaway');
var liFlyawayLink = $('li.flyaway>a');

// Resize Function
$(window).resize(function() {
  ww = window.innerWidth;
  
  if(ww < 768) {
    desktopNav.attr("aria-hidden","true");
    closeNav();
    mobileNavWrap.show();
  } else {
    desktopNav.attr("aria-hidden","false");
  }

  //return ww;
});
$(document).ready(function() {
  closeNav();
  $(window).trigger('resize');
});

// Window Scroll functions
$(window).on('scroll', function() {
  
    if(hamburger.hasClass('active')) {
      closeNav();
    }
  
});

// Mobile Nav Menu - Global Functions

// Close Mobile Nav
function closeNav() {
  TweenLite.to(mobileNav, .25, { x: "-270px", autoAlpha:0, ease: Power1.easeOut })
  TweenLite.to(hamburger, .3, { color:"#424242", ease: Power1.easeOut })
  hamburger.removeClass('active');
  hamburger.attr("aria-expanded","false");
  mobileNav.attr("aria-hidden","true");
  mobileNav.removeClass('triggered');
  if(ww > 767) {
    mobileNavWrap.hide();
  }
}

// Open Mobile Nav
function openNav() {
  TweenLite.to(mobileNav, .25, { x: 0, autoAlpha:1, ease: Power1.easeOut })
  hamburger.addClass('active');
  hamburger.attr("aria-expanded","true");
  mobileNav.attr("aria-hidden","false");
  mobileNavWrap.show();
}

// Toggle Mobile Nav (calls openNav() or closeNav()
function toggleNav() {
  
  // Default Action
  if(! hamburger.hasClass('active')) {
    openNav();
  } else {
    closeNav();
  }

  // Close on Document Click
  $(document).on('click', function(event) {
    if(!$(event.target).closest(hamburger).length && !$(event.target).closest(mobileNav).length && !$(event.target).closest(mobileNavPageTrigger).length && hamburger.hasClass('active')) {
      closeNav();
    }
  });

  // Close with Escape key
  $(document).keyup(function(e) {
    if (e.which === 27 && hamburger.hasClass('active')) {
      closeNav();
    }
  });
  
}

// Default Mobile Nav Trigger
hamburger.on('click', function() {
  toggleNav();
});

// Trigger Mobile Nav in-page (gets a special class)
mobileNavPageTrigger.on('click', function(e) {
  e.preventDefault();
  mobileNav.addClass('triggered');
  toggleNav();
  //using a settimeout for the length of the animation because the element is not able to be focused until it is visible
  setTimeout(function() {
    mobileNavClose.focus();
  }, 250);
  lastFocused = $(this);
});

// If mobile nav triggered in-page, return focus to the element that triggered it when it closes
mobileNavClose.on('click', function(e) {
  e.preventDefault();
  closeNav();
  lastFocused.focus();
});

// Emulate Hover on Mobile Nav Links
mobileNavLi.mouseenter(function() {
  TweenLite.to($(this), 0.25, { background:"rgba(0,0,0,0.1)", ease: Power1.easeInOut });
  mobileNav.css('cursor','pointer');
}).mouseleave(function() {
  TweenLite.to($(this), 0.25, { background:"rgba(255,255,255,0)", ease: Power1.easeInOut });
  mobileNav.css('cursor','move');
});

// Drag Nav to Close
Draggable.create(mobileNav, {
  type:"x",
  bounds: mobileNavBounds,
  minimumMovement:5,
  throwProps:true,
    // Allow both clicking and dragging on links (<a> needs z-index:-1)
    onClick:function(e) {
      var jqueryEvent = $(e.target);
      if(jqueryEvent.is('li')) {
        var link = jqueryEvent.find('a')[0];
        link.click();
      }
    },
    onDragEnd:function() {
      if (this.hitTest(mobileNavOverlap, 120)) {
        closeNav();
      } else {
        openNav();
      }
    }
});


// LI Flyaways
liFlyawayLink.on('click', function(e) {
  
  $(this).each(function() {
    
    var self = $(this).parent();
    var linkTrigger = $(this);
    var childMenu = self.find('ul').first();

    if(!self.hasClass('active')) {
      self.addClass('active');
      linkTrigger.attr('aria-expanded','true');
    } else {
      self.removeClass('active');
      linkTrigger.attr('aria-expanded','false');
    }
    
  });
  
  // Close on Document Click
  $(document).on('click', function(event) {

    var linkTrigger = liFlyaway.find('a');
    var childMenu = liFlyaway.find('ul');

    if(!$(event.target).closest(liFlyaway).length) {
      liFlyaway.removeClass('active');
      linkTrigger.attr('aria-expanded','false');
    }
  });
  
});