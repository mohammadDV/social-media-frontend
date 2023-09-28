document.addEventListener("DOMContentLoaded", function () {
  const lazyLoadTrigger = document.querySelector(".lazyload-trigger");
  const lazyLoadButton = document.querySelector(".lazyload-button");
  const lazyloadBody = document.querySelector(".lazyload-body");
  // const theUrl = "../../data/archive-data.json";
  let lazyCalled = false;

  // 1. Triggers
  if (lazyLoadTrigger) {
    const componentType = lazyLoadTrigger.getAttribute("component-type");

    window.addEventListener(
      "scroll",
      function () {
        if (isInViewport(lazyLoadTrigger) && !lazyCalled) {
          // getData(componentType, theUrl);

          lazyCalled = true;
        }
      },
      false
    );

    const isInViewport = function (lazyLoadTrigger) {
      const triggerBounds = lazyLoadTrigger.getBoundingClientRect();

      if (
        triggerBounds.top >= 0 &&
        triggerBounds.left >= 0 &&
        triggerBounds.right <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        triggerBounds.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      ) {
        return true;
      } else {
        return false;
      }
    };
  }

  if (lazyLoadButton) {
    const componentType = lazyLoadButton.getAttribute("component-type");
    // Button call
    lazyLoadButton.addEventListener("click", () => {
      // getData(componentType, theUrl);

      lazyCalled = true;
    });
  }

  // 2. Loading state true & Fetch data

  // const getData = (componentType, theUrl) => {
  //   lazyloadBodyVisible();
  //   setTimeout(function () {
  //     fetch(theUrl)
  //       .then((response) => response.json())
  //       .then((data) => populateData(data, componentType));
  //   }, 4000);
  // };

  // 3. Loading state false & populate data

  const populateData = (data, componentType) => {
    const lazyloadTarget = document.querySelector(".lazyload-body");
    const targetParent = lazyloadTarget.parentElement;

    switch (componentType) {
      case "ARCHIVE_POST":
        data.forEach((post) => {

          // const postDiv = document.createElement("div");
          // postDiv.classList.add("col-12", "col-lg-6");
          // postDiv.innerHTML = `
          //     <div class="news-row-item" id="${post.postId}">
          //       <div class="row gx-2">
          //         <div class="col-4">
          //           <div
          //             class="news-row-item-thumb ratio ratio-1x1"
          //             style="
          //               background-image: url(${post.imgUrl});
          //             "
          //           ></div>
          //         </div>
          //         <div class="col-8">
          //           <p class="news-row-item-title">
          //             ${post.title}
          //           </p>
          //           <a
          //             class="news-row-item-link stretched-link"
          //             href="${post.link}"
          //             >${post.linkText}</a
          //           >
          //         </div>
          //       </div>
          //     </div>
          //   `;

          targetParent.insertBefore(postDiv, lazyloadTarget);
        });

        break;
      case "POST_COMMENTS":
        break;

      default:
        break;
    }

    lazyCalled = false;
    lazyloadBodyInvisible();
  };

  const lazyloadBodyVisible = () => {
    lazyloadBody.classList.add("visible");
  };

  const lazyloadBodyInvisible = () => {
    lazyloadBody.classList.remove("visible");
  };
});
