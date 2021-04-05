$(document).ready(function () {
  window.onkeydown = function (evt) {
    if (evt.keyCode == 9) return false;
  };
  window.onkeypress = function (evt) {
    if (evt.keyCode == 9) return false;
  };


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
      $($(this).find('.required-input')).attr('maxlength', '1');

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
    var typeInput = $(this).attr('name'), errorValue;
    
    switch (typeInput) {
      case 'name':
       errorValue = "Please enter correct name";
        break;
      case 'lastname':
       errorValue = "Please enter correct lastname";
        break;
      case 'email':
       errorValue = "Please enter correct email";
        break;
      default:
        errorValue = "Enter valid value";
    }    
    
    $(this).parent().prepend('<div data-error="'+errorValue+'" data-placeholder="'+$(this).attr('placeholder')+'" class="label-text">' + $(this).attr('placeholder') + '</div>')
    $(this).removeAttr('placeholder');
    if ($(this).val().length !== 0 || $(this).text().length !== 0) {
      $(this).parents('.label').addClass('active');
    }
  })
  
  $('.form').each(function(){
    $(this).prepend('<div class="form-error">Error: Something went wrong. Please try to. Bla-bla or enter your name and phone number below. Your Rebate Gift Card will be sent to this number via TEXT message. </div>')
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

  $('.input-text').on('keyup', function (e) {
    if ($(this).val().length == 0) {
      $(this).parents('.label').removeClass('active');
    } else {
      $(this).parents('.label').addClass('active');
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
    setTimeout(function () {
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
  var testimonialsText = 0;

  $('.testimonials-item .small').each(function () {
    testimonialsText = $(this).text();
    testimonialsLength = testimonialsText.length;


    if (testimonialsLength > 169) {
      /*$(this).css({
        'height': '250px',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
      })*/

      $(this).text(testimonialsText.substring(0, 169))
      $(this).append('<span class="more-hidden">' + testimonialsText.substring(170, testimonialsLength) + '</span>')

      $(this).append('<a href="#more" class="testimonials-more">Show more</a>')
    }
  })

  $('.testimonials-more').click(function () {
    $(this).hide(0);

    $(this).parent().find('.more-hidden').show();
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



  /*  var Star3 = $('.star3').html();
    var Star4 = $('.star4').html();
      var Star4_1 = $($('.star4')[0]).html();
      var Star4_2 = $($('.star4')[1]).html();

    $('.star3').remove();
    $('.star4').remove();*/

  /*  $('.create-steps').on('init', function (event, slick) {
      console.log("initialized");
      
      $('.slick-slide').each(function () {
        $(this).attr('id', $(this).data('slick-index'));
      })
    });*/

  var urlFirst = window.location.href.split('#')[0];

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

  if (window.location.hash) {
    //    alert("URL has hash");
    var hash = window.location.hash; // = "#login"

    if ($('[data-slick-index="' + hash.split('#')[1] + '"]').length > 0) {
      $('.create-steps').slick('slickGoTo', hash.split('#')[1], false);

      $('.progress .title span').text(((100 / slideCount) * Number(hash.split('#')[1])).toFixed() + '%')
      $('.progress .line span').css({
        'width': (100 / slideCount) * Number(hash.split('#')[1]) + '%'
      });

    }
  }






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
    
      if ($(this).parents('.form')) {

      var form = $(this).parents('.form'),
        error = 0;
      var field = [];
      form.find('input[data-validate]').each(function () {
        field.push('input[data-validate]');
        var value = $(this).val(),
          line = $(this).closest('.label');
        for (var i = 0; i < field.length; i++) {
          if (!value) {
            line.addClass('error');
            line.find('.label-text').text(line.find('.label-text').data('error')).addClass('error')
            error = 1;
            setTimeout(function () {
              line.removeClass('error')
            line.find('.label-text').text(line.find('.label-text').data('placeholder')).removeClass('error')
            }.bind(this), 2000);
            event.preventDefault();
            
            form.find('.form-error').show();
          }
        }
      });

      if (error !== 1) {
        $(this).unbind(e);
        form.find('.form-error').hide();
        //        $('.create-steps').slick('slickNext');

      }

    }
    
    
    
    
    
  })




  $('.create-steps').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    slideCount = $('.create-steps .item').length;

    console.log('urlFirst', urlFirst)
    console.log('nextSlide', nextSlide)

    window.location.replace(urlFirst + '#' + nextSlide);

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

  var countClickTextarea = 0;

  $('textarea.input-text').click(function () {
    if (countClickTextarea == 0) {
      $(this).text('');
      //      countClickTextarea++;
    }
  })

  $("input[type='number']").keyup(function () {
    $(this).val(this.value.match(/[0-9]*/));
  });



  var cStars = function (nowPos) {
    // У всех убираем active
    $('.testimonials-rating.large .star').removeClass('active');

    for (var i = 0; nowPos + 1 > i; i++) {
      $('.testimonials-rating.large .star').eq(i).toggleClass('active');
    }
  }
  // переменная содержит количество активных звезд
  var starsCount = $('.testimonials-rating.large .star.active').length;

  // При наведении
  $('.testimonials-rating.large .star').hover(function () {
    cStars($(this).index());
  });



  $('.create-steps .item:not(".star4")').each(function () {
    $(this).parents('.slick-slide').addClass('star3')
  })

  $('.create-steps .item:not(".star3thx")').each(function () {
    $(this).parents('.slick-slide').addClass('star3notthx')
  })

  $('.star3thx').parents('.slick-slide').addClass('star3thx')

  var filtered = false;
  // При клике
  $('.testimonials-rating.large .star').click(function () {
    cStars($(this).index());
    // меняем количество по клику
    starsCount = $('.testimonials-rating.large .star.active').length;


    if (starsCount < 4 && filtered === false) {
      $('.create-steps').slick('slickUnfilter');
      $('.create-steps').slick('slickFilter', '.star3');
      console.log('Filter Slides');
      filtered = true;
    } else {
      $('.create-steps').slick('slickUnfilter');

      $('.create-steps').slick('slickFilter', '.star3notthx');
      console.log('Unfilter Slides');
      filtered = false;
    }





    /*      $('.star3').remove();
          $('.star4').remove();

        if (starsCount > 3) {
          $('.create-steps').slick('slickAdd', '<div class="item star4">' + Star4_1 + '</div>');
          $('.create-steps').slick('slickAdd', '<div class="item star4">' + Star4_2 + '</div>');

        } else {
          $('.create-steps').slick('slickAdd', '<div class="item star4">' + Star3 + '</div>');

        }*/






  });


  // Как только отводим мышку, возвращаем количество активных айтемов, которые были изначально
  $('.testimonials-rating.large .star').on('mouseleave', function () {
    cStars(+starsCount - 1);
  });
  console.log('starsCount', starsCount)




  /*valid*/
  /*
  function validInput(el, type) {
    const btn = $(el).parents('.form').find('.submit')
    const parent = $(el).parent()
    if (type === 'email') {
      if (!checkIfEmailInString($(el).val()) && $(el).val()) {
        toggleValidInput('show', parent, btn)
      } else {
        toggleValidInput('hide', parent, btn)
      }
    } else if (type === 'password') {
      if ($(el).val().length < 8 && $(el).val()) {
        toggleValidInput('show', parent, btn)
      } else {
        toggleValidInput('hide', parent, btn)
      }
    }
  }

  function toggleValidInput(type, parent, btn) {
    if (type === 'show') {
      parent.addClass('error')
      parent.find('.inp-form__label').hide()
      parent.find('.label-err').show()
      $(btn).attr('disabled', true)
    } else {
      parent.removeClass('inp-form__wrapper_error')
      parent.find('.inp-form__label').show()
      parent.find('.label-err').hide()
      if (parent.parent().parent().find('.valid-label.inp-form__wrapper_error').length === 0) $(btn).attr('disabled', false)
    }
  }

  function checkIfEmailInString(text) {
    let re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }



  $('.inp-form_website').on('input', function (e) {
    validInput(this, 'website')
  })

  $('.inp-form_email').on('input', function (e) {
    validInput(this, 'email')
  })

  $('.inp-form_password').on('input', function (e) {
    validInput(this, 'password')
  })

  $('#email_submit').click(function (e) {
    e.preventDefault();
    const email = $('#signup_email').val();

    if (!email || !checkIfEmailInString(email)) {
      $('#signup_email').addClass('input_err');
    } else {
      $('#signup_email').removeClass('input_err').val('');

      doPreSignup(email);
    }
  });

  $('.inp-form__label_select').each(function (i, el) {
    $(el).parent().find('.jq-selectbox').append($(el))
  })
  $('.inp-form__label_select').click(function (e) {
    $(this).parent().find('.jq-selectbox__select').trigger('click')
  })

  $('.inp-form').on('input', function (e) {
    if (!$(this).parent().hasClass('valid-label')) {
      $(this).parent().removeClass('inp-form__wrapper_error')
    }
  })
*/



});
