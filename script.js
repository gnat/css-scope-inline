// 🌘 CSS Scope Inline (https://github.com/gnat/css-scope-inline)
window.cssScopeCount ??= 1 // Let extra copies share the scope count.
new MutationObserver(mutations => {
	for (var mutation of mutations) {
		if (mutation.type !== "childList") continue // Skip if not mutating nodes.
		var nodes = [...mutation.addedNodes] // Get new nodes.
		for (var node = nodes.shift(); node != null; node = nodes.shift()) { // Process nodes.
			nodes.push(...node.childNodes) // Also process children.
			if (node.nodeName !== 'STYLE') continue // Skip if not a <style>
			if (!node.parentNode || node.parentNode?.nodeName === 'HEAD') continue // Skip if no parent. Don't style <head>
			if (node.textContent.includes('.self__')) continue // Skip if already processed.
			var scope = 'self__'+(window.cssScopeCount++) // Ready. Make unique scope, example: .self__1234
			node.parentNode.classList.add(scope)
			node.textContent = node.textContent.replace(/\.(me|this|self)(?![A-Za-z0-9\_\-])/g, '.'+scope) // Can use: .me .this .self
		}
	}
}).observe(document.documentElement, {childList: true, subtree: true})
