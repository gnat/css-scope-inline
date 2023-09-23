# 🌘 CSS Scope Inline

![cover](https://github.com/gnat/css-scope-inline/assets/24665/c4935c1b-34e3-4220-9d42-11f064999a57)
(Art by [shahabalizadeh](https://www.artstation.com/artwork/zDgdd))

## Why does this exist?

* You want an easy inline vanilla CSS experience without Tailwind CSS.
* Hate creating unique class names over.. and over.. to use once.
* You want to co-locate your styles for ⚡️ [Locality of Behavior (LoB)](https://htmx.org/essays/locality-of-behaviour/)
* You wish `this` would work in `<style>` tags.
* Want all CSS features: [Nesting](https://caniuse.com/css-nesting), animations. Get scoped [`@keyframes`](https://github.com/gnat/css-scope-inline/blob/main/example.html#L86)!
* You wish `@media` queries were shorter for [responsive design](https://tailwindcss.com/docs/responsive-design).
* Only 18 lines. No build step. No dependencies.
* Pairs well with [htmx](https://htmx.org) and [Surreal](https://github.com/gnat/surreal)
* Want fewer layers, less complexity. Are aware of the cargo cult. ✈️

✨ Want to also scope your `<script>` tags? See our companion project [Surreal](https://github.com/gnat/surreal)

## 👁️ How does it look?
```html
<div>
    <style>
        .me { background: red; } /* ✨ .this and .self also work! */
        .me button { background: blue; } /* style child elements inline! */
    </style>
    <button>I'm blue</button>
</div>
```
See the [Live Example](https://gnat.github.io/css-scope-inline/example.html)! Then [view source](https://github.com/gnat/css-scope-inline/blob/main/example.html).

## 🌘 How does it work?

This uses `MutationObserver` to monitor the DOM, and the moment a `<style>` tag is seen, it scopes the styles to whatever the parent element is. No flashing or popping. 

This method also leaves your existing styles untouched, allowing you to mix and match at your liesure.

## 🤔 Why consider this over Tailwind CSS?

Use whatever you'd like, but there's a few advantages with this approach over Tailwind, Twind, UnoCSS:

* No more [repeating styles](https://tailwindcss.com/docs/reusing-styles) on child elements (..and no [@apply](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply), no `[&>*]`). It's just CSS!
* No high risk of eventually requiring a build step.
* No chance of [deprecations](https://windicss.org/posts/sunsetting.html). 18 lines is infinitely maintainable.
* Get the ultra-fast "inspect, play with styles, paste" workflow back.
* No suffering from FOUC (a flash of unstyled content).
* Zero friction movement of styles between inline and `.css` files. Just replace `.me`
* No special tooling or plugins to install. Universal vanilla CSS. 

## ⚡ Workflow Tips

* Use just plain CSS variables in your design system.
* Use the short `@media` queries for responsive design. Choose one:
  * Mobile First (**above** breakpoint): **DEFAULT ▶️** `@media sm` `@media md` `@media lg` `@media xl` `@media xxl`
  * Desktop First (**below** breakpoint):  `@media xs-` `@media sm-` `@media md-` `@media lg-` `@media xl-` **◀️ DEFAULT**
  * Both sets share breakpoints. Mobile First is `xs` default. Desktop First is `xxl` default.
  * Based on [Tailwind](https://tailwindcss.com/docs/responsive-design) breakpoints. Note: We use `xxl` not `2xl` to not break CSS highlighters.
* Try tools like- Auto complete styles: [VSCode](https://code.visualstudio.com/) or [Sublime](https://packagecontrol.io/packages/Emmet). Auto fold `<style>` and `<script>` in [Sublime](https://packagecontrol.io/packages/Inline%20Fold)
  * These are not for everybody, but you may find them worthwhile. 

## 👁️ CSS Scope Inline vs Tailwind CSS Showdowns
### Basics
```html
<!-- CSS Scoped Inline -->
<div>
    <style>
        .me { background: red; }
        .me div { background: green; }
        .me div[n1] { background: yellow; }
        .me div[n2] { background: blue; }
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
### CSS variables and child styling

```html
<!doctype html>
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
               .me { margin:8px 6px; }
               .me a { display:block; padding:8px 12px; margin:10px 0; background:var(--color-1); border-radius:10px; text-align:center; }
               .me a:hover { background:var(--color-1-active); color:white; }
            </style>
            <a href="#">Home</a>
            <a href="#">Team</a>
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Log Out</a>
        </div>

        <!-- Tailwind Example 1 -->
        <div class="mx-2 my-4">
            <a href="#" class="block py-2 px-3 my-2 bg-[color:var(--color-1)] rounded-lg text-center hover:bg-[color:var(--color-1-active)] hover:text-white">Home</a>
            <a href="#" class="block py-2 px-3 my-2 bg-[color:var(--color-1)] rounded-lg text-center hover:bg-[color:var(--color-1-active)] hover:text-white">Team</a>
            <a href="#" class="block py-2 px-3 my-2 bg-[color:var(--color-1)] rounded-lg text-center hover:bg-[color:var(--color-1-active)] hover:text-white">Profile</a>
            <a href="#" class="block py-2 px-3 my-2 bg-[color:var(--color-1)] rounded-lg text-center hover:bg-[color:var(--color-1-active)] hover:text-white">Settings</a>
            <a href="#" class="block py-2 px-3 my-2 bg-[color:var(--color-1)] rounded-lg text-center hover:bg-[color:var(--color-1-active)] hover:text-white">Log Out</a>
        </div>

        <!-- Tailwind Example 2 -->
        <div class="mx-2 my-4 [&>a]:block [&>a]:py-2 [&>a]:px-3 [&>a]:my-2 [&>a]:bg-[color:var(--color-1)] [&>a]:rounded-lg [&>a]:text-center [&>a:hover]:bg-[color:var(--color-1-active)] [&>a:hover]:text-white">
            <a href="#">Home</a>
            <a href="#">Team</a>
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Log Out</a>
        </div>
    </body>
</html>
```

## Technical FAQ
* Why do you use `QuerySelectorAll()` and not just process the `MutationObserver` results directly?
  * Processing `MutationObserver` results will work well until you begin recieving subtrees (ex: DOM swap, [htmx](https://htmx.org), ajax, jquery) which requires you to walk all subtree child elements to not miss a `<style>`. This can involve re-scanning thousands of repeated elements, and `QuerySelectorAll()` ends up the simplicty and performance winner.
