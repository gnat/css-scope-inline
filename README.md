# 🌘 CSS Scope Inline

![cover](https://github.com/gnat/css-scope-inline/assets/24665/c4935c1b-34e3-4220-9d42-11f064999a57)
(Art by [shahabalizadeh](https://www.artstation.com/artwork/zDgdd))

## Why does this exist?

* You want an easy inline vanilla CSS experience without Tailwind CSS.
* Hate creating unique class names over.. and over.. to use once.
* You want to co-locate your styles for ⚡️ [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/)
* You wish `this` would work in `<style>` tags.
* Want all CSS features: [Nesting](https://caniuse.com/css-nesting), animations. Get scoped [`@keyframes`](https://github.com/gnat/css-scope-inline/blob/main/example.html#L50)!
* You wish `@media` queries were shorter for [responsive design](https://tailwindcss.com/docs/responsive-design).
* Only 16 lines. No build step. No dependencies.
* Pairs well with [htmx](https://htmx.org) and [Surreal](https://github.com/gnat/surreal)
* Want fewer layers, less complexity. Are aware of the cargo cult. ✈️

✨ Want to also scope your `<script>` tags? See our companion project [Surreal](https://github.com/gnat/surreal)

## 👁️ How does it look?
```html
<div>
    <style>
        me { background: red; } /* ✨ this & self also work! */
        me button { background: blue; } /* style child elements inline! */
    </style>
    <button>I'm blue</button>
</div>
```
See the [Live Example](https://gnat.github.io/css-scope-inline/example.html)! Then [view source](https://github.com/gnat/css-scope-inline/blob/main/example.html).

## 🌘 How does it work?

This uses `MutationObserver` to monitor the DOM, and the moment a `<style>` tag is seen, it scopes the styles to whatever the parent element is. No flashing or popping. 

This method also leaves your existing styles untouched, allowing you to mix and match at your leisure.

## 🎁 Install

✂️ copy + 📋 paste the snippet into `<script>` in your `<head>`

Or, [📥 download](https://raw.githubusercontent.com/gnat/css-scope-inline/main/script.js) into your project, and add `<script src="script.js"></script>` in your `<head>`

Or, 🌐 CDN: `<script src="https://cdn.jsdelivr.net/gh/gnat/css-scope-inline@main/script.js"></script>`

## 🤔 Why consider this over Tailwind CSS?

Use whatever you'd like, but there's a few advantages with this approach over Tailwind, Twind, UnoCSS:

* No more [repeating styles](https://tailwindcss.com/docs/reusing-styles) on child elements (..no [@apply](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply), no `[&>thing]` per style). It's just CSS!
* No endless visual noise on every `<div>`. Use a local `<style>` per group.
* No high risk of eventually requiring a build step.
* No chance of [deprecations](https://windicss.org/posts/sunsetting.html). 16 lines is infinitely maintainable.
* Get the ultra-fast "inspect, play with styles, paste" workflow back.
* No suffering from missing syntax highlighting on properties and units.
* No suffering from FOUC (a flash of unstyled content).
* Zero friction movement of styles between inline and `.css` files. Just replace `me`
* No special tooling or plugins to install. Universal vanilla CSS. 

## ⚡ Workflow Tips

* Flat, 1 selector per line can be very short like Tailwind. See the examples.
* Use just plain CSS variables in your design system.
* Use the short `@media` queries for responsive design.
  * Mobile First (flow: **above** breakpoint): **🟢 None** `sm` `md` `lg` `xl` `xx` 🏁
  * Desktop First (flow: **below** breakpoint): 🏁 `xs-` `sm-` `md-` `lg-` `xl-` **🟢 None**
  * 🟢 = No breakpoint. Default. See the [Live Example](https://gnat.github.io/css-scope-inline/example.html)!
  * Based on [Tailwind](https://tailwindcss.com/docs/responsive-design) breakpoints. We use `xx` not `2xl` to not break CSS highlighters.
  * Unlike Tailwind, you can [nest your @media styles](https://developer.chrome.com/articles/css-nesting/#nesting-media)!
* Positional selectors may be easier using `div[n1]` for `<div n1>` instead of `div:nth-child(1)`
* Try tools like- Auto complete styles: [VSCode](https://code.visualstudio.com/) or [Sublime](https://packagecontrol.io/packages/Emmet)

## 👁️ CSS Scope Inline vs Tailwind CSS Showdowns
### Basics
Tailwind verbosity goes up with more child elements.
```html
<!-- CSS Scope Inline -->
<div>
    <style>
        me { background: red; }
        me div { background: green; }
        me div[n1] { background: yellow; }
        me div[n2] { background: blue; }
    </style>
    red
    <div>green</div>
    <div>green</div>
    <div>green</div>
    <div n1>yellow</div>
    <div n2>blue</div>
    <div>green</div>
    <div>green</div>
</div>

<!-- Tailwind -->
<div class="bg-[red]">
    red
    <div class="bg-[green]">green</div>
    <div class="bg-[green]">green</div>
    <div class="bg-[green]">green</div>
    <div class="bg-[yellow]">yellow</div>
    <div class="bg-[blue]">blue</div>
    <div class="bg-[green]">green</div>
    <div class="bg-[green]">green</div>
</div>
```

### CSS variables and child elements
At first glance, **Tailwind Example 2** looks very promising! Exciting ...but:
* 🔴 **Every child style requires an explicit selector.**
  * Tailwinds' shorthand advantages sadly disappear.
  * Any more child styles added in Tailwind will become longer than vanilla CSS.
  * This limited example is the best case scenario for Tailwind.
* 🔴 Not visible on github: **no highlighting for properties and units** begins to be painful.
```html
<!doctype html>
<html>
    <head>
        <style>
            :root {
                --color-1: hsl(0 0% 88%);
                --color-1-active: hsl(214 20% 70%);
            }
        </style>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/gh/gnat/css-scope-inline@main/script.js"></script>
    </head>
    <body>
        <!-- CSS Scope Inline -->
        <div>
            <style>
               me { margin:8px 6px; }
               me div a { display:block; padding:8px 12px; margin:10px 0; background:var(--color-1); border-radius:10px; text-align:center; }
               me div a:hover { background:var(--color-1-active); color:white; }
            </style>
            <div><a href="#">Home</a></div>
            <div><a href="#">Team</a></div>
            <div><a href="#">Profile</a></div>
            <div><a href="#">Settings</a></div>
            <div><a href="#">Log Out</a></div>
        </div>

        <!-- Tailwind Example 1 -->
        <div class="mx-2 my-4">
            <div><a href="#" class="block py-2 px-3 my-2 bg-[--color-1] rounded-lg text-center hover:bg-[--color-1-active] hover:text-white">Home</a></div>
            <div><a href="#" class="block py-2 px-3 my-2 bg-[--color-1] rounded-lg text-center hover:bg-[--color-1-active] hover:text-white">Team</a></div>
            <div><a href="#" class="block py-2 px-3 my-2 bg-[--color-1] rounded-lg text-center hover:bg-[--color-1-active] hover:text-white">Profile</a></div>
            <div><a href="#" class="block py-2 px-3 my-2 bg-[--color-1] rounded-lg text-center hover:bg-[--color-1-active] hover:text-white">Settings</a></div>
            <div><a href="#" class="block py-2 px-3 my-2 bg-[--color-1] rounded-lg text-center hover:bg-[--color-1-active] hover:text-white">Log Out</a></div>
        </div>

        <!-- Tailwind Example 2 -->
        <div class="mx-2 my-4
            [&_div_a]:block [&_div_a]:py-2 [&_div_a]:px-3 [&_div_a]:my-2 [&_div_a]:bg-[--color-1] [&_div_a]:rounded-lg [&_div_a]:text-center
            [&_div_a:hover]:bg-[--color-1-active] [&_div_a:hover]:text-white">
            <div><a href="#">Home</a></div>
            <div><a href="#">Team</a></div>
            <div><a href="#">Profile</a></div>
            <div><a href="#">Settings</a></div>
            <div><a href="#">Log Out</a></div>
        </div>
    </body>
</html>
```
## 🔎 Technical FAQ
* Why do you use `querySelectorAll()` and not just process the `MutationObserver` results directly?
  * This was indeed the original design; it will work well up until you begin recieving subtrees (ex: DOM swaps with [htmx](https://htmx.org), ajax, jquery, etc.) which requires walking all subtree elements to ensure we do not miss a `<style>`. This unfortunately involves re-scanning thousands of repeated elements. This is why `querySelectorAll()` ends up the performance (and simplicity) winner.
