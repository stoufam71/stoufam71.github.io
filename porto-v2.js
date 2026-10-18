// Phone frame, dots and caption for every screenshot carousel.
$(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('.project .carousel').each(function () {
    var $c = $(this);
    var $items = $c.find('.carousel-item');
    var $dots = $('<div class="shot-dots" role="group" aria-label="Screens"></div>');
    var $cap = $('<p class="shot-caption" aria-live="polite"></p>');
    $items.each(function (i) {
      $('<button type="button"></button>')
        .attr('aria-label', 'Show screen ' + (i + 1))
        .on('click', function () { $c.carousel(i); })
        .appendTo($dots);
    });
    function sync(i) {
      $dots.children().removeClass('active').removeAttr('aria-current')
        .eq(i).addClass('active').attr('aria-current', 'true');
      // alt is "App: Screen name"; show only the screen name
      $cap.text(($items.eq(i).find('img').attr('alt') || '').replace(/^[^:]*:\s*/, ''));
    }
    // tablet carousels reuse the phone frame styles with a wider landscape override
    $c.wrap($c.hasClass('tablet-carousel') ? '<div class="phone tablet"></div>' : '<div class="phone"></div>').parent().append($dots, $cap);
    $c.on('slide.bs.carousel', function (e) { sync(e.to); });
    sync(Math.max(0, $items.index($items.filter('.active'))));
    // Bootstrap starts data-ride carousels on window load; dropping the attribute keeps them still
    if (reduce) $c.removeAttr('data-ride');
  });
});
