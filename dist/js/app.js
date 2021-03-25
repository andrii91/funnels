$(document).ready(function(){window.onkeydown=function(t){if(9==t.keyCode)return!1},window.onkeypress=function(t){if(9==t.keyCode)return!1},$(".faq-item").click(function(){$(this).toggleClass("active"),$(this).find(".more").slideToggle()});var t=0;$("input").hasClass("required-input")&&($(".required-input").mask("9"),$(".number-inputs").each(function(){$($(this).find(".required-input")).attr("disabled","disabled"),$($(this).find(".required-input")).attr("maxlength","1"),$(this).find(".required-input").hasClass("blocked")||$($(this).find(".required-input").first()).removeAttr("disabled")}),$(".required-input").on("keyup",function(e){var i=$(this).parent().find(".required-input").length;8==e.keyCode&&($(this).prev("input").focus(),t=i-1),$(this).val().match(/^\d{1}$/)&&$(this).val().length>=1&&($(this).next("input").removeAttr("disabled").focus(),t++),console.log("countThisInput",t)})),$("select").each(function(){var t=$(this),e=$(this).children("option").length;t.addClass("select-hidden"),t.wrap('<div class="select"></div>'),t.after('<div class="select-styled"></div>');var i=t.next("div.select-styled");t.children("option[selected]")&&(i.text(t.children("option[selected]").text()),""!=i.text()&&i.addClass("select-item"));for(var s=$("<ul />",{"class":"select-options"}).insertAfter(i),n=0;n<e;n++)$("<li />",{text:t.children("option").eq(n).text(),rel:t.children("option").eq(n).val()}).appendTo(s);var a=s.children("li");i.click(function(t){t.stopPropagation(),$("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").slideUp()}),$(this).toggleClass("active").next("ul.select-options").slideToggle()}),a.click(function(e){e.stopPropagation(),i.text($(this).text()).removeClass("active").addClass("select-item"),t.val($(this).attr("rel")),s.slideUp()}),$(document).click(function(){i.removeClass("active"),s.slideUp()})}),$(".input-text").each(function(){$(this).parent().prepend('<div class="label-text">'+$(this).attr("placeholder")+"</div>"),$(this).removeAttr("placeholder"),0===$(this).val().length&&0===$(this).text().length||$(this).parents(".label").addClass("active")}),$(".input-text").focusin(function(){$(this).parents(".label").addClass("active")}),$(".input-text").focusout(function(){0==$(this).val().length&&$(this).parents(".label").removeClass("active")}),$(".input-text").on("keyup",function(t){0==$(this).val().length?$(this).parents(".label").removeClass("active"):$(this).parents(".label").addClass("active")}),$(".copy-btn").click(function(t){t.preventDefault(),$(this).parents(".keywords").find("input").addClass("active");var e=$("<textarea>");$("body").append(e),e.val($(this).parents(".keywords").find("input").val()).select(),document.execCommand("copy"),e.remove(),setTimeout(function(){$(".keywords input").removeClass("active")},1e3)}),$(".copy-textarea").click(function(t){t.preventDefault();var e=$("<textarea>");$("body").append(e),e.val($(this).parent().find("textarea").text()).select(),document.execCommand("copy"),e.remove()});var e=0,i=0;$(".testimonials-item .small").each(function(){i=$(this).text(),e=i.length,e>169&&($(this).text(i.substring(0,169)),$(this).append('<span class="more-hidden">'+i.substring(170,e)+"</span>"),$(this).append('<a href="#more" class="testimonials-more">Show more</a>'))}),$(".testimonials-more").click(function(){$(this).hide(0),$(this).parent().find(".more-hidden").show()}),$('input[name="phone"]').intlTelInput({defaultCountry:"us",initialCountry:"auto",autoPlaceholder:"aggressive",nationalMode:!0,customPlaceholder:function(t,e){return"+"+e.dialCode},geoIpLookup:function(t,e){$.get("https://ipinfo.io",function(){},"jsonp").always(function(e){var i=e&&e.country?e.country:"us";t(i)})},separateDialCode:!0,formatOnDisplay:!0}),$(".check").each(function(){$(this).on("change",function(){var t=$(this).parents("form");$(this).prop("checked")?t.find(".phone").slideDown():t.find(".phone").slideUp()})}),$(".create-steps").slick({dots:!1,infinite:!1,draggable:!1,swipe:!1,arrows:!1,speed:750,slidesToShow:1,centerMode:!0,adaptiveHeight:!0});var s=$(".create-steps .item").length;$(".progress .title span").text("0%"),$(".progress .line span").css({width:"0%"}),$(".prev-step").click(function(t){t.preventDefault(),$(".create-steps").slick("slickPrev")}),$(".next-step").click(function(t){if(t.preventDefault(),$(this).parents(".form")){var e=$(this).parents(".form"),i=0,s=[];if(e.find("[data-validate]").each(function(){s.push("[data-validate]");for(var t=$(this).val(),e=$(this).closest(".label"),n=0;n<s.length;n++)t||(e.addClass("error"),i=1,setTimeout(function(){e.removeClass("error")}.bind(this),2e3),event.preventDefault())}),1!==i){$(".create-steps").slick("slickNext");var n="#funnels-lib",a=$(n).offset().top;$("body,html").animate({scrollTop:a-80},100)}}}),$(".submit").click(function(t){if(t.preventDefault(),$(this).parents(".veryfy-wrap")){var e=$(this).parents(".veryfy-wrap"),i=0,s=[];e.find("input[data-validate]").each(function(){s.push("input[data-validate]");for(var t=$(this).val(),e=$(this).closest(".veryfy-wrap"),n=0;n<s.length;n++)t||(e.addClass("error"),e.find(".title").text("Enter correct PIN:"),i=1,setTimeout(function(){e.removeClass("error"),e.find(".title").text("Enter PIN:")}.bind(this),2e3),event.preventDefault())}),1!==i&&$(this).unbind(t)}}),$(".create-steps").on("beforeChange",function(t,e,i,n){s=$(".create-steps .item").length,$(".progress .title span").text((100/s*n).toFixed()+"%"),$(".progress .line span").css({width:100/s*n+"%"}),$(".input-text").each(function(){0!==$(this).val().length&&$(this).parents(".label").addClass("active")})});var n=0;$("textarea.input-text").click(function(){0==n&&$(this).text("")}),$("input[type='number']").keyup(function(){$(this).val(this.value.match(/[0-9]*/))});var a=function(t){$(".testimonials-rating.large .star").removeClass("active");for(var e=0;t+1>e;e++)$(".testimonials-rating.large .star").eq(e).toggleClass("active")},l=$(".testimonials-rating.large .star.active").length;$(".testimonials-rating.large .star").hover(function(){a($(this).index())}),$('.create-steps .item:not(".star4")').each(function(){$(this).parents(".slick-slide").addClass("star3")}),$('.create-steps .item:not(".star3thx")').each(function(){$(this).parents(".slick-slide").addClass("star3notthx")}),$(".star3thx").parents(".slick-slide").addClass("star3thx");var r=!1;$(".testimonials-rating.large .star").click(function(){a($(this).index()),l=$(".testimonials-rating.large .star.active").length,l<4&&r===!1?($(".create-steps").slick("slickUnfilter"),$(".create-steps").slick("slickFilter",".star3"),console.log("Filter Slides"),r=!0):($(".create-steps").slick("slickUnfilter"),$(".create-steps").slick("slickFilter",".star3notthx"),console.log("Unfilter Slides"),r=!1)}),$(".testimonials-rating.large .star").on("mouseleave",function(){a(+l-1)}),console.log("starsCount",l)});