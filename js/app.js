const video = document.querySelector(".video-background");

const swiperText = new Swiper(".swiper", {
  speed: 1000,
  mousewheel: {},
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});
swiperText.on("slideChange", function () {
  gsap.to(video, 1, {
    currentTime: (video.duration / (this.slides.length - 1)) * this.realIndex,
    ease: "power1.in",
  });
});
swiperText
  .on("slideChangeTransitionStart", function () {
    video.classList.add("change");
  })
  .on("slideChangeTransitionEnd", function () {
    video.classList.remove("change");
  });
