// Navigation

console.log('--> navigation.js');

// Vars
var ww = window.innerWidth;

var desktopNav = $('#main-nav');
var hamburger = $('#mobile-menu');
var mobileNavWrap = $('#mobile-menu-wrap');
var mobileNav = $('#mobile-nav');
var mobileNavLi = $('#mobile-nav li');
var mobileNavBounds = $('#mobile-nav-bounds');
var mobileNavOverlap = $('#mobile-nav-overlap');

var liFlyaway = $('li.flyaway');
var liFlyawayLink = $('li.flyaway>a');

var liMobileSubmenu = $('#mobile-menu-wrap li[data-opens]');
var mobileSubmenus = $('[data-submenu]')

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

});

// Document Ready
$(document).ready(function() {
  closeNav();
  $(window).trigger('resize');
});

// Window Scroll
$(window).on('scroll', function() {
  
    if(hamburger.hasClass('active')) {
      closeNav();
    }
  
});

// Mobile Nav Menu - Global Functions
// -----------------------------------

// Close Mobile Nav
function closeNav() {
  
  //default
  TweenLite.to(mobileNav, .25, { x: "-270px", autoAlpha:0, ease: Power1.easeOut })
  hamburger.removeClass('active');
  hamburger.attr("aria-expanded","false");
  mobileNav.attr("aria-hidden","true");
  //close submenus
  TweenLite.to(mobileSubmenus, .2, { x: "270px", ease: Power1.easeOut });
  liMobileSubmenu.removeClass('active');
  liMobileSubmenu.find('a').attr('aria-expanded', 'false');
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
  
}

// Default Mobile Nav Trigger
hamburger.on('click', function() {
  
  toggleNav();
  
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
      if (Draggable.hitTest(mobileNav,mobileNavOverlap, 120)) {
        closeNav();
      } else {
        openNav();
      }
    }
  
});


// LI Flyaways (Desktop)
liFlyawayLink.each(function() {
  
  var self = $(this).parent();
  var linkTrigger = $(this);
  var childMenu = self.find('ul').first();
    
  $(this).on('click', function(e) {  
    
     e.preventDefault();
    
    if(!self.hasClass('active')) {
      
      self.addClass('active');
      linkTrigger.attr('aria-expanded','true');
      
    } else {
      
      self.removeClass('active');
      linkTrigger.attr('aria-expanded','false');
      
    }
    
  });
  
});

// Mobile Submenus
liMobileSubmenu.each(function() {

  var self = $(this);
  var menuLink = self.attr('data-opens');
  var link = $(this).find('[aria-expanded]').first();
  var menu = $('[data-submenu="' + menuLink + '"]');
  var backLink = menu.find('li.back a');
  
  link.on('click', function() {
    if(!self.hasClass('active')) {
      TweenLite.to(menu, 0.2, { x:0, ease: Power1.easeInOut,onComplete:addClass });
      link.attr('aria-expanded', 'true');
    }
  });
  backLink.on('click', function() {
    TweenLite.to(menu, 0.2, { x:270, ease: Power1.easeInOut,onComplete:removeClass });
    link.attr('aria-expanded', 'false');
  });
  
  function addClass() {
    self.addClass('active');
    menu.find('.back a').focus();
  };
  function removeClass() {
    self.removeClass('active');
    link.focus();
  };
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