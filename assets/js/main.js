'use strict'; {
  ///////サイトのコンテンツのフェードイン
  const fadeContents = document.querySelectorAll('.js-fade-in');
  function callback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }
  const option = {
    root: null,
    threshold: 0.4,
    rootMargin: '0px',
  }
  const observer = new IntersectionObserver(callback, option);
  fadeContents.forEach(fadeContent => {
    observer.observe(fadeContent);
  });


  ///////heroのスライド
  const swiperSlide = document.querySelector('.js-swiper-container');
  new Swiper(swiperSlide, {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 3000,
    loop: true,
    effect: "fade",
  });

  ///////headerとトップへ戻るボタンの変化
  let position = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.l-header');
    const scrollBtn = document.querySelector('.js-page-top');
    if (position < document.documentElement.scrollTop) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
      navContents.classList.remove('active');
    }
    if (document.documentElement.scrollTop > 500) {
      scrollBtn.classList.add('appear');
    } else {
      scrollBtn.classList.remove('appear');
    }
    position = document.documentElement.scrollTop;
  });


  ///////モーダルウィンドウ
  const modalBtns = document.querySelectorAll('.js-modal-btn');
  const modalCloses = document.querySelectorAll('.js-modal-window__close');
  modalBtns.forEach(modalBtn => {
    const modalWindow = modalBtn.nextElementSibling;
    modalBtn.addEventListener('click', () => {
      modalWindow.classList.add('open');
      document.getElementById(modalBtn.dataset.layer).classList.add('appear');
    });
    modalCloses.forEach(modalClose => {
      modalClose.addEventListener('click', () => {
        document.getElementById(modalClose.dataset.bird).classList.remove('open');
        document.getElementById(modalClose.dataset.layer).classList.remove('appear');
      });
    });
  });


  ///////アコーディオン
  const faqItems = document.querySelectorAll('.p-faq-contents__item');
  faqItems.forEach(faqItem => {
    faqItem.addEventListener('click', () => {
      faqItem.children[0].classList.toggle('spin');
      faqItem.children[1].classList.toggle('open');
    });
  });

  ///////ハンバーガーメニューの処理
  let clickCount = 0;
  const btnMenu = document.querySelector('.js-btn-menu');
  const headerLogo = document.querySelector('.l-header-logo');
  const navContents = document.querySelector('.js-nav-contents');
  const disabledScroll = document.querySelector('.disabled-scroll');
  const headerSns = document.querySelector('.js-nav__sns');
  const navItems = document.querySelectorAll('.js-nav-global__item');
  btnMenu.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) {
      disabledScroll.classList.add('active');
      headerLogo.classList.add('active');
      btnMenu.classList.add('active');
      navContents.classList.add('active');
      setTimeout(() => {
        headerSns.classList.add('appear');
      }, 500);
      navItems.forEach(navItem => {
        setTimeout(() => {
          navItem.classList.add('appear');
        }, 1000);
      });

    }
    if (clickCount === 2) {
      clickCount = 0;
      disabledScroll.classList.remove('active');
      headerLogo.classList.remove('active');
      btnMenu.classList.remove('active');
      headerSns.classList.remove('appear');
      navContents.classList.remove('active');
      navItems.forEach(navItem => {
        navItem.classList.remove('appear');
      });
    }
  });
  navItems.forEach(navItem => {
    navItem.children[0].addEventListener('click', () => {
      clickCount = 0;
      disabledScroll.classList.remove('active');
      btnMenu.classList.remove('active');
      headerLogo.classList.remove('active');
      headerSns.classList.remove('appear');
      navItem.classList.remove('appear');
    });
  });

  ///////流れるスライドショー(slick)
  const slickSlide = document.querySelector('.p-slider__list');
  $(slickSlide).slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    adaptiveHeight: true,
    speed: 6900,
    infinite: true,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1.5,
        }
      }
    ]
  });
}
