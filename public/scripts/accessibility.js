// Scripts

console.log('--> accessibility.js');


/*---------------
  #Accordions
---------------*/

var accordion = $('.access-accordion');

accordion.each(function() {

  // Accordion Variables
  var self = $(this);
  var trigger = $(this).find('a[role=tab]');
  var inner = $(this).find('[role=tabpanel]');

  // Reusable Function: Open Accordion
  function openAccordion() {
    TweenLite.set(inner, { height: "auto" });
    TweenLite.from(inner, 0.2, { height: 0 });
    inner.attr('aria-hidden', 'false'); // toggle aria-hidden
  }

  // Reusable Function: Close Accordion
  function closeAccordion() {
    TweenLite.set(inner, { height: "auto" });
    TweenLite.to(inner, 0.2, { height: 0 });
    inner.attr('aria-hidden', 'true'); // toggle aria-hidden
  }

  // Reusable Function: Check aria-hidden status
  function ariaCheck(ele) {
    return ele.attr('aria-hidden');
  }

  // Trigger Action (Open or Close Accordion)
  trigger.on('click', function(e) {
    
    e.preventDefault();//since we have href="#", we don't want this to affect page scrolling
    
    if(ariaCheck(inner) === 'true') {
      openAccordion();
    } else {
      closeAccordion();
    }

  });

});
  