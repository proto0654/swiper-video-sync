const video = document.querySelector(".video-background");

const swiperText = new Swiper(".swiper", {
  loop: true,
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

function handleVideoPlayback(swiper, direction) {
  gsap.killTweensOf(video);
  const newTime = (swiper.realIndex % 2) * (video.duration / 2);

  if (direction === "next") {
    // Forward playback
    if (newTime < video.currentTime) {
      // This handles the loop: animate to the end, then jump to the start
      gsap.to(video, 1, {
        currentTime: video.duration,
        ease: "power2.in",
        onComplete: () => {
          video.currentTime = 0; // Jump to start after reaching the visual end
        },
      });
    } else {
      gsap.to(video, 1, { currentTime: newTime, ease: "power2.in" });
    }
  } else {
    // direction === 'prev'
    // Backward playback
    if (newTime > video.currentTime) {
      // This handles the loop: jump to the end to rewind from there
      video.currentTime = video.duration;
    }
    gsap.to(video, 1, { currentTime: newTime, ease: "power2.in" });
  }
}

swiperText.on("slideNextTransitionStart", function () {
  handleVideoPlayback(this, "next");
});

swiperText.on("slidePrevTransitionStart", function () {
  handleVideoPlayback(this, "prev");
});

swiperText
  .on("slideChangeTransitionStart", function () {
    video.classList.add("change");
  })
  .on("slideChangeTransitionEnd", function () {
    video.classList.remove("change");
  });
