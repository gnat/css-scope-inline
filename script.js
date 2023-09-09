// 🌘 CSS Scope Inline (https://github.com/gnat/css-scope-inline)
window.cssScopeCount ??= 1 // Let copies share the count to prevent scope clash.
new MutationObserver((mutations, observer) => {
	var cssScopePattern = new RegExp('(\\.me|\\.this|\\.self)(?![A-Za-z0-9\_\-])', 'g') // Can use: .me .this .self
	for (var mutation of mutations) {
		if (mutation.type !== "childList") continue
		var nodes = [...mutation.addedNodes] // Check new nodes.
		for (var node = nodes.shift(); node != null; node = nodes.shift()) {
			nodes.push(...node.childNodes) // Check children of this new node (subtree).
			if (node.nodeName !== 'STYLE') continue // Not a <style>
			if (!node.parentNode || node.parentNode.nodeName === 'HEAD') continue // Must have parent. Don't style <head>
			var scope = 'self_'+(window.cssScopeCount++) // Ready. Make unique scope, example: .self_1234
			node.parentNode.classList.add(scope)
			node.textContent = node.textContent.replace(cssScopePattern, '.'+scope)
		}
	}
}).observe(document.documentElement, {childList: true, subtree: true})
