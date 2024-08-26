const bars = document.querySelector('#bars');
const navbar = document.querySelector('nav ul');
const bodyoverlay = document.querySelector('.overlay-container');




bars.addEventListener(
    'click',
    function () {
        navbar.classList.add('open')
        bodyoverlay.classList.add('open-overlay-container')
    }
)

bodyoverlay.addEventListener(
    'click',
    function () {
        navbar.classList.remove('open')
        bodyoverlay.classList.remove('open-overlay-container')

    }
)

document.addEventListener(
    'scroll',
    function (e) {

        if (window.scrollY > 55) {
            document.body.classList.add('stick')
        } else {
            document.body.classList.remove('stick')

        }
    }
)



$('.multiple-items').slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });