
let date = new Date()
document.getElementById('date').innerHTML = date.getFullYear()
$(window).on('load', () => {
  if ($('#preloader').length) {
    $('#preloader')
      .delay(500)
      .fadeOut('slow', () => {
        $(this).remove()
      })
  }
})
let scrolltoOffset = $('#header').outerHeight() - 16
if (window.matchMedia('(max-width: 991px)').matches) {
  scrolltoOffset += 16
}
$(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', (e) => {
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
    location.hostname == this.hostname
  ) {
    e.preventDefault()
    let target = $(this.hash)
    if (target.length) {
      let scrollto = target.offset().top - scrolltoOffset

      if ($(this).attr('href') == '#header') {
        scrollto = 0
      }

      $('html, body').animate(
        {
          scrollTop: scrollto,
        },
        1500,
        'easeInOutExpo'
      )

      if ($(this).parents('.nav-menu, .mobile-nav').length) {
        $('.nav-menu .active, .mobile-nav .active').removeClass('active')
        $(this).closest('li').addClass('active')
      }

      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active')
        $('.mobile-nav-toggle i').toggleClass(
          'icofont-navigation-menu icofont-close'
        )
        $('.mobile-nav-overly').fadeOut()
      }
      return false
    }
  }
})
$(() => {
  if (window.location.hash) {
    let initial_nav = window.location.hash
    if ($(initial_nav).length) {
      let scrollto = $(initial_nav).offset().top - scrolltoOffset
      $('html, body').animate(
        {
          scrollTop: scrollto,
        },
        1500,
        'easeInOutExpo'
      )
    }
  }
})
// Mobile Navigation
if ($('.nav-menu').length) {
  let $mobile_nav = $('.nav-menu').clone().prop({
    class: 'mobile-nav d-lg-none',
  })
  $('body').append($mobile_nav)
  $('body').prepend(
    '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
  )
  $('body').append('<div class="mobile-nav-overly"></div>')

  $(document).on('click', '.mobile-nav-toggle', (e) => {
    $('body').toggleClass('mobile-nav-active')
    $('.mobile-nav-toggle i').toggleClass(
      'icofont-navigation-menu icofont-close'
    )
    $('.mobile-nav-overly').toggle()
  })

  $(document).on('click', '.mobile-nav .drop-down > a', (e) => {
    e.preventDefault()
    $(this).next().slideToggle(300)
    $(this).parent().toggleClass('active')
  })

  $(document).click((e) => {
    let container = $('.mobile-nav, .mobile-nav-toggle')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active')
        $('.mobile-nav-toggle i').toggleClass(
          'icofont-navigation-menu icofont-close'
        )
        $('.mobile-nav-overly').fadeOut()
      }
    }
  })
} else if ($('.mobile-nav, .mobile-nav-toggle').length) {
  $('.mobile-nav, .mobile-nav-toggle').hide()
}

// Navigation active state on scroll
let nav_sections = $('section')
let main_nav = $('.nav-menu, #mobile-nav')

$(window).on('scroll', () => {
  let cur_pos = $(this).scrollTop() + 200

  nav_sections.each(() => {
    let top = $(this).offset().top,
      bottom = top + $(this).outerHeight()

    if (cur_pos >= top && cur_pos <= bottom) {
      if (cur_pos <= bottom) {
        main_nav.find('li').removeClass('active')
      }
      main_nav
        .find('a[href="#' + $(this).attr('id') + '"]')
        .parent('li')
        .addClass('active')
    }
    if (cur_pos < 300) {
      $('.nav-menu ul:first li:first').addClass('active')
    }
  })
})

// Toggle .header-scrolled class to #header when page is scrolled
$(window).scroll(() => {
  if ($(this).scrollTop() > 100) {
    $('#header').addClass('header-scrolled')
  } else {
    $('#header').removeClass('header-scrolled')
  }
})

if ($(window).scrollTop() > 100) {
  $('#header').addClass('header-scrolled')
}

// Back to top button
$(window).scroll(() => {
  if ($(this).scrollTop() > 100) {
    $('.back-to-top').fadeIn('slow')
  } else {
    $('.back-to-top').fadeOut('slow')
  }
})

$('.back-to-top').click(() => {
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    1500,
    'easeInOutExpo'
  )
  return false
})

var btn = $('#BTopButton');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

document.body.addEventListener("animationend", (ev) => {
  if(ev.animationName === "fadeIn") {
    ev.target.classList.add("fadeIn--after");
  }
});