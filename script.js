// 🌘 CSS Scope Inline (https://github.com/gnat/css-scope-inline)
window.cssScopeCount ??= 1 // Let extra copies share the scope count.
new MutationObserver(mutations => {
	document?.body?.querySelectorAll('style').forEach(node => { // Faster than walking MutationObserver results when recieving subtree (DOM swap, htmx, ajax, jquery).
		if (node.cssScopeInlineDone) return // Skip if node was processed.
		if (!node.parentNode) return // Skip if no parent.
		var scope = 'self__'+(window.cssScopeCount++) // Ready. Make unique scope, example: .self__1234
		node.parentNode.classList.add(scope)
		node.textContent = node.textContent.replace(/\.(me|this|self)(?![a-zA-Z])/g, '.'+scope) // Can use: .me .this .self
		node.cssScopeInlineDone = 1
		// Optional. Responsive design. Mobile First (above breakpoint): 🟢 None sm md lg xl xx 🏁  Desktop First (below breakpoint): 🏁 xs- sm- md- lg- xl- None 🟢
		node.textContent = node.textContent.replace(/(?:@media)\s(xs-|sm-|md-|lg-|xl-|sm|md|lg|xl|xx)/g, // *- matches must be first!
			(match, part1) => { return '@media '+({'sm':'(min-width: 640px)','md':'(min-width: 768px)', 'lg':'(min-width: 1024px)', 'xl':'(min-width: 1280px)', 'xx':'(min-width: 1536px)', 'xs-':'(max-width: 639px)', 'sm-':'(max-width: 767px)', 'md-':'(max-width: 1023px)', 'lg-':'(max-width: 1279px)', 'xl-':'(max-width: 1535px)'}[part1]) }
		)
	})
}).observe(document.documentElement, {childList: true, subtree: true})
