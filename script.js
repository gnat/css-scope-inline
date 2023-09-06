// 🌘 CSS Scope Inline (https://github.com/gnat/css-scope-inline)
var cssScopeCount = 1
new MutationObserver((mutations, observer) => {
	for (var mutation of mutations) {
		if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
			var addedNode = mutation.addedNodes[0]
			if (addedNode.nodeName !== 'STYLE') continue // Not a <style>
			if (!addedNode.parentNode || addedNode.parentNode?.tagName === 'HEAD') continue // Must have parent. Don't style <head>
			cssScopeCount++ // Ready.
			addedNode.parentNode.classList.add('self_'+cssScopeCount) // Make unique scope, example: .self_1234
			var pattern = new RegExp('(\\.me|\\.this|\\.self)(?![A-Za-z0-9\_\-])', 'g') // Can use: .me .this .self
			addedNode.textContent = addedNode.textContent.replace(pattern, '.self_'+cssScopeCount)
		}
	}
}).observe(document.documentElement, {childList: true, subtree: true})
