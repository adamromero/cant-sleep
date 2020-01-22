/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var app = function () {
   var s;
   var app = {
      settings: {
         mobileBreakPoint: 642,
         wrapper: document.querySelector(".wrapper"),
         mobileMenu: document.querySelector(".mobile-navigation-menu"),
         contentItem: document.querySelectorAll(".content-item"),
         modalWindow: document.getElementById("modalWindow"),
         closeModalWindow: document.querySelector(".modal-close"),
         modalContent: document.querySelector(".modal-content"),
         menuIcon: document.querySelector(".menu-icon"),
         inputSearch: document.querySelector(".input-search"),
         gridColumn: document.querySelectorAll(".grid-column")
         //videoPlayer: document.getElementById("videoPlayer")
      },

      init: function init() {
         s = this.settings;
         this.openMenuForDesktop();
         this.lazyLoad();
         this.bindUIActions();
      },

      bindUIActions: function bindUIActions() {
         window.addEventListener("resize", app.openMenuForDesktop, false);

         s.menuIcon.addEventListener("click", function (e) {
            [].map.call(document.querySelectorAll(".menu-icon"), function (el) {
               el.classList.toggle("open");
               s.mobileMenu.classList.toggle("is-open");
               s.wrapper.classList.toggle("is-shifted");
            });
         });

         app.clickToOpenContent(s.contentItem, ".content-item__source", false);

         s.closeModalWindow.addEventListener("click", function (e) {
            app.closeModal();
         });

         if (s.inputSearch !== null && s.inputSearch !== "undefined") {
            s.inputSearch.addEventListener("keyup", function () {
               app.filterItemsBySearch(this);
            });
         }
         /*
         if (s.videoPlayer) {
         s.videoPlayer.addEventListener("onStateChange", function(state){
         console.log(state);
         if(state === 0){
         console.log("you must whip it!");
         }
         });
         }*/
      },

      lazyLoad: function lazyLoad() {},

      filterItemsBySearch: function filterItemsBySearch(input) {
         var filter = input.value.toUpperCase();
         var gridColumn = s.gridColumn;

         for (var i = 0; i < gridColumn.length; i++) {
            var gridColumnTitles = gridColumn[i].childNodes[1].innerText;
            if (gridColumnTitles) {
               if (gridColumnTitles.toUpperCase().indexOf(filter) > -1) {
                  gridColumn[i].style.display = "";
               } else {
                  gridColumn[i].style.display = "none";
               }
            }
         }
      },

      closeModal: function closeModal() {
         s.modalWindow.classList.remove("is-open");
         s.modalWindow.classList.remove("is-locked");
         s.modalContent.classList.remove("responsive-video");
         var content = $(s.modalContent).children(".content-item__source")[0];
         content.parentNode.removeChild(content);
         document.body.classList.remove("is-locked");
         responsiveVoice.cancel();
      },

      clickToOpenContent: function clickToOpenContent(contents, selector) {
         contents.forEach(function (content) {
            content.addEventListener("click", function () {
               var sourceContent = void 0,
                   isVideo = false;
               if (this.classList.contains("video-content")) {
                  sourceContent = $(this).find(".content-item__video");
                  isVideo = true;
               } else {
                  sourceContent = $(this).children(selector)[0].cloneNode(true);
               }
               app.insertContentInModal(sourceContent, isVideo);
               if (!isVideo) {
                  app.arrangePhotosWithinText();
               }
            });
         });

         document.querySelectorAll(".text-content__story").forEach(function (story) {
            story.innerHTML = story.innerText;
         });
      },

      insertAfter: function insertAfter(newNode, referenceNode) {
         referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      },


      arrangePhotosWithinText: function arrangePhotosWithinText() {
         var storyParagraphs = document.querySelectorAll(".is-open .text-content__story p");
         var storyImages = document.querySelectorAll(".is-open .story-images img");

         var storyLength = storyParagraphs.length;
         var numImages = storyImages.length;
         var target = parseInt(storyLength / numImages);

         var imageIdx = 0;
         for (var i = 0; i < storyLength; i++) {
            if (i % target === 0 && imageIdx < numImages) {
               app.insertAfter(storyImages[imageIdx++], storyParagraphs[i]);
            }
         }
      },

      openMenuForDesktop: function openMenuForDesktop() {
         if (window.innerWidth >= s.mobileBreakPoint) {
            if (!app.hasClass(s.mobileMenu.classList, "is-open")) {
               s.mobileMenu.classList.add("is-open");
            }
            if (!app.hasClass(s.wrapper.classList, "is-shifted")) {
               s.wrapper.classList.add("is-shifted");
            }
         } else {
            if (app.hasClass(s.mobileMenu.classList, "is-open")) {
               s.mobileMenu.classList.remove("is-open");
            }
            if (app.hasClass(s.wrapper.classList, "is-shifted")) {
               s.wrapper.classList.remove("is-shifted");
            }
         }
         s.menuIcon.classList.remove("open");
      },

      hasClass: function hasClass(classList, selector) {
         for (var i = 0; i < classList.length; i++) {
            if (classList[i] === selector) {
               return true;
            }
         }
         return false;
      },

      insertContentInModal: function insertContentInModal(content, isVideo) {
         if (isVideo) {
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            var urlVideoID = content[0].getAttribute("data-video");
            console.log("content id: ", urlVideoID);

            var iframe = "<iframe\n               allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n               id=\"videoPlayer\"\n               class=\"content-item__source iframe-content lazy\"\n               src=\"https://www.youtube.com/embed/" + urlVideoID + "?iv_load_policy=3&rel=0&enablejsapi=1&widgetid=1&autoplay=1\"\n               allowfullscreen style=\"height: " + (windowHeight * 0.75).toString() + "px\">\n               </iframe>";

            s.modalWindow.classList.add("is-locked");
            s.modalContent.classList.add("responsive-video");
            s.modalContent.innerHTML = iframe;
            s.modalWindow.classList.add("is-open");
            document.body.classList.add("is-locked");
         } else {
            content.classList.remove("hide");
            s.modalWindow.classList.add("is-open");
            s.modalContent.appendChild(content);
            document.body.classList.add("is-locked");
         }
      }
   };

   return app;
}();

app.init();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);