$(document).ready(function () {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Set active navigation based on current page
  function setActiveNav() {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Remove all active classes first
    $("#navMenu a").removeClass("active");

    // Add active class to matching navigation link
    $("#navMenu a").each(function () {
      var href = $(this).attr("href");

      // Check if href matches current page
      if (href === currentPage || href === "./" + currentPage) {
        $(this).addClass("active");
      }

      // Handle root/home page
      if ((currentPage === "" || currentPage === "index.html") &&
          (href === "./index.html" || href === "index.html" || href === "./")) {
        $(this).addClass("active");
      }
    });
  }

  // Call on page load
  setActiveNav();

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
      var href = currLink.attr("href");

      // Skip external links and only process anchor links
      if (!href || !href.startsWith("#")) {
        return;
      }

      var refElement = $(href);

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
