// Scripts

console.log('--> accessibility.js');

/*---------------
  #Utility
---------------*/

// Reusable Function: Check aria-hidden status
function ariaHiddenCheck(ele) {
  return ele.attr('aria-hidden');
}

// Reusable Function: Check aria-expanded status
function ariaExpandedCheck(ele) {
  return ele.attr('aria-expanded');
}

// Disable child elements from being tabbed
// @parent: pass in parent element
// @type: in types of child elements to be enabled
// **WARNING** This can break tabbability if not used properly
function disableChildTabbing(parent, type) {
  
  parent.find(type).attr('tabindex', '-1');
  parent.find(type).attr('disabled', 'disabled');
  
}

// Re-enable child element(s) tabbability
// @parent: in parent element
// @type: in types of child elements to be enabled
// **WARNING** This can break tabbability if not used properly
function enableChildTabbing(parent, type) {
  
  
  if( type == $('input') || type == $('a') || type == $('button') ) {
    
    // native tabbable elements
    parent.find(type).removeAttr('tabindex');
    parent.find(type).removeAttr('disabled');
    
  } else {
    
    // forced tabbable elements
    parent.find(type).attr('tabindex', '0');
    parent.find(type).removeAttr('disabled');
    
  }
  
  
}

/*---------------
  #Accordions
---------------*/

var accordion = $('.access-accordion');
var accordionInner = $('.access-accordion [role=tabpanel]');

// Check for aria-hidden status and disable tabbing appropriately
  $(document).ready(function() {
    if(ariaHiddenCheck(accordionInner) === 'true') {
      disableChildTabbing(accordionInner, $('input'))
    }
  });

accordion.each(function() {
  
  // Accordion Variables
  var self = $(this);
  var trigger = $(this).find('[role=tab]');
  var triggerArrow = $(this).find('[role=tab] span');
  var inner = $(this).find('[role=tabpanel]');

  // Reusable Function: Open Accordion
  function openAccordion() {
    TweenLite.set(inner, { height: "auto" });
    TweenLite.from(inner, 0.2, { height: 0 });
    inner.attr('aria-hidden', 'false'); // toggle aria-hidden
    trigger.attr('aria-expanded', 'true'); // toggle aria-expanded
    triggerArrow.removeClass('typcn-arrow-sorted-down');
    triggerArrow.addClass('typcn-arrow-sorted-up');
  }

  // Reusable Function: Close Accordion
  function closeAccordion() {
    TweenLite.set(inner, { height: "auto" });
    TweenLite.to(inner, 0.2, { height: 0 });
    inner.attr('aria-hidden', 'true'); // toggle aria-hidden
    trigger.attr('aria-expanded', 'false'); // toggle aria-expanded
    triggerArrow.removeClass('typcn-arrow-sorted-up');
    triggerArrow.addClass('typcn-arrow-sorted-down');
  }
  
  // Trigger Action (Open or Close Accordion)
  trigger.on('click', function(e) {
    
    e.preventDefault();
    
    if(ariaHiddenCheck(inner) === 'true') {
      openAccordion();
      enableChildTabbing(inner, $('input'));
    } else {
      closeAccordion();
      disableChildTabbing(inner, $('input'));
    }

  });

});
  