

let mypdfresume = './document/Saurabh_Kumar_Resume.pdf';
let downloadBtn = document.querySelector(".downloadbtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    var link = document.createElement("a");
    link.href = mypdfresume;
    link.download = "Saurabh Kumar Resume.pdf";
    link.click();
  });
}

let experiences = document.querySelector("#experienceCarousel");
if (experiences) {
  $("#experienceCarousel").owlCarousel({
    loop: true,
    margin: 16,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
}

const form = document.getElementById("contactForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formdata = new FormData(form)
  await fetch("http://localhost:8000/api/contact", {
    method: "POST",
    body: formdata
  }).then((res) => res.json()).then((response) => {
    console.log(response)
  }).catch((error) => { console.log(error) })
});

let split;
gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  gsap.set(".h1", { opacity: 1 });

  let split;
  SplitText.create(".h1", {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      split = gsap.from(self.lines, {
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        delay: 1,
        ease: "expo.out",
      });
      return split;
    },
  });
});

document.fonts.ready.then(() => {
  gsap.set(".p", { opacity: 1 });

  let split;
  SplitText.create(".p", {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      split = gsap.from(self.lines, {
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        delay: 1.5,
        ease: "expo.inout",
      });
      return split;
    },
  });
});
document.addEventListener("DOMContentLoaded", () => {
  if (split) {
    split.timeScale(0.2).play(0);
  }
});

gsap.from(".navigation", {
  y: -200,
  duration: 1,
  ease: "bounce",
});

let underlinedText = document.querySelectorAll(".underlined-text");
underlinedText.forEach((item) => {
  item.addEventListener("mouseenter", (e) => {
    e.target.classList.add("underlinedtext");
  });
});

underlinedText.forEach((item) => {
  item.addEventListener("mouseleave", (e) => {
    e.target.classList.remove("underlinedtext");
  });
});

// Animate elements when they come into view
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate progress bars when they come into view
      if (entry.target.classList.contains("skill-card")) {
        const progressBars = entry.target.querySelectorAll(".progress-bar");
        progressBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".animate-on-scroll").forEach((element) => {
  observer.observe(element);
});
