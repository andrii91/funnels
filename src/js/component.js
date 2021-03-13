$(document).ready(function () {
  $('.faq-item').click(function () {
    //    console.log($(this))
    $(this).toggleClass('active');
    $(this).find('.more').slideToggle();
  })
  var countThisInput = 0;

  if ($('input').hasClass('required-input')) {
    $('.required-input').mask("9");

    $('.number-inputs').each(function () {
      //      $(this).parent().find('.submit').attr('disabled', true);



      //      console.log($(this).find('.required-input').first());

      $($(this).find('.required-input')).attr('disabled', 'disabled');

      if (!$(this).find('.required-input').hasClass('blocked')) {
        $($(this).find('.required-input').first()).removeAttr('disabled');
      }




    })

    $('.required-input').on('keyup', function (e) {
      var countAllInput = $(this).parent().find('.required-input').length;

      if (e.keyCode == 8) {
        $(this).prev('input').focus();
        countThisInput = countAllInput - 1;
        //        $(this).parents('.veryfy').find('.submit').attr('disabled', true);

      }

      if ($(this).val().match(/^\d{1}$/) && $(this).val().length >= 1) {
        $(this).next('input').removeAttr('disabled').focus();
        countThisInput++;

        /*if (countThisInput >= countAllInput) {
          $(this).parents('.veryfy').find('.submit').removeAttr('disabled');
        } else {
          $(this).parents('.veryfy').find('.submit').attr('disabled', true);
        }*/
      }


      console.log('countThisInput', countThisInput)




    });


  }



  $('select').each(function () {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    if ($this.children('option[selected]')) {
      $styledSelect.text($this.children('option[selected]').text());

      if ($styledSelect.text() != '') {
        $styledSelect.addClass('select-item');
      }

    }



    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function () {
        $(this).removeClass('active').next('ul.select-options').slideUp();
      });
      $(this).toggleClass('active').next('ul.select-options').slideToggle();
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active').addClass('select-item');
      $this.val($(this).attr('rel'));
      $list.slideUp();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.slideUp();
    });

  });


  $('.input-text').each(function () {
    $(this).parent().prepend('<div class="label-text">' + $(this).attr('placeholder') + '</div>')
    $(this).removeAttr('placeholder');
    if ($(this).val().length !== 0 || $(this).text().length !== 0) {
      $(this).parents('.label').addClass('active');
    }
  })

  $('.input-text').focusin(function () {
    $(this).parents('.label').addClass('active');
  })

  $('.input-text').focusout(function () {
    //    console.log($(this).val().length);
    if ($(this).val().length == 0) {
      $(this).parents('.label').removeClass('active');
    }
  })


  function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
  }

  $('.copy-btn').click(function (e) {
    e.preventDefault();
    $(this).parents('.keywords').find('input').addClass('active');
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(this).parents('.keywords').find('input').val()).select();
    document.execCommand("copy");
    $tmp.remove();
    setTimeout(function(){
      $('.keywords input').removeClass('active');
    }, 1000)

  })

  $('.copy-textarea').click(function (e) {
    e.preventDefault();

    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(this).parent().find('textarea').text()).select();
    document.execCommand("copy");
    $tmp.remove();

  })

  //Show more
  var testimonialsLength = 0;

  $('.testimonials-item .small').each(function () {
    testimonialsLength = $(this).text().length;


    if (testimonialsLength > 176) {
      $(this).css({
        'height': '250px',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
      })
      $(this).append('<a href="#more" class="testimonials-more">Show more</a>')
    }
  })

  $('.testimonials-more').click(function () {
    $(this).hide(150);

    $(this).parent().css({
      'height': 'auto',
    })
  })




  $('input[name="phone"]').intlTelInput({
    defaultCountry: "us",
    initialCountry: "auto",
    //    preferredCountries: ["ua", "ru", 'az', 'am', 'by', 'kz', 'kg', 'md', 'tj', 'uz', 'tm', 'ge'],
    autoPlaceholder: 'aggressive',
    nationalMode: true,
    customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
      return "+" + selectedCountryData.dialCode;
    },
    geoIpLookup: function (success, failure) {

      $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
        var countryCode = (resp && resp.country) ? resp.country : "us";
        success(countryCode);
      });
    },
    separateDialCode: true,
    formatOnDisplay: true,
    //		utilsScript: 'https://mk.beauty-matrix.ru/assets/plugins/intltelinput/js/utils.js',
  });


  $('.check').each(function () {
    $(this).on('change', function () {
      var form = $(this).parents('form');

      if ($(this).prop('checked')) {

        form.find('.phone').slideDown();
      } else {
        form.find('.phone').slideUp();
      }
    });
  });








  $('.create-steps').slick({
    dots: false,
    infinite: false,
    draggable: false,
    swipe: false,
    arrows: false,
    speed: 750,
    slidesToShow: 1,
    centerMode: true,
    adaptiveHeight: true,

  });

  var slideCount = $('.create-steps .item').length;

  $('.progress .title span').text('0%')
  $('.progress .line span').css({
    'width': '0%'
  })



  $('.prev-step').click(function (e) {
    e.preventDefault();
    $('.create-steps').slick('slickPrev');
  })

  $('.next-step').click(function (e) {
    e.preventDefault();
    if ($(this).parents('.form')) {

      var form = $(this).parents('.form'),
        error = 0;
      var field = [];
      form.find('[data-validate]').each(function () {
        field.push('[data-validate]');
        var value = $(this).val(),
          line = $(this).closest('.label');
        for (var i = 0; i < field.length; i++) {
          if (!value) {
            line.addClass('error');
            error = 1;
            setTimeout(function () {
              line.removeClass('error')
            }.bind(this), 2000);
            event.preventDefault();
          }
        }
      });

      if (error !== 1) {
        //        $(this).unbind('submit').submit();
        $('.create-steps').slick('slickNext');
        var id = '#funnels-lib',
          top = $(id).offset().top;

        $('body,html').animate({
          scrollTop: top - 80
        }, 100);

      }

    }
  })

  $('.submit').click(function (e) {
    e.preventDefault();
    if ($(this).parents('.veryfy-wrap')) {

      var form = $(this).parents('.veryfy-wrap'),
        error = 0;
      var field = [];
      form.find('input[data-validate]').each(function () {
        field.push('input[data-validate]');
        var value = $(this).val(),
          line = $(this).closest('.veryfy-wrap');
        for (var i = 0; i < field.length; i++) {
          if (!value) {
            line.addClass('error');
            line.find('.title').text('Enter correct PIN:')
            error = 1;
            setTimeout(function () {
              line.removeClass('error')
              line.find('.title').text('Enter PIN:')
            }.bind(this), 2000);
            event.preventDefault();
          }
        }
      });

      if (error !== 1) {
        $(this).unbind(e);
        //        $('.create-steps').slick('slickNext');

      }

    }
  })





  $('.create-steps').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.progress .title span').text(((100 / slideCount) * nextSlide).toFixed() + '%')
    $('.progress .line span').css({
      'width': (100 / slideCount) * nextSlide + '%'
    });

    $('.input-text').each(function () {
      if ($(this).val().length !== 0) {
        $(this).parents('.label').addClass('active');
      }
    })

  });


  /*  $('.paste-btn').click(function(e){
      e.preventDefault();
  //    $(this).parent().find('input').val(document.execCommand("paste"))
      $(this).parent().find('input').val(paste())
    })*/

  var cStars = function (nowPos) {
    // У всех убираем active
    $('.testimonials-rating.large .star').removeClass('active');

    for (var i = 0; nowPos + 1 > i; i++) {
      $('.testimonials-rating.large .star').eq(i).toggleClass('active');
    }
  }
  // переменная содержит количество активных звезд
  var starsCount = $('.star.active').length;

  // При наведении
  $('.testimonials-rating.large .star').hover(function () {
    cStars($(this).index());
  });

  // При клике
  $('.testimonials-rating.large .star').click(function () {
    cStars($(this).index());
    // меняем количество по клику
    starsCount = $('.star.active').length;
  });

  // Как только отводим мышку, возвращаем количество активных айтемов, которые были изначально
  $('.testimonials-rating.large .star').on('mouseleave', function () {
    cStars(+starsCount - 1);
  });

  var countClickTextarea = 0;
  
  $('textarea.input-text').click(function(){
    if(countClickTextarea == 0) {
      $(this).text('');
//      countClickTextarea++;
    }
  })

});