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
        'class': 'btn btn-sm btn-light btn-no-arrow me-2',
        'text': 'Expand All',
        'click': function() {
          $('#' + accordionId + ' .accordion-collapse').addClass('show');
          $('#' + accordionId + ' .accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
        }
      });

      var $collapseAllButton = $('<button>', {
        'class': 'btn btn-sm btn-light btn-no-arrow',
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
        var $accordionHeader = $('<h2>', { 'class': 'accordion-header', 'id': headingId });
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