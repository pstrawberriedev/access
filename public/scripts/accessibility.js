// Scripts

console.log('--> accessibility.js');

/*---------------
  #Utility
---------------*/

// Reusable Function: Check aria-hidden status
function ariaCheck(ele) {
  return ele.attr('aria-hidden');
}

// Disable child elements from being tabbed
// @parent: pass in parent element
// @type: in types of child elements to be enabled
// **WARNING** This can break tabbability if not used properly
function disableChildTabbing(parent, type) {
  parent.find(type).attr('tabindex', '-1');
}

// Re-enable child element(s) tabbability
// @parent: in parent element
// @type: in types of child elements to be enabled
// **WARNING** This can break tabbability if not used properly
function enableChildTabbing(parent, type) {
  
  if(type = $('input')) {
    parent.find(type).removeAttr('tabindex');
  } else {
    parent.find(type).attr('tabindex', '1');
  }
  
}

/*---------------
  #Accordions
---------------*/

var accordion = $('.access-accordion');
var accordionInner = $('.access-accordion [role=tabpanel]');

// Check for aria-hidden status and disable tabbing appropriately
  $(document).ready(function() {
    if(ariaCheck(accordionInner) === 'true') {
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
    triggerArrow.removeClass('typcn-arrow-sorted-down');
    triggerArrow.addClass('typcn-arrow-sorted-up');
  }

  // Reusable Function: Close Accordion
  function closeAccordion() {
    TweenLite.set(inner, { height: "auto" });
    TweenLite.to(inner, 0.2, { height: 0 });
    inner.attr('aria-hidden', 'true'); // toggle aria-hidden
    triggerArrow.removeClass('typcn-arrow-sorted-up');
    triggerArrow.addClass('typcn-arrow-sorted-down');
  }
  
  // Trigger Action (Open or Close Accordion)
  trigger.on('click', function(e) {
    
    e.preventDefault();//since we have href="#", we don't want this to affect page scrolling
    
    if(ariaCheck(inner) === 'true') {
      openAccordion();
      enableChildTabbing(inner, $('input'));
    } else {
      closeAccordion();
      disableChildTabbing(inner, $('input'));
    }

  });

});
  