  //Move side boxes below main content on mobile devices

$(document).ready(function() {
  checkSize();
  $(window).resize(checkSize);
});

function checkSize(){
  if ($("#mobile-indicator").is(':visible')){
      $('#s-lg-col-0').detach().appendTo('#s-lg-guide-main');
  }
  else {
      $('#s-lg-col-0').detach().appendTo('#s-lg-guide-tabs > .s-lg-row');
  }
}

  // Hide elements with class 'admin-only'

  if (!window.location.href.includes("admin_c")) {
    const adminElements = document.querySelectorAll(".admin-only");
    adminElements.forEach(element => {
      element.style.display = "none";
    });
  }
  
  // Accordions

  /**
 * Converts tabs with [Accordion] in title to Bootstrap 5 Accordions
 * Only activates when URL does not contain "admin_c"
 */
(function($) {
  if (window.location.href.indexOf('admin_c') >= 0) {
    return; // Skip execution of the entire script
  }

  function convertTabsToAccordions() {
    $('.s-lib-jqtabs').each(function() {
      var $box = $(this).closest('.s-lib-box');
      if (!$box.length) return;
      
      var $title = $box.find('h2.s-lib-box-title');
      if (!$title.length) return;
      
      var titleHTML = $title.html();
      if (titleHTML.indexOf('[Accordion]') === -1) return;
      
      $title.html(titleHTML.replace('[Accordion]', ''));
      
      var $tabList = $(this).find('ul.nav-tabs');
      var $tabContent = $(this).find('.tab-content');
      if (!$tabList.length || !$tabContent.length) return;
      
      var sectionId = 'section-' + Math.floor(Math.random() * 1000000);
      var accordionId = 'accordion-' + Math.floor(Math.random() * 1000000);

      var $sectionWrapper = $('<div>', { 'id': sectionId });

      var $accordion = $('<div>', {
        'class': 'accordion',
        'id': accordionId
      });

      // Create Expand All / Collapse All buttons aligned to the right
      var $buttonContainer = $('<div>', { 'class': 'mb-2 d-flex justify-content-end' });

      var $expandAllButton = $('<button>', {
        'class': 'btn btn-sm btn-link text-muted btn-no-arrow me-2',
        'text': 'Expand All',
        'click': function() {
          $('#' + accordionId + ' .accordion-collapse').addClass('show');
          $('#' + accordionId + ' .accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
        }
      });

      var $collapseAllButton = $('<button>', {
        'class': 'btn btn-sm btn-link text-muted btn-no-arrow',
        'text': 'Collapse All',
        'click': function() {
          $('#' + accordionId + ' .accordion-collapse').removeClass('show');
          $('#' + accordionId + ' .accordion-button').addClass('collapsed').attr('aria-expanded', 'false');
        }
      });

      $buttonContainer.append($expandAllButton, $collapseAllButton);

      $tabList.find('a[role="tab"]').each(function(index) {
        var panelId = $(this).attr('aria-controls');
        var $panel = $('#' + panelId);
        if (!$panel.length) return;

        var headingId = 'heading-' + panelId;
        var collapseId = 'collapse-' + panelId;

        var $accordionItem = $('<div>', { 'class': 'accordion-item' });
        var $accordionHeader = $('<h3>', { 'class': 'accordion-header', 'id': headingId });
        var $accordionButton = $('<button>', {
          'class': 'accordion-button' + (index === 0 ? '' : ' collapsed'),
          'type': 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#' + collapseId,
          'aria-expanded': index === 0 ? 'true' : 'false',
          'aria-controls': collapseId,
          'html': $(this).html()
        });

        var $accordionCollapse = $('<div>', {
          'id': collapseId,
          'class': 'accordion-collapse collapse' + (index === 0 ? ' show' : ''),
          'aria-labelledby': headingId,
          'data-bs-parent': '#' + accordionId
        });

        var $accordionBody = $('<div>', {
          'class': 'accordion-body',
          'html': $panel.html()
        });

        $accordionHeader.append($accordionButton);
        $accordionCollapse.append($accordionBody);
        $accordionItem.append($accordionHeader, $accordionCollapse);
        $accordion.append($accordionItem);
      });

      // Create "Top of Section" link with faster scrolling
      var $backToTop = $('<div>', { 'class': 'mt-3 d-flex justify-content-end' }).append(
        $('<a>', {
          'href': '#' + sectionId,
          'class': 'small text-muted',
          'text': 'Top of Section',
          'click': function(event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: $('#' + sectionId).offset().top }, 300); // Faster scroll (300ms)
          }
        })
      );

      // Insert everything into a wrapper div
      $sectionWrapper.append($buttonContainer, $accordion, $backToTop);
      $(this).replaceWith($sectionWrapper);
    });
  }

  $(document).ready(function() {
    convertTabsToAccordions();
  });

  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          var $addedNodes = $(mutation.addedNodes);
          var hasTabs = $addedNodes.find('.s-lib-jqtabs').length > 0 || 
                        $addedNodes.filter('.s-lib-jqtabs').length > 0;
          if (hasTabs) {
            convertTabsToAccordions();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (typeof springSpace !== 'undefined') {
    $(document).on('s-lib-widget-refresh-complete', function() {
      convertTabsToAccordions();
    });

    if (springSpace.event) {
      springSpace.event.subscribe('content.loaded', function() {
        convertTabsToAccordions();
      });
    }
  }

})(jQuery);

// Turns tabs into accordions on mobile

(function($) {
  // Skip if we're on an admin page
  if (window.location.href.indexOf('admin_c') >= 0) {
    return;
  }

  // Function to check if the mobile indicator is visible
  function isMobileView() {
    return $('#mobile-indicator').is(':visible');
  }

  // Keep track of which tabs have been converted
  var convertedTabs = [];

  // Function to convert tabs to accordions in mobile view
  function handleResponsiveTabs() {
    if (!isMobileView()) {
      // If not in mobile view, restore any previously converted tabs
      restoreOriginalTabs();
      return;
    }

    // Target only tabs that don't have [Accordion] in their title
    // This avoids conflict with the existing accordion converter
    $('.s-lib-jqtabs').each(function() {
      var $tabContainer = $(this);
      var tabId = $tabContainer.attr('id') || 'tab-' + Math.floor(Math.random() * 1000000);
      
      // Skip if already processed by the other script
      var $box = $tabContainer.closest('.s-lib-box');
      if ($box.length) {
        var $title = $box.find('h2.s-lib-box-title');
        if ($title.length && $title.html().indexOf('[Accordion]') !== -1) {
          return;
        }
      }
      
      // Skip if already converted by this script
      if (convertedTabs.includes(tabId)) {
        return;
      }
      
      // Store original structure before converting
      $tabContainer.attr('data-original-html', $tabContainer.html());
      $tabContainer.attr('id', tabId);
      
      var $tabList = $tabContainer.find('ul.nav-tabs');
      var $tabContent = $tabContainer.find('.tab-content');
      
      if (!$tabList.length || !$tabContent.length) return;
      
      var accordionId = 'responsive-accordion-' + tabId;
      
      // Create accordion container
      var $accordion = $('<div>', {
        'class': 'accordion responsive-accordion',
        'id': accordionId
      });
      
      // Create control buttons
      var $buttonContainer = $('<div>', { 
        'class': 'mb-2 d-flex justify-content-end' 
      });
      
      var $expandAllButton = $('<button>', {
        'class': 'btn btn-sm btn-link text-muted btn-no-arrow me-2',
        'text': 'Expand All',
        'click': function(e) {
          e.preventDefault();
          $('#' + accordionId + ' .accordion-collapse').addClass('show');
          $('#' + accordionId + ' .accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
        }
      });
      
      var $collapseAllButton = $('<button>', {
        'class': 'btn btn-sm btn-link text-muted btn-no-arrow',
        'text': 'Collapse All',
        'click': function(e) {
          e.preventDefault();
          $('#' + accordionId + ' .accordion-collapse').removeClass('show');
          $('#' + accordionId + ' .accordion-button').addClass('collapsed').attr('aria-expanded', 'false');
        }
      });
      
      $buttonContainer.append($expandAllButton, $collapseAllButton);
      
      // Convert each tab to an accordion panel
      $tabList.find('a[role="tab"]').each(function(index) {
        var panelId = $(this).attr('aria-controls');
        var $panel = $('#' + panelId);
        if (!$panel.length) return;
        
        var headingId = 'responsive-heading-' + panelId;
        var collapseId = 'responsive-collapse-' + panelId;
        
        var $accordionItem = $('<div>', { 'class': 'accordion-item' });
        var $accordionHeader = $('<h3>', { 'class': 'accordion-header', 'id': headingId });
        var $accordionButton = $('<button>', {
          'class': 'accordion-button' + (index === 0 ? '' : ' collapsed'),
          'type': 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#' + collapseId,
          'aria-expanded': index === 0 ? 'true' : 'false',
          'aria-controls': collapseId,
          'html': $(this).html()
        });
        
        var $accordionCollapse = $('<div>', {
          'id': collapseId,
          'class': 'accordion-collapse collapse' + (index === 0 ? ' show' : ''),
          'aria-labelledby': headingId,
          'data-bs-parent': '#' + accordionId
        });
        
        var $accordionBody = $('<div>', {
          'class': 'accordion-body',
          'html': $panel.html()
        });
        
        $accordionHeader.append($accordionButton);
        $accordionCollapse.append($accordionBody);
        $accordionItem.append($accordionHeader, $accordionCollapse);
        $accordion.append($accordionItem);
      });
      
      // Add a "back to top" link
      var $backToTop = $('<div>', { 'class': 'mt-3 d-flex justify-content-end' }).append(
        $('<a>', {
          'href': '#' + tabId,
          'class': 'small text-muted',
          'text': 'Top of Section',
          'click': function(event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: $('#' + tabId).offset().top }, 300);
          }
        })
      );
      
      // Replace tabs with accordion
      $tabContainer.empty().append($buttonContainer, $accordion, $backToTop);
      
      // Mark as converted
      convertedTabs.push(tabId);
    });
  }
  
  // Function to restore tabs to their original state
  function restoreOriginalTabs() {
    convertedTabs.forEach(function(tabId) {
      var $tabContainer = $('#' + tabId);
      if ($tabContainer.length && $tabContainer.attr('data-original-html')) {
        $tabContainer.html($tabContainer.attr('data-original-html'));
      }
    });
    convertedTabs = [];
  }
  
  // Initial conversion on document ready
  $(document).ready(function() {
    handleResponsiveTabs();
    
    // Handle window resize events with debounce
    var resizeTimer;
    $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResponsiveTabs, 250);
    });
  });
  
  // Handle dynamically loaded content
  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          var $addedNodes = $(mutation.addedNodes);
          var hasTabs = $addedNodes.find('.s-lib-jqtabs').length > 0 || 
                        $addedNodes.filter('.s-lib-jqtabs').length > 0;
          if (hasTabs) {
            handleResponsiveTabs();
          }
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Support for SpringSpace events
  if (typeof springSpace !== 'undefined') {
    $(document).on('s-lib-widget-refresh-complete', function() {
      handleResponsiveTabs();
    });
    
    if (springSpace.event) {
      springSpace.event.subscribe('content.loaded', function() {
        handleResponsiveTabs();
      });
    }
  }
  
})(jQuery);