// Navigation

console.log('--> navigation.js');

// Vars
var ww = window.innerWidth;
var desktopNav = $('#main-nav');
var hamburger = $('#mobile-menu');
var mobileNav = $('#mobile-nav');
var mobileNavBounds = $('#mobile-nav-bounds');
var mobileNavOverlap = $('#mobile-nav-overlap');

// Resize Function
$(window).resize(function() {
  ww = window.innerWidth;
  
  if(ww < 768) {
    desktopNav.attr("aria-hidden","true");
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
    scrollPosition = $(this).scrollTop();
    
    // Hamburger Opacity
    if (scrollPosition >= 70) {
      TweenLite.to(hamburger, 0.2, { autoAlpha: .2, ease: Power1.easeInOut });
      hamburger.addClass('scrolled');
    } else {
      TweenLite.to(hamburger, 0.2, { autoAlpha: 1, ease: Power1.easeInOut });
      hamburger.removeClass('scrolled');
    }
  
});

// Nav Menu
function closeNav() {
  TweenLite.to(mobileNav, .25, { x: "-270px", autoAlpha:0, ease: Power1.easeOut })
  TweenLite.to(hamburger, .3, { color:"#424242", ease: Power1.easeOut })
  hamburger.removeClass('active');
  mobileNav.attr("aria-hidden","true");
}
function openNav() {
  TweenLite.to(mobileNav, .25, { x: 0, autoAlpha:1, ease: Power1.easeOut })
  if(ww >= 851) {
    TweenLite.to(hamburger, .3, { color:"#fff", ease: Power1.easeOut })
  }
  hamburger.addClass('active');
  mobileNav.attr("aria-hidden","false");
}
hamburger.on('click', function() {
  
  // Default Action
  if(! hamburger.hasClass('active')) {
    openNav();
  } else {
    closeNav();
  }
  
  // Close on Document Click
  $(document).on('click', function(event) {
    if(!$(event.target).closest(hamburger).length && !$(event.target).closest(mobileNav).length && hamburger.hasClass('active')) {
      closeNav();
    }
  });

  // Close with Escape key
  $(document).keyup(function(e) {
    if (e.which === 27 && hamburger.hasClass('active')) {
      closeNav();
    }
  });
  
});

// Drag Nav to Close
Draggable.create(mobileNav, {
  type:"x",
  bounds: mobileNavBounds,
  throwProps:true,
    onDragEnd:function() {
      if (this.hitTest(mobileNavOverlap, 100)) {
        closeNav();
      } else {
        openNav();
      }
    }
});
