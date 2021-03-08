$(document).ready(function () {
  $('.faq-item').click(function () {
    console.log($(this))
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
    //    $styledSelect.text($this.children('option').eq(0).text());

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
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active').addClass('select-item');
      $this.val($(this).attr('rel'));
      $list.hide();
      //console.log($this.val());
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
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
    console.log($(this).val().length);
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
    
    console.log(testimonialsLength);

    if (testimonialsLength > 176) {
      $(this).css({
        'height': '250px',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
      })
      $(this).append('<a href="#more" class="testimonials-more">Show more</a>')
    }
  })
  
  $('.testimonials-more').click(function(){
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
  
  
  $('#fonts').change(function(){
    console.log($(this).val())
    
  })
  $('.select-options li').click(function(){
    $('body').removeClass()
    $('body').addClass($('#fonts').val());
    $('body').addClass($('#theme').val());
  })
  
});