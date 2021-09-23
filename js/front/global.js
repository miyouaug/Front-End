// etc
$(function() {
  // radio, checkbox style
  $(".iCheck").iCheck({
    checkboxClass: 'icheckbox_flat-custom',
    radioClass: 'iradio_flat-custom'
	});
	// tab menu
	$('ul.tabs li').click(function() {
		var activeTab = $(this).attr('data-tab');
		$('ul.tabs li').removeClass('active');
		$('.tab_content').removeClass('active');
		$(this).addClass('active');
		$('#' + activeTab).addClass('active');
	});
	// mobile category button
	$('.dropdown_toggle').click(function(e){
    e.preventDefault();
    $('.dropdown_toggle, .dropdown_menu').toggleClass('active');
	});
	// 상세페이지 이미지 select
	$(".pdtImgThumbs a").click(function(e) {
		e.preventDefault();
		$(".pdtImg").empty().append(
				$("<img>", { src: this.href})
		);
		$('.pdtImgThumbs a').removeClass('active');
		$(this).addClass('active');
	});	
	//imgLiquid
	$(".imgLiquidFill").imgLiquid({
		fill: true,
		horizontalAlign: "center",
		verticalAlign: "top"
	});
	$(".imgLiquidNoFill").imgLiquid({
		fill: false,
		horizontalAlign: "center",
		verticalAlign: "50%"
	});
  // 탭다운 게시판
  $('dl.tabDownBody dt').each(function() {
	  $(this).on("click", function() {
		  $('.tabDownBody dd').slideUp(200);
		  if($(this).next().css("display") != "block") {
			  $(this).next().slideDown(200);
		  }
	  });
	});	
	$(".cart_list_wrap a.btn_toggle").click(function () {
		$(this).closest(".cart_list_wrap").children(".list_mid").slideToggle("100");
		$(this).find(".xi").toggleClass("xi-angle-up xi-angle-down");
	});
	$(".cd-vertical-nav h4").click(function () {
		$(this).parent(".cell").children("ul").slideToggle("100");
		$(this).find(".xi").toggleClass("xi-angle-up xi-angle-down");
	});
});


$(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww > 1024) {
      $('.total_wrap_inner').removeClass('stickyBox');
    } else if (ww <= 1025) {
      $('.total_wrap_inner').addClass('stickyBox');
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
});

// search
jQuery(function($){

	//open search form
	$('.cd-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
	});

	function closeNav() {
		$('.cd-nav-trigger').removeClass('nav-is-visible');
		$('.cd-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close serach 
			$('.cd-search').removeClass('is-visible');
			$('.cd-search-trigger').removeClass('search-is-visible');
			$('.cd-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.cd-search').toggleClass('is-visible');
			$('.cd-search-trigger').toggleClass('search-is-visible');
			$('.cd-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
			($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
		}
	}
});

// all menu
jQuery(function($){
	//open/close mega-navigation
	$('.cd-dropdown-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	//close meganavigation
	$('.cd-dropdown .cd-close').on('click', function(event){
		event.preventDefault();
		toggleNav();
	});

	//on mobile - open submenu
	$('.has-children').children('a').on('click', function(event){
		//prevent default clicking on direct children of .has-children 
		event.preventDefault();
		var selected = $(this);
		selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
	});

	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
	$('.cd-dropdown-content').menuAim({
        activate: function(row) {
        	$(row).children().addClass('is-active').removeClass('fade-out');
        	if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
        	$(row).children().removeClass('is-active');
        	if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
        		$(row).children('ul').addClass('fade-out')
        	}
        },
        exitMenu: function() {
        	$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
        	return true;
        },
        submenuDirection: submenuDirection,
    });

	//submenu items - go back link
	$('.go-back').on('click', function(){
		var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
	}); 

	function toggleNav(){
		var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
		if( !navIsVisible ) {
			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.has-children ul').addClass('is-hidden');
				$('.move-out').removeClass('move-out');
				$('.is-active').removeClass('is-active');
			});	
		}
	}

	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}
});

// App footer nav
jQuery(function($){
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
	var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			document.getElementById("navbar").style.bottom = "0";
		} else {
			document.getElementById("navbar").style.bottom = "-61px";
		}
		prevScrollpos = currentScrollPos;
	}
});

// scroll top
jQuery(function(){
  $('#movetop').bind('click', function() {
    $('html, body').animate({scrollTop: '0'}, 300);
	});

});

// swiper slide
jQuery(function(){
	var swiper = new Swiper('.main_visual', {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.main-visual-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});	
	
	var swiper = new Swiper('.itemList', {
		slidesPerView: 5,
		loop: true,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
		pagination: {
			el: '.swiper-pagination2',
			clickable: true,
		},
		breakpoints: {
			1280: {
				slidesPerView: 5,
				spaceBetween: 40,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			640: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			280: {
				slidesPerView: 2,
				spaceBetween: 20,
			}
		},
		navigation: {
			nextEl: '.circle-button-next',
			prevEl: '.circle-button-prev',
		},
	});

	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 6,
		loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		loop:true,
		loopedSlides: 5, //looped slides should be the same
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});

	var swiper = new Swiper('.brandItem', {
		slidesPerView: 3,
		spaceBetween: 20,
		freeMode: true,
		pagination: {
			el: '.brand-pagination',
			type: 'progressbar',
		},
		breakpoints: {
			620: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
			1024: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
			1400: {
				slidesPerView: 6,
				spaceBetween: 30,
			},
		},
		navigation: {
			nextEl: '.brand-button-next',
			prevEl: '.brand-button-prev',
		},
		
	});	

});

// header
jQuery(function($){
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
		if (previousTop - currentTop > scrollDelta) {
			//if scrolling up...
			mainHeader.removeClass('is-hidden');
		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			//if scrolling down...
			mainHeader.addClass('is-hidden');
		}
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
			//if scrolling up... 
			if( currentTop < secondaryNavOffsetTop ) {
				//secondary nav is not fixed
				mainHeader.removeClass('is-hidden');
				secondaryNavigation.removeClass('fixed slide-up');
				belowNavHeroContent.removeClass('secondary-nav-fixed');
			} else if( previousTop - currentTop > scrollDelta ) {
				//secondary nav is fixed
				mainHeader.removeClass('is-hidden');
				secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
				belowNavHeroContent.addClass('secondary-nav-fixed');
			}
			
		} else {
			//if scrolling down...	
			if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
				//hide primary nav
				mainHeader.addClass('is-hidden');
				secondaryNavigation.addClass('fixed slide-up');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			} else if( currentTop > secondaryNavOffsetTop ) {
				//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
				mainHeader.removeClass('is-hidden');
				secondaryNavigation.addClass('fixed').removeClass('slide-up');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			}
		}
	}
});

// password ui
jQuery(function() {

  function passwordCheck(password) {
    if (password.length >= 8)
      strength += 1;

    if (password.match(/(?=.*[0-9])/))
      strength += 1;

    if (password.match(/(?=.*[!,%,&,@,#,$,^,*,?,_,~,<,>,])/))
      strength += 1;

    if (password.match(/(?=.*[a-z])/))
      strength += 1;

    if (password.match(/(?=.*[A-Z])/))
      strength += 1;

    displayBar(strength);
  }

  function displayBar(strength) {
    switch (strength) {
      case 1:
        $("#password-strength span").css({
          "width": "20%",
          "background": "#de1616"
        });
        break;

      case 2:
        $("#password-strength span").css({
          "width": "40%",
          "background": "#de1616"
        });
        break;

      case 3:
        $("#password-strength span").css({
          "width": "60%",
          "background": "#de1616"
        });
        break;

      case 4:
        $("#password-strength span").css({
          "width": "80%",
          "background": "#FFA200"
        });
        break;

      case 5:
        $("#password-strength span").css({
          "width": "100%",
          "background": "#06bf06"
        });
        break;

      default:
        $("#password-strength span").css({
          "width": "0",
          "background": "#de1616"
        });
    }
  }

  $("[data-strength]").after("<div id=\"password-strength\" class=\"strength\"><span></span></div>")

  $("[data-strength]").focus(function() {
    $("#password-strength").css({
      "height": "4px"
    });
  }).blur(function() {
    $("#password-strength").css({
      "height": "0px"
    });
  });

  $("[data-strength]").keyup(function() {
    strength = 0;
    var password = $(this).val();
    passwordCheck(password);
  });

});


// coin market
(function(){
var panelTriggers = document.getElementsByClassName('js-cd-panel-trigger');
if( panelTriggers.length > 0 ) {
	for(var i = 0; i < panelTriggers.length; i++) {
		(function(i){
			var panelClass = 'js-cd-panel-'+panelTriggers[i].getAttribute('data-panel'),
				panel = document.getElementsByClassName(panelClass)[0];
			// open panel when clicking on trigger btn
			panelTriggers[i].addEventListener('click', function(event){
				event.preventDefault();
				addClass(panel, 'cd-panel--is-visible');
			});
			//close panel when clicking on 'x' or outside the panel
			panel.addEventListener('click', function(event){
				if( hasClass(event.target, 'js-cd-close') || hasClass(event.target, panelClass)) {
					event.preventDefault();
					removeClass(panel, 'cd-panel--is-visible');
				}
			});
		})(i);
	}
}
function hasClass(el, className) {
		if (el.classList) return el.classList.contains(className);
		else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
	 if (el.classList) el.classList.add(className);
	 else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
		if (el.classList) el.classList.remove(className);
		else if (hasClass(el, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			el.className=el.className.replace(reg, ' ');
		}
}
})();


// mypage aside
jQuery(function($){
	var verticalNavigation = $('.cd-vertical-nav'),
		navTrigger = $('.cd-nav-trigger'),
		scrollArrow = $('.cd-scroll-down');

	//smooth scroll to the selected section
		verticalNavigation.on('click', 'a', function(event){
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    scrollArrow.on('click', function(event){
    	event.preventDefault();
        smoothScroll($(this.hash));
    });

	// open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNavigation.toggleClass('open');
    });
});


// $(window).resize(function() {
// 	if($(window).width() >768) {
		 
		
// 	}
// });

// jQuery(function (e) {
// 	function t(t) {
// 			e(t).bind("click", function (t) {
// 					t.preventDefault();
// 					e(this).parent().fadeOut()
// 			})
// 	}
// 	e(".button_toggle").click(function () {
// 			var t = e(this).parents(".button_dropdown").children(".dropdown_menu_wrap").is(":hidden");
// 			e(".button_dropdown .dropdown_menu_wrap").hide();
// 			e(".button_dropdown .button_toggle").removeClass("active");
// 			if (t) {
// 					e(this).parents(".button_dropdown").children(".dropdown_menu_wrap").toggle().parents(".button_dropdown").children(".button_toggle").addClass("active")
// 			}
// 	});
// 	e(document).bind("click", function (t) {
// 			var n = e(t.target);
// 			if (!n.parents().hasClass("button_dropdown")) e(".button_dropdown .dropdown_menu_wrap").hide();
// 	});
// 	e(document).bind("click", function (t) {
// 			var n = e(t.target);
// 			if (!n.parents().hasClass("button_dropdown")) e(".button_dropdown .button_toggle").removeClass("active");
// 	})
// });
