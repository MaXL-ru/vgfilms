$(document).ready(function () {
  $('.header__youtube').css('height',window.innerHeight + 'px');
});

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
  $('.slider-list').bxSlider({
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
      if($(window).scrollTop() > secondaryNavTopPosition - 150) {
        secondaryNav.addClass('is-fixed');
      } else {
        secondaryNav.removeClass('is-fixed');
      }
    });
  })();
  $('.calculator').on('click', '.calculator__container_switched', function () {
    var $el = $(this);
    
    $el.closest('ul').find('.calculator__container')
            .removeClass('calculator__container_selected');
    
    $el.addClass('calculator__container_selected');
    
    $el.closest('ul').find('input[type="radio"]').prop('checked', false);
    $el.find('input[type="radio"]').prop('checked', true);
  });
  $('.photo-list a').fancybox(
{
helpers : {
        overlay : {
            locked: false
        }
    }
});

});

(function () {
  var vgCalculator = angular.module('vgAngular', []);
  
  vgCalculator.controller(
    'vgCalculatorController',
    [
      '$scope', '$interval',
      function ($scope, $interval) {
        $scope.types = [
          {
            title: 'Реклама',
            name: 'adv',
            price: 0,
            description: 'Проекты, содержащие прямую рекламу',
            formats: [
              {
                title: 'ТВ / Кинотеатр',
                name: 'tv',
                description: '(10 - 30 сек)',
                price: 25000
              },
              {
                title: 'Интернет-ресурс',
                name: 'internet',
                description: '(50 - 90 сек)',
                price: 36000
              },
              {
                title: 'Презентационный',
                name: 'presentation',
                description: '(90 - 300 сек)',
                price: 70000
              }
            ]
          },
          {
            title: 'Музыкальное видео',
            name: 'music',
            price: 15000,
            description: 'Проекты музыкального характера в исполнении артистов',
            formats: [
              {
                title: 'Рок',
                price: 5000
              },
              {
                title: 'Реп',
                price: 10000
              },
              {
                title: 'Поп',
                price: 10000
              },
              {
                title: 'LIVE-выступления',
                price: 20000
              },
              {
                title: 'Другое',
                price: 0
              }
            ]
          },
          {
            title: 'Спортивное видео',
            name: 'sport',
            price: 20000,
            description: 'Проекты, действующие в рамках определённых видов спорта',
            formats: [
              {
                title: 'Авто\мото спорт',
                price: 5000
              },
              {
                title: 'Вело спорт',
                price: 0
              },
              {
                title: 'Водный спорт',
                price: 5000
              },
              {
                title: 'Командный спорт',
                price: 10000
              },
              {
                title: 'Другое',
                price: 0
              }
            ]
          },
          {
            title: 'Арт видео',
            name: 'art',
            price: 20000,
            description: 'Проекты, относящие к разряду напрвлений исскуства, не носящих рекламынй характер',
            formats: []
          },
          {
            title: 'Фильм',
            name: 'film',
            price: 20000,
            description: 'Короткометражные фильмы',
            formats: []
          }
        ];
        
        $scope.options = [
          {
            title: 'Звук',
            values: [
              {
                name : 'voiceSpeaker',
                title: 'Голос диктора'
              },
              {
                name : 'voiceRecord',
                title: 'Запись звука'
              }
            ]
          },
          {
            title: 'Анимация',
            values: [
              {
                name : 'animationBegin',
                title: 'Начало'
              },
              {
                name : 'animationMiddle',
                title: 'Середина'
              },
              {
                name : 'animationEnd',
                title: 'Конец'
              }
            ]
          },
          {
            title: 'Графика',
            values: [
              {
                name : 'drawingBegin',
                title: 'Начало'
              },
              {
                name : 'drawingMiddle',
                title: 'Середина'
              },
              {
                name : 'drawingEnd',
                title: 'Конец'
              }
            ]
          },
          {
            title: 'Территория',
            values: [
              {
                name : 'territoryVl',
                title: 'Владивосток'
              },
              {
                name : 'territoryArtem',
                title: 'Артём'
              },
              {
                name : 'territoryPrim',
                title: 'Приморский край'
              }
            ]
          },
        ];
        
        $scope.optionsPrices = {
          // adv
          tv: {
            // sound
            voiceSpeaker    : 3000,
            voiceRecord     : 2000,
            // animation
            animationBegin  : 2000,
            animationMiddle : 2000,
            animationEnd    : 2000,
            // drawing
            drawingBegin    : 3000,
            drawingMiddle   : 3000,
            drawingEnd      : 3000,
            // territory
            territoryVl     : 0,
            territoryArtem  : 3000,
            territoryPrim   : 5000
          },
          internet: {
            // sound
            voiceSpeaker    : 3000,
            voiceRecord     : 3000,
            // animation
            animationBegin  : 3000,
            animationMiddle : 3000,
            animationEnd    : 3000,
            // drawing
            drawingBegin    : 4000,
            drawingMiddle   : 4000,
            drawingEnd      : 4000,
            // territory
            territoryVl     : 0,
            territoryArtem  : 3000,
            territoryPrim   : 5000
          },
          presentation: {
            // sound
            voiceSpeaker    : 5000,
            voiceRecord     : 5000,
            // animation
            animationBegin  : 3000,
            animationMiddle : 3000,
            animationEnd    : 3000,
            // drawing
            drawingBegin    : 5000,
            drawingMiddle   : 5000,
            drawingEnd      : 5000,
            // territory
            territoryVl     : 0,
            territoryArtem  : 3000,
            territoryPrim   : 10000
          },
          music: {
            voiceSpeaker    : 0,
            voiceRecord     : 0,
            animationBegin  : 2000,
            animationMiddle : 2000,
            animationEnd    : 2000,
            drawingBegin    : 3000,
            drawingMiddle   : 3000,
            drawingEnd      : 3000,
            territoryVl     : 0,
            territoryArtem  : 3000,
            territoryPrim   : 5000
          },
          // sport
          sport: {
            // sound
            voiceSpeaker    : 3000,
            voiceRecord     : 2000,
            // animation
            animationBegin  : 3000,
            animationMiddle : 3000,
            animationEnd    : 3000,
            // drawing
            drawingBegin    : 5000,
            drawingMiddle   : 5000,
            drawingEnd      : 5000,
            // territory
            territoryVl     : 0,
            territoryArtem  : 3000,
            territoryPrim   : 10000
          },
          art: {
            // sound
            voiceSpeaker    : 3000,
            voiceRecord     : 3000,
            // animation
            animationBegin  : 3000,
            animationMiddle : 3000,
            animationEnd    : 3000,
            // drawing
            drawingBegin    : 5000,
            drawingMiddle   : 5000,
            drawingEnd      : 5000,
            // territory
            territoryVl     : 0,
            territoryArtem  : 3000,
            territoryPrim   : 8000
          },
          // film
          film: {
            // sound
            voiceSpeaker    : 5000,
            voiceRecord     : 5000,
            // animation
            animationBegin  : 3000,
            animationMiddle : 5000,
            animationEnd    : 3000,
            // drawing
            drawingBegin    : 5000,
            drawingMiddle   : 10000,
            drawingEnd      : 5000,
            // territory
            territoryVl     : 0,
            territoryArtem  : 5000,
            territoryPrim   : 10000
          }
        };
        $scope.scenesPrices = [
          0,
          0,
          5000,
          10000,
          15000,
          19000,
          23000,
          26000,
          29000,
          31000,
          33000,
          35000,
          37000,
          38500,
          40000,
          41500,
          42500,
          43500,
          44500
        ];
        
        $scope.formats = [];
        
        $scope.selected = {
          type          : null,
          format        : null,
          scenesQuantity: 0,
          options       : {
            voiceSpeaker    : false,
            voiceRecord     : false,
            animationBegin  : false,
            animationMiddle : false,
            animationEnd    : false,
            drawingBegin    : false,
            drawingMiddle   : false,
            drawingEnd      : false,
            territoryVl     : false,
            territoryArtem  : false,
            territoryPrim   : false
          }
        };
        
        $scope.scenePrice = 0;
        
        $scope.totalPrice = 0;
        
        $scope.selectType = function (type) {
          $scope.selected.type = type;
          $scope.formats = type.formats;
          
          $scope.selected.format = null;
          if (type.name === 'music') {
            $scope.selected.options.voiceSpeaker = false;
            $scope.selected.options.voiceRecord = false;
          }
          
          _calculate();
        };
        
        $scope.selectFormat = function (format) {
          $scope.selected.format = format;
          
          _calculate();
        };
        
        $scope.selectOption = function () {
          _calculate();
        };

        $interval(
          function () {
            $scope.selected.scenesQuantity =
                    $('.calculator__scenes__quantity').val();
            
            $scope.scenePrice = Math.round(
              $scope.scenesPrices[$scope.selected.scenesQuantity - 1] /
              $scope.selected.scenesQuantity
            );
            _calculate();
          },
          200
        );
        
        var _calculate = function () {
          var s = $scope.selected,
              v,
              format = $scope.selected.format,
              type = $scope.selected.type,
              optionsPrices =
                format && $scope.optionsPrices[format.name] ?
                  $scope.optionsPrices[$scope.selected.format.name] :
                  (
                    type && $scope.optionsPrices[type.name] ?
                      $scope.optionsPrices[$scope.selected.type.name] :
                      false
                  );
          
          $scope.totalPrice =
            (s.type ? s.type.price : 0)
            +
            (s.format ? s.format.price : 0)
            +
            $scope.scenesPrices[$scope.selected.scenesQuantity - 1];
          
          if (optionsPrices !== false) {
            for (v in $scope.selected.options) {
              $scope.totalPrice += Number($scope.selected.options[v]) *
                      optionsPrices[v];
            }
          }
        };
      }
    ]
  );
  
  angular.bootstrap(document, ['vgAngular']);
})();
