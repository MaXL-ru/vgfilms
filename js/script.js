$(document).ready(function () {
  // open video dialog
  $('[data-youtube-id]').click(function (e) {
    var $el = $(this),
        $dialog = $('#dialog_video'),
        $content = $dialog.find('.dialog_content'); 
    
    e.preventDefault();
    
    $dialog.bPopup({
      onOpen: function() {
        $content.html(
          $('#dialog_video_template').html().replace('~id~', $el.data('youtube-id')
        ));
      },
      onClose: function() {
        $content.empty();
      }
    });
  });
  
  $('.video-tags a').click(function (e) {
    var $el = $(this);
    
    e.preventDefault();
    
    $el.closest('ul').find('a').removeClass('video-tags__a_selected');
    $el.addClass('video-tags__a_selected');
  });
  
  $(document).foundation();
  $('.video-list').bxSlider({
    auto: false,
    adaptiveHeight: false,
    controls: true,
    pager: false,
    minSlides: 3,
    maxSlides: 3,
    moveSlides: 1,
    slideMargin: 30,
    slideWidth: ($('.row:eq(0)').width() - 2 * 30) / 3,
    nextText: 'Вперёд',
    prevText: 'Назад'
  });
  $('.photo-list').bxSlider({
    auto: false,
    adaptiveHeight: false,
    controls: true,
    pager: false,
    minSlides: 4,
    maxSlides: 4,
    moveSlides: 1,
    slideMargin: 30,
    slideWidth: ($('.row:eq(0)').width() - 2 * 30) / 4,
    nextText: 'Вперёд',
    prevText: 'Назад'
  });
  
  (function () {
    var secondaryNav = $('.header__line'),
      secondaryNavTopPosition = secondaryNav.offset().top;

    $(window).on('scroll', function(){

      if($(window).scrollTop() > secondaryNavTopPosition - 300) {
        secondaryNav.addClass('is-fixed');
      } else {
        secondaryNav.removeClass('is-fixed');
      }
    });
  })();
});
