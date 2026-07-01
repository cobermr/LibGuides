//Set header image
(function () {
  function applyHeaderImage() {
    var defaultFallbackImageUrl = "https://libapps.s3.amazonaws.com/accounts/352381/images/library-banner-new.png";

    var currentPageName = "";
    var pageNameEl = document.getElementById("s-lg-guide-name");

    if (pageNameEl) {
      currentPageName = pageNameEl.textContent.trim();
    }

    var imageToUse = "";

    for (var i = 0; i < pages.length; i++) {
      if (pages[i].title.trim() === currentPageName) {
        imageToUse = pages[i].imageUrl;
        break;
      }
    }

    if (!imageToUse) {
      imageToUse = guideImageUrl;
    }

    if (!imageToUse) {
      imageToUse = defaultFallbackImageUrl;
    }

    var header = document.getElementById("s-lg-guide-header");
    if (header) {
      header.style.backgroundImage = "url('" + imageToUse + "')";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyHeaderImage);
  } else {
    applyHeaderImage();
  }
})();