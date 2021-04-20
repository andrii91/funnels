$(document).ready(function(){function e(e){var t=/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;return console.log(t.test(e)),t.test(e)}window.onkeydown=function(e){if(9==e.keyCode)return!1},window.onkeypress=function(e){if(9==e.keyCode)return!1},$(".faq-item").click(function(){$(this).toggleClass("active"),$(this).find(".more").slideToggle()});var t=0;$("input").hasClass("required-input")&&($(".required-input").mask("9"),$(".number-inputs").each(function(){$($(this).find(".required-input")).attr("disabled","disabled"),$($(this).find(".required-input")).attr("maxlength","1"),$(this).find(".required-input").hasClass("blocked")||$($(this).find(".required-input").first()).removeAttr("disabled")}),$(".required-input").on("keyup",function(e){var r=$(this).parent().find(".required-input").length;8==e.keyCode&&($(this).prev("input").focus(),t=r-1),$(this).val().match(/^\d{1}$/)&&$(this).val().length>=1&&($(this).next("input").removeAttr("disabled").focus(),t++),console.log("countThisInput",t)})),$("select").each(function(){var e=$(this),t=$(this).children("option").length;e.addClass("select-hidden"),e.wrap('<div class="select"></div>'),e.after('<div class="select-styled"></div>');var r=e.next("div.select-styled");e.children("option[selected]")&&(r.text(e.children("option[selected]").text()),""!=r.text()&&r.addClass("select-item"));for(var a=$("<ul />",{"class":"select-options"}).insertAfter(r),s=0;s<t;s++)$("<li />",{text:e.children("option").eq(s).text(),rel:e.children("option").eq(s).val()}).appendTo(a);var i=a.children("li");r.click(function(e){e.stopPropagation(),$("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").slideUp()}),$(this).toggleClass("active").next("ul.select-options").slideToggle()}),i.click(function(t){t.stopPropagation(),r.text($(this).text()).removeClass("active").addClass("select-item"),e.val($(this).attr("rel")),a.slideUp()}),$(document).click(function(){r.removeClass("active"),a.slideUp()})}),$(".input-text").each(function(){var e,t,r=$(this).attr("name");switch(r){case"name":e="Enter correct name",t="ERROR: Please enter correct name";break;case"lastname":e="Enter correct lastname",t="ERROR: Please enter correct lastname";break;case"email":e="Enter correct email",t="ERROR: Please enter correct email";break;case"phone":e="Enter correct phone",t="ERROR: Please enter correct phone";break;default:e="Enter valid value",t="ERROR: Enter valid value"}$(this).parent().prepend('<div data-errornotice="'+t+'" data-error="'+e+'" data-placeholder="'+$(this).attr("placeholder")+'" class="label-text">'+$(this).attr("placeholder")+"</div>"),$(this).removeAttr("placeholder"),0===$(this).val().length&&0===$(this).text().length||$(this).parents(".label").addClass("active")}),$(".form").each(function(){$(this).prepend('<div class="form-error">Error: Something went wrong. Please enter correct data!</div>')}),$(".input-text").focusin(function(){$(this).parents(".label").addClass("active")}),$(".input-text").focusout(function(){0==$(this).val().length&&$(this).parents(".label").removeClass("active")}),$(".input-text").on("keyup",function(e){0==$(this).val().length?$(this).parents(".label").removeClass("active"):$(this).parents(".label").addClass("active")}),$(".copy-btn").click(function(e){e.preventDefault(),$(this).parents(".keywords").find("input").addClass("active");var t=$("<textarea>");$("body").append(t),t.val($(this).parents(".keywords").find("input").val()).select(),document.execCommand("copy"),t.remove(),setTimeout(function(){$(".keywords input").removeClass("active")},1e3)}),$(".copy-textarea").click(function(e){e.preventDefault();var t=$("<textarea>");$("body").append(t),t.val($(this).parent().find("textarea").text()).select(),document.execCommand("copy"),t.remove()});var r=0,a=0;$(".testimonials-item .small").each(function(){a=$(this).text(),r=a.length,r>169&&($(this).text(a.substring(0,169)),$(this).append('<span class="more-hidden">'+a.substring(170,r)+"</span>"),$(this).append('<a href="#more" class="testimonials-more">Show more</a>'))}),$(".testimonials-more").click(function(){$(this).hide(0),$(this).parent().find(".more-hidden").show()}),$('input[name="phone"]').intlTelInput({defaultCountry:"us",initialCountry:"auto",autoPlaceholder:"aggressive",nationalMode:!0,customPlaceholder:function(e,t){return"+"+t.dialCode},geoIpLookup:function(e,t){$.get("https://ipinfo.io",function(){},"jsonp").always(function(t){var r=t&&t.country?t.country:"us";e(r)})},separateDialCode:!0,formatOnDisplay:!0}),$(".check").each(function(){$(this).on("change",function(){var e=$(this).parents("form");$(this).prop("checked")?e.find(".phone").slideDown():e.find(".phone").slideUp()})});var s=window.location.href.split("#")[0];$(".create-steps").slick({dots:!1,infinite:!1,draggable:!1,swipe:!1,arrows:!1,speed:750,slidesToShow:1,centerMode:!0,adaptiveHeight:!0});var i=$(".create-steps .item").length;if($(".progress .title span").text("0%"),$(".progress .line span").css({width:"0%"}),window.location.hash){var n=window.location.hash;$('[data-slick-index="'+n.split("#")[1]+'"]').length>0&&($(".create-steps").slick("slickGoTo",n.split("#")[1],!1),$(".progress .title span").text((100/i*Number(n.split("#")[1])).toFixed()+"%"),$(".progress .line span").css({width:100/i*Number(n.split("#")[1])+"%"}))}$(".prev-step").click(function(e){e.preventDefault(),$(".create-steps").slick("slickPrev")}),$(".submit").click(function(e){if(e.preventDefault(),$(this).parents(".veryfy-wrap")){var t=$(this).parents(".veryfy-wrap"),r=0,a=[];t.find("input[data-validate]").each(function(){a.push("input[data-validate]");for(var e=$(this).val(),t=$(this).closest(".veryfy-wrap"),s=0;s<a.length;s++)e||(t.addClass("error"),t.find(".title").text("Enter correct PIN:"),r=1,setTimeout(function(){t.removeClass("error"),t.find(".title").text("Enter PIN:")}.bind(this),2e3))}),1!==r&&$(this).unbind(e)}}),$(".create-steps").on("beforeChange",function(e,t,r,a){i=$(".create-steps .item").length,console.log("urlFirst",s),console.log("nextSlide",a),window.location.replace(s+"#"+a),$(".progress .title span").text((100/i*a).toFixed()+"%"),$(".progress .line span").css({width:100/i*a+"%"}),$(".input-text").each(function(){0!==$(this).val().length&&$(this).parents(".label").addClass("active")})});var l=0;$("textarea.input-text").click(function(){0==l&&$(this).text("")}),$("input[type='number']").keyup(function(){$(this).val(this.value.match(/[0-9]*/))});var o=function(e){$(".testimonials-rating.large .star").removeClass("active");for(var t=0;e+1>t;t++)$(".testimonials-rating.large .star").eq(t).toggleClass("active")},d=$(".testimonials-rating.large .star.active").length;$(".testimonials-rating.large .star").hover(function(){o($(this).index())}),$('.create-steps .item:not(".star4")').each(function(){$(this).parents(".slick-slide").addClass("star3")}),$('.create-steps .item:not(".star3thx")').each(function(){$(this).parents(".slick-slide").addClass("star3notthx")}),$(".star3thx").parents(".slick-slide").addClass("star3thx");var c=!1;$(".testimonials-rating.large .star").click(function(){o($(this).index()),d=$(".testimonials-rating.large .star.active").length,d<4&&c===!1?($(".create-steps").slick("slickUnfilter"),$(".create-steps").slick("slickFilter",".star3"),console.log("Filter Slides"),c=!0):($(".create-steps").slick("slickUnfilter"),$(".create-steps").slick("slickFilter",".star3notthx"),console.log("Unfilter Slides"),c=!1)}),$(".testimonials-rating.large .star").on("mouseleave",function(){o(+d-1)}),console.log("starsCount",d),$(".input-text").on("keyup",function(t){const r=$(this).val(),a=$(this).attr("name"),s=$(this).parents(".label");"name"==a||"lastname"==a?!r||r&&!/^[а-яa-z]+$/i.test(r)?(s.addClass("error"),s.find(".label-text").text(s.find(".label-text").data("error")).addClass("error"),$(this).parents(".form").find(".form-error").text(s.find(".label-text").data("errornotice")).show()):(s.removeClass("error"),s.find(".label-text").text(s.find(".label-text").data("placeholder")).removeClass("error"),$(this).parents(".form").find(".form-error").hide()):"email"==a?!r||r&&!e(r)?(console.log(a),s.addClass("error"),s.find(".label-text").text(s.find(".label-text").data("error")).addClass("error"),$(this).parents(".form").find(".form-error").text(s.find(".label-text").data("errornotice")).show()):(s.removeClass("error"),s.find(".label-text").text(s.find(".label-text").data("placeholder")).removeClass("error"),$(this).parents(".form").find(".form-error").hide()):"phone"==a&&(!r||r&&!/^\d+$/.test(r)?(s.addClass("error"),s.find(".label-text").text(s.find(".label-text").data("error")).addClass("error"),$(this).parents(".form").find(".form-error").text(s.find(".label-text").data("errornotice")).show()):(s.removeClass("error"),s.find(".label-text").text(s.find(".label-text").data("placeholder")).removeClass("error"),$(this).parents(".form").find(".form-error").hide()))});var h=0;$(".submit_form").click(function(t){if(t.preventDefault(),$(this).parents(".form")){var r,a=$(this).parents(".form"),s=[];if(a.find("input[data-validate]").each(function(){s.push("input[data-validate]");var t=$(this).val(),i=$(this).closest(".label");if(r=$(this).attr("name"),"email"==r){console.log(2);for(var n=0;n<s.length;n++){if(!t||t&&!e(t))return console.log(r),i.addClass("error"),i.find(".label-text").text(i.find(".label-text").data("error")).addClass("error"),a.find(".form-error").text(i.find(".label-text").data("errornotice")).show(),h=1,!1;i.removeClass("error"),i.find(".label-text").text(i.find(".label-text").data("placeholder")).removeClass("error"),h=0}}else if("name"==r||"lastname"==r){if(!t||t&&!/^[а-яa-z]+$/i.test(t))return i.addClass("error"),i.find(".label-text").text(i.find(".label-text").data("error")).addClass("error"),a.find(".form-error").text(i.find(".label-text").data("errornotice")).show(),h=1,!1;i.removeClass("error"),i.find(".label-text").text(i.find(".label-text").data("placeholder")).removeClass("error"),h=0}else if("phone"==r){if(!t||t&&!/^\d+$/.test(t))return console.log("valueph",t),i.addClass("error"),i.find(".label-text").text(i.find(".label-text").data("error")).addClass("error"),$(this).parents(".form").find(".form-error").text(i.find(".label-text").data("errornotice")).show(),h=1,!1;i.removeClass("error"),i.find(".label-text").text(i.find(".label-text").data("placeholder")).removeClass("error"),$(this).parents(".form").find(".form-error").hide(),h=0}else for(var n=0;n<s.length;n++){if(!t)return console.log(r),i.addClass("error"),i.find(".label-text").text(i.find(".label-text").data("error")).addClass("error"),a.find(".form-error").text(i.find(".label-text").data("errornotice")).show(),h=1,!1;i.removeClass("error"),i.find(".label-text").text(i.find(".label-text").data("placeholder")).removeClass("error"),h=0}}),console.log("errorForm",h),1!==h&&($(this).unbind(t),a.find(".form-error").hide(),$(this).hasClass("next-step"))){$(".create-steps").slick("slickNext");var i="#funnels-lib",n=$(i).offset().top;$("body,html").animate({scrollTop:n-80},100)}}}),$(".veryfy-input").mask("9-9-9-9"),$(".veryfy_single .submit").attr("disabled","disabled"),$(".veryfy-input").keyup(function(){$(this).val().length>6?$(this).parent().find(".submit").removeAttr("disabled"):$(this).parent().find(".submit").attr("disabled","disabled")})});