$(document).ready(function () {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Mobile menu toggle
  $("#menuToggle").on("click", function () {
    $("#navMenu").toggleClass("active");
    $("#menuOverlay").toggleClass("active");
    $(this).text($(this).text() === "☰" ? "✕" : "☰");
  });

  // Close menu when overlay is clicked
  $("#menuOverlay").on("click", function () {
    $("#navMenu").removeClass("active");
    $(this).removeClass("active");
    $("#menuToggle").text("☰");
  });

  // Close menu when a link is clicked (mobile)
  $("#navMenu a").on("click", function () {
    if ($(window).width() < 992) {
      $("#navMenu").removeClass("active");
      $("#menuOverlay").removeClass("active");
      $("#menuToggle").text("☰");
    }
  });

  // Active link on scroll
  $(window).on("scroll", function () {
    var scrollPos = $(window).scrollTop();

    $("#navMenu a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));

      if (
        refElement.length &&
        refElement.position().top <= scrollPos + 100 &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $("#navMenu a").removeClass("active");
        currLink.addClass("active");
      }
    });
  });

  // Smooth scroll
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this.getAttribute("href"));

    if (target.length) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800
        );
    }
  });
});
