$(document).ready(function () {
  $('.faq-item').click(function () {
    //    console.log($(this))
    $(this).toggleClass('active');
    $(this).find('.more').slideToggle();
  })

  if ($('input').hasClass('required-input')) {
    $('.submit').attr('disabled', true);
    $('.required-input').mask("9");

    var countAllInput = $('.required-input').length,
      countThisInput = 0;

    $('.required-input').attr('disabled', 'disabled');
    $($('.required-input').first()).removeAttr('disabled');


    $('.required-input').on('keyup', function (e) {

      if (e.keyCode == 8) {
        $(this).prev('input').focus();
        countThisInput = countAllInput - 1;
        //        $('#submit').attr('disabled', true);
      }

      if ($(this).val().match(/^\d{1}$/) && $(this).val().length >= 1) {
        $(this).next('input').removeAttr('disabled').focus();
        countThisInput++;

        /*if (countThisInput >= countAllInput) {
          $('#submit').attr('disabled', false);
        } else {
          $('#submit').attr('disabled', true);
        }*/
      }


      //    console.log('countThisInput', countThisInput)




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
    $(this).removeAttr('placeholder')
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

    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(this).parents('.keywords').find('input').val()).select();
    document.execCommand("copy");
    $tmp.remove();

  })

  //Show more
  var testimonialsLength = 0;

  $('.testimonials-item .small').each(function () {
    testimonialsLength = $(this).text().length;

    //    console.log(testimonialsLength);

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




  $('input[name="phone"], input[type="tel"]').intlTelInput({
    defaultCountry: "us",
    initialCountry: "auto",
    //    preferredCountries: ["ua", "ru", 'az', 'am', 'by', 'kz', 'kg', 'md', 'tj', 'uz', 'tm', 'ge'],
    autoPlaceholder: 'aggressive',
    nationalMode: true,
    customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
      return "+" + selectedCountryData.dialCode;
    },
    geoIpLookup: function (success, failure) {
      /*
      $.get( "https://ip-api.com/json/", function( data ) {
      	var countryCode = (data.countryCode) ? data.countryCode : "ru";
      	success(countryCode);
      }, "json" );*/

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
    arrows: false,
    speed: 750,
    slidesToShow: 1,
    //    fade: true,
    centerMode: true,
    //    cssEase: 'ease-in-out',
    adaptiveHeight: true
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
    if ($(this).parents('form')) {

      var form = $(this).parents('form'),
        error = 0;
      var field = [];
      form.find('input[data-validate]').each(function () {
        field.push('input[data-validate]');
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

      }

    }
  })





  $('.create-steps').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

    /*  console.log('event', event)
      console.log('slick', slick)
      console.log('currentSlide', currentSlide)
      
      slidePosition = currentSlide + 1;*/


    $('.progress .title span').text((100 / slideCount).toFixed() * nextSlide + '%')
    $('.progress .line span').css({
      'width': (100 / slideCount) * nextSlide + '%'
    })
  });


});