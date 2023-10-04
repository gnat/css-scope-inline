// 🌘 CSS Scope Inline (https://github.com/gnat/css-scope-inline)
window.cssScopeCount ??= 1 // Let other scripts read the scope count.
window.cssScope ??= new MutationObserver(mutations => { // Allow 1 observer.
	document?.body?.querySelectorAll('style:not([scoped-to])').forEach(node => { // Faster than walking MutationObserver results when recieving subtree (DOM swap, htmx, ajax, jquery).
		node.parentNode.dataset.cssScope ??= (window.cssScopeCount++)
		node.textContent = node.textContent
		.replace(/((@keyframes\s|animation:|animation-name:)[^{};]*)\bme(?![A-Za-z])/g, `$1css-scope-${node.parentNode.dataset.cssScope}`)
		.replace(/(^|[^-\w])me(?![-\w])/g, `$1[data-css-scope='${node.parentNode.dataset.cssScope}']`)
		.replace(/(?:@media)\s+(xs-|sm-|md-|lg-|xl-|sm|md|lg|xl|xx)(?![-\w])/g, // Optional responsive design shorthand for @media breakpoints. Mobile First (above breakpoint): 🟢 None sm md lg xl xx 🏁  Desktop First (below breakpoint): 🏁 xs- sm- md- lg- xl- None 🟢
			(match, part1) => { return '@media '+({'sm':'(min-width: 640px)','md':'(min-width: 768px)', 'lg':'(min-width: 1024px)', 'xl':'(min-width: 1280px)', 'xx':'(min-width: 1536px)', 'xs-':'(max-width: 639px)', 'sm-':'(max-width: 767px)', 'md-':'(max-width: 1023px)', 'lg-':'(max-width: 1279px)', 'xl-':'(max-width: 1535px)'}[part1]) }
		)
		node.setAttribute('scoped-to', node.parentNode.dataset.cssScope)
	})
}).observe(document.documentElement, {childList: true, subtree: true})
