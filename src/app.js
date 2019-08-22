require('./stylesheets/style.scss');

var app = (function() {
	var s;
	var app = {
		settings: {
			mobileBreakPoint: 642,
			wrapper: document.querySelector('.wrapper'),
			mobileMenu: document.querySelector('.mobile-navigation-menu'),
			contentItem: document.querySelectorAll(".content-item"),
			modalWindow: document.getElementById('modalWindow'),
			closeModalWindow: document.querySelector('.modal-close'),
			modalContent: document.querySelector('.modal-content'),
			menuIcon: document.querySelector(".menu-icon"),
			inputSearch: document.querySelector(".input-search"),
			gridColumn: document.querySelectorAll(".grid-column")
			//videoPlayer: document.getElementById("videoPlayer")
		},

		init: function() {
			s = this.settings;
			this.openMenuForDesktop();
			this.bindUIActions();
		},

		bindUIActions: function() {
			window.addEventListener('resize', app.openMenuForDesktop, false);

			s.menuIcon.addEventListener('click', function(e) {
				[].map.call(document.querySelectorAll(".menu-icon"), function(el) {
			        el.classList.toggle('open');
			        s.mobileMenu.classList.toggle('is-open');
			        s.wrapper.classList.toggle('is-shifted');
			    });
			});

			app.clickToOpenContent(s.contentItem, '.content-item__source', false);

			s.closeModalWindow.addEventListener('click', function(e) {
				app.closeModal();
			});

			if (s.inputSearch !== null && s.inputSearch !== "undefined") {
				s.inputSearch.addEventListener('keyup', function() {
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

		filterItemsBySearch: function (input) {
			let filter = input.value.toUpperCase();
			let gridColumn = s.gridColumn;

			for (let i = 0; i < gridColumn.length; i++) {
				let gridColumnTitles = gridColumn[i].childNodes[1].innerText;
				if (gridColumnTitles) {
					if (gridColumnTitles.toUpperCase().indexOf(filter) > -1) {
						gridColumn[i].style.display = "";
					} else {
						gridColumn[i].style.display = "none";
					}
				}
			}
		},

		closeModal: function() {
			s.modalWindow.classList.remove('is-open');
			s.modalWindow.classList.remove('is-locked');
			s.modalContent.classList.remove('responsive-video');
			var content = $(s.modalContent).children('.content-item__source')[0];
			content.parentNode.removeChild(content);
			document.body.classList.remove('is-locked');
			responsiveVoice.cancel();
		},

		clickToOpenContent: function(contents, selector) {
			contents.forEach(function(content) {
				content.addEventListener("click", function() {
					let sourceContent = $(this).children(selector)[0].cloneNode(true);
					let isVideo = sourceContent.tagName === 'IFRAME';
					app.insertContentInModal(sourceContent, isVideo);

					if (!isVideo) {
						app.arrangePhotosWithinText();
					}
				});
			});

			document.querySelectorAll(".text-content__story").forEach(function(story) {
				story.innerHTML = story.innerText;
			});
		},

		insertAfter(newNode, referenceNode) {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		},

		arrangePhotosWithinText: function() {
			let storyParagraphs = document.querySelectorAll(".is-open .text-content__story p");
			let storyImages = document.querySelectorAll(".is-open .story-images img");

			let storyLength = storyParagraphs.length;
			let numImages = storyImages.length;
			let target = parseInt(storyLength / numImages);

			let imageIdx = 0;
			for (let i = 0; i < storyLength; i++) {
				if (i % target === 0 && imageIdx < numImages) {
					app.insertAfter(storyImages[imageIdx++], storyParagraphs[i]);
				}
			}
		},

		openMenuForDesktop: function() {
			if (window.innerWidth >= s.mobileBreakPoint) {
				if (!app.hasClass(s.mobileMenu.classList, 'is-open')) {
					s.mobileMenu.classList.add('is-open');
				}
				if (!app.hasClass(s.wrapper.classList, 'is-shifted')) {
					s.wrapper.classList.add('is-shifted');
				}
			} else {
				if (app.hasClass(s.mobileMenu.classList, 'is-open')) {
					s.mobileMenu.classList.remove('is-open');
				}
				if (app.hasClass(s.wrapper.classList, 'is-shifted')) {
					s.wrapper.classList.remove('is-shifted');
				}
			}
			s.menuIcon.classList.remove('open');
		},

		hasClass: function(classList, selector) {
			for (var i = 0; i < classList.length; i++) {
				if (classList[i] === selector) {
					return true;
				}
			}
			return false;
		},

		insertContentInModal: function(content, isVideo) {
			content.classList.remove('hide');
			s.modalWindow.classList.add('is-open');
			s.modalContent.appendChild(content);
			document.body.classList.add('is-locked');

			if (isVideo) {
				var windowHeight = window.innerHeight
					|| document.documentElement.clientHeight
					|| document.body.clientHeight;

				s.modalWindow.classList.add('is-locked');
				s.modalContent.classList.add('responsive-video');
				s.modalContent.childNodes[0].style.height = (windowHeight * .75).toString() + "px";
				content.src += "&autoplay=1";
				content.setAttribute("allow", "autoplay");
			}
		}
	};

	return app;
})();

app.init();
