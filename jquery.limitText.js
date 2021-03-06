/*******************************************************************************
	JQuery plugin to create a "Read More" section for dynamically populated text by limiting the number of visible characters.
	Version 0.1 - July 5, 2015
	Customizable options:
		characterLimit: 240,
		readLessText: "Read Less",
		readMoreText: "Read More",
		showEllipsis: true
*******************************************************************************/

(function($) {
	$.fn.limitText = function (userOptions) {
		this.each(function() {
			var defaultOptions = {
				characterLimit: 240,
				readLessText: "Read less",
				readMoreText: "Read more",
				showEllipsis: true
			};

			var options = $.extend({}, defaultOptions, userOptions);
			var expander = $(this);
			var fullHtml = expander.html();
			var fullText = expander.text();

			if (fullText.length > options.characterLimit) {

				// Limit number of characters in text, word by word
				var fullWordList = fullText.split(/\s+/);
				var shortText = "";
				while ((shortText + fullWordList[0] + " ").length < options.characterLimit) {
					shortText += fullWordList.shift() + " ";
				}
				if (options.showEllipsis) { shortText += "... "; }

				// Clear existing content
				$(this).html("");

				// Add short text and "Read more" toggle
				var expanderShort = $("<div/>", {
					class: "text-short",
					text: shortText
				});
				var expanderShortToggle = $("<a/>", {
					class: "toggle",
					text: options.readMoreText
				});
				expanderShort.append(expanderShortToggle);
				expander.append(expanderShort);

				// Add back full text and "Read less" toggle
				var expanderFull = $("<div/>", {
					class: "text-full",
					html: fullHtml + " "
				});
				var expanderFullToggle = $("<a/>", {
					class: "toggle",
					text: options.readLessText
				});
				expanderFull.append(expanderFullToggle);
				expander.append(expanderFull);

			}
		});

		// Toggle more/less text functionality
		$(".text-short").show();
		$(".text-full").hide();
		$(".toggle").click(function(){
			$(this).parent().hide();
			$(this).parent().siblings().show();
		});
	}
}(jQuery));