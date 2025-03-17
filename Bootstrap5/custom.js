(function($) {
  if (window.location.href.indexOf('admin_c') >= 0) {
    return; // Skip execution of the entire script
  }

  function convertTabsToAccordions() {
    $('.s-lib-jqtabs').each(function() {
      // Check if mobile indicator is visible
      const isMobile = $('#mobile-indicator').is(':visible');
      const $tabsContainer = $(this);
      const $box = $tabsContainer.closest('.s-lib-box');
      
      // For non-mobile view, restore tabs if they were previously converted
      if (!isMobile) {
        if ($tabsContainer.data('accordion-initialized')) {
          restoreTabsFromAccordion($tabsContainer);
        }
        return;
      }
      
      // Skip if already converted to accordion
      if ($tabsContainer.data('accordion-initialized')) {
        return;
      }
      
      // Check if it has [Accordion] in the title (for backward compatibility)
      const shouldConvert = isMobile || ($box.length && 
        $box.find('h2.s-lib-box-title').length && 
        $box.find('h2.s-lib-box-title').html().indexOf('[Accordion]') !== -1);
      
      if (!shouldConvert) return;
      
      // If it has [Accordion] in title, remove the tag
      if ($box.length) {
        const $title = $box.find('h2.s-lib-box-title');
        if ($title.length && $title.html().indexOf('[Accordion]') !== -1) {
          $title.html($title.html().replace('[Accordion]', ''));
        }
      }
      
      // Store original tabs structure
      $tabsContainer.data('original-tabs', $tabsContainer.clone(true));
      $tabsContainer.data('accordion-initialized', true);
      
      const $tabList = $tabsContainer.find('ul.nav-tabs');
      const $tabContent = $tabsContainer.find('.tab-content');
      if (!$tabList.length || !$tabContent.length) return;
      
      const sectionId = 'section-' + Math.floor(Math.random() * 1000000);
      const accordionId = 'accordion-' + Math.floor(Math.random() * 1000000);

      const $sectionWrapper = $('<div>', { 'id': sectionId, 'class': 'responsive-accordion-wrapper' });

      const $accordion = $('<div>', {
        'class': 'accordion',
        'id': accordionId
      });

      // Create Expand All / Collapse All buttons aligned to the right
      const $buttonContainer = $('<div>', { 'class': 'mb-2 d-flex justify-content-end' });

      const $expandAllButton = $('<button>', {
        'class': 'btn btn-sm btn-light btn-no-arrow me-2',
        'text': 'Expand All',
        'click': function() {
          $('#' + accordionId + ' .accordion-collapse').addClass('show');
          $('#' + accordionId + ' .accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
        }
      });

      const $collapseAllButton = $('<button>', {
        'class': 'btn btn-sm btn-light btn-no-arrow',
        'text': 'Collapse All',
        'click': function() {
          $('#' + accordionId + ' .accordion-collapse').removeClass('show');
          $('#' + accordionId + ' .accordion-button').addClass('collapsed').attr('aria-expanded', 'false');
        }
      });

      $buttonContainer.append($expandAllButton, $collapseAllButton);

      $tabList.find('a[role="tab"]').each(function(index) {
        const panelId = $(this).attr('aria-controls');
        const $panel = $('#' + panelId);
        if (!$panel.length) return;

        const headingId = 'heading-' + panelId;
        const collapseId = 'collapse-' + panelId;

        const $accordionItem = $('<div>', { 'class': 'accordion-item' });
        const $accordionHeader = $('<h2>', { 'class': 'accordion-header', 'id': headingId });
        const $accordionButton = $('<button>', {
          'class': 'accordion-button' + (index === 0 ? '' : ' collapsed'),
          'type': 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#' + collapseId,
          'aria-expanded': index === 0 ? 'true' : 'false',
          'aria-controls': collapseId,
          'html': $(this).html()
        });

        const $accordionCollapse = $('<div>', {
          'id': collapseId,
          'class': 'accordion-collapse collapse' + (index === 0 ? ' show' : ''),
          'aria-labelledby': headingId,
          'data-bs-parent': '#' + accordionId
        });

        const $accordionBody = $('<div>', {
          'class': 'accordion-body',
          'html': $panel.html()
        });

        $accordionHeader.append($accordionButton);
        $accordionCollapse.append($accordionBody);
        $accordionItem.append($accordionHeader, $accordionCollapse);
        $accordion.append($accordionItem);
      });

      // Create "Top of Section" link with faster scrolling
      const $backToTop = $('<div>', { 'class': 'mt-3 d-flex justify-content-end' }).append(
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
      $tabsContainer.after($sectionWrapper);
      $tabsContainer.hide();
    });
  }

  // Function to restore tabs from accordion
  function restoreTabsFromAccordion($tabsContainer) {
    const $accordion = $tabsContainer.next('.responsive-accordion-wrapper');
    if ($accordion.length) {
      $accordion.remove();
      $tabsContainer.show();
    }
  }

  // Check viewport size and convert tabs on page load
  function checkViewportAndConvert() {
    convertTabsToAccordions();
  }

  $(document).ready(function() {
    checkViewportAndConvert();
  });

  // React to window resize
  $(window).on('resize', function() {
    checkViewportAndConvert();
  });

  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          const $addedNodes = $(mutation.addedNodes);
          const hasTabs = $addedNodes.find('.s-lib-jqtabs').length > 0 || 
                        $addedNodes.filter('.s-lib-jqtabs').length > 0;
          if (hasTabs) {
            checkViewportAndConvert();
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
      checkViewportAndConvert();
    });

    if (springSpace.event) {
      springSpace.event.subscribe('content.loaded', function() {
        checkViewportAndConvert();
      });
    }
  }

})(jQuery);