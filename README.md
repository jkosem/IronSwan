# Iron Swan

![IronSwan](https://github.com/user-attachments/assets/308f8a64-4f34-4af9-bae5-a385dbb2a158)

## About

Iron Swan is a web-book template. It is all flat files which you can modify for your own use and at your own peril. If you want to publish simple to read books for the web that you put on your own server somewhere, this is exactly for you. Somehow this didn’t exist which I still have such a hard time believing.

It is a simple, easy way to create, design, read and independently publish books on the web. Iron Swan uses flat HTML, CSS, JavaScript and Markdown without a required build step or runtime dependencies.

Be warned: it's super heavy metal, thus the name. It is good for all sorts of books, not just awesome books about dragons.

## Make a book

Copy the Iron Swan files into a separate folder for your book. Open `book.txt`. Put your title, byline and copyright at the top. Below them, give each chapter one line, in reading order. Here's a whole little book:

```text
Title: After the Thaw
Author: J. North
Copyright: © J. North

first-snow.md | First Snow
the-river.md | The River
```

Put the prose in `markdown/first-snow.md` and `markdown/the-river.md`. Start with your first sentence. The reader supplies the chapter heading from the list. Use `##` for sections. Keep filenames simple (letters, numbers, spaces, hyphens or underscores ending in `.md`).

- **Add a chapter.** Save the Markdown file and add its line to the list.
- **Rename a chapter.** Change the words after the bar. Keep the filename so bookmarks still work.
- **Move a chapter.** Move its line. The contents numbers and Previous/Next links follow along.
- **Remove a chapter.** Remove its line. If you want the text taken off the web too, remove the Markdown file from your host.

To publish on Netlify, deploy the whole book folder with `index.html` at its root. The Markdown, book.txt, scripts, styles and images travel together. For an existing v1.1 book, keep your original Markdown and numbered HTML pages. Books without `book.txt` use their existing `js/config.js`; to adopt the new format, list each chapter in `book.txt`. Standard numbered filenames keep their old page addresses. Keep any custom mapping between numbered pages and differently named Markdown files in the legacy configuration.

## Give your book its own look

Open `css/theme.css` and leave one import active. Choose Iron Swan (the default) or Starter Theme. Save and refresh the contents and a chapter.

To customize Starter Theme, open `css/starter-theme.css`. Its first line picks the original theme to build on. The next two settings choose the reading typeface and primary accent. Try a font already on your device. Scroll down a chapter to see the accent in the progress bar. Pick a color you can also read against the background. The reading sizes come from the template.

For the cover, replace `images/cover-image.jpg` with your JPEG. The supplied image is 320 by 519 pixels. Use the same proportions, or update the width and height in `index.html` for a different shape. Your cover follows the book across themes. Existing custom theme files can still be selected in `css/theme.css`.

## Versions

The original working template was called v1 (historical v1.0). The November work landed in [PR #4](https://github.com/jkosem/IronSwan/pull/4). That’s v1.1 - a reliable web book. Its owner checklist is complete and the release tag is pending. Version numbers track user outcomes, not individual technical changes. Check the [changelog](CHANGELOG.md) for release status and the [roadmap](ROADMAP.md) for future versions.

## Security and Markdown support

Markdown is rendered as text-first HTML: raw HTML is escaped, and unsafe URL schemes are rejected. Supported features include headings, paragraphs, emphasis, links, images, blockquotes, horizontal rules, numbered and bulleted lists, and fenced code blocks. This is intentionally a small Markdown subset, not full CommonMark; deeply nested lists and complex inline nesting are not supported.

Each chapter is a separate HTML document. Browsers handle HTTP caching across chapters; the old in-memory prefetch feature was removed because its cache did not survive navigation.

## Tests

Run `node --test tests/*.test.mjs` with a recent Node.js release. No package installation or build step is required.

## Performance

The table of contents reads one small book definition;  chapter pages load their own Markdown. Scroll progress uses a transform with cached page dimensions, refreshed when content changes. Both themes retain their existing CSS entry point. Google Fonts uses swap and only requested styles; the cover retains its dimensions and high fetch priority.

Run the Node regression and performance budget tests with `node --test tests/*.test.mjs`. Budgets apply to gzip-compressed first-party CSS and JavaScript source (10 KiB each per page, excluding fonts and images). Browser targets: Lighthouse mobile performance 95+, LCP under 1.5 s as an aspirational target, CLS below 0.1; measure on the deployed site using cold-cache mobile throttling. These are targets, not measured results. Keep cover images compressed and enable HTTP compression and caching at the host.

## Roadmap and development

See the [user-centred product roadmap](ROADMAP.md) for the release sequence, design principles and acceptance criteria. Each release improves creating, designing, reading or publishing a book. AI handles implementation and technical tests; the owner reviews a browser preview using change-specific GitHub checkboxes in the PR. Release only after explicit owner approval and required passing checks.

The [project memory](IronSwan-Project-Memory.md) records standing constraints, decisions and technical history. The [changelog](CHANGELOG.md) records what changed and why.

## “Development” history

### 26 November 2026 - v1.1 (in progress)

There is now a plan. The idea is to make the book better for the person reading it, writing it or designing it, rather than just accumulating more code. Each version should do something useful, and the designer should be able to test it in a browser. The robots can do the technical testing.

Still flat files. Still no required build step. Still good for books that aren't about dragons.

The original writing, including the rather circuitous journey through AI coding tools, is preserved in the dated snapshots below.

## Credits

- Logo typeface: [Henriette](https://www.typejockeys.com/fonts/henriette) (Michael Hochleitner, TypeJockeys)
- Swan model generated with [Anything.world](https://anything.world/)
- Anvil actually done by myself with Blender Guru's (Andrew Price) [Creating an Anvil](https://www.blenderguru.com/tutorials/2018/1/17/creating-an-anvil-full-series) series

## License

MIT License

Copyright (c) 2025 Jim Kosem

## README archive - what it was like at the time

### Before v1.4 - themes

<details><summary>Previous theme instructions</summary>

## Themes

Iron Swan supports modular themes using standalone CSS files. They all link to a single entry point: `css/theme.css`. Themes are super important. Probably.

Theme files live in `css/` and follow the `[name]-theme.css` naming convention:

- **`css/ironswan-theme.css`**: The signature Iron Swan dark theme (matches the logo aesthetic)
- **`css/starter-theme.css`**: Starter Theme

### How to Switch Themes

Open `css/theme.css` and uncomment the theme you want:

```css
/* ==========================================================================
   Theme Selection
   Uncomment ONE of the lines below to choose the active theme:
   ========================================================================== */
@import url('ironswan-theme.css');
/* @import url('starter-theme.css'); */
```

Save the file and refresh your browser. That's it.

*(You can also set `theme: "ironswan"` or `theme: "starter"` in `js/config.js` if you like keeping your active theme recorded in your book config).*

### Creating a New Theme

1. Create a new CSS file in `css/`: e.g. `css/mycool-theme.css`.
2. Add your styles (you can use `ironswan-theme.css` or `starter-theme.css` as a starter template).
3. Add an `@import` line for it in `css/theme.css`:

   ```css
   @import url('mycool-theme.css');
   ```

</details>

### 26 November 2026 - adding chapters in v1.1

<details>
<summary>Previous authoring instructions</summary>

## How it works

There is a Markdown directory. You put your chapters in Markdown files there. That's sort of it.

There are corresponding chapter HTML files in the root which have to have the same name as the markdown files. These chapter files render the Markdown files of the same names and that's it. Seriously it’s dead simple and that’s the point.

The chapter HTML files in the root simply load their corresponding Markdown files. You never have to manually edit a `CHAPTER_ID` in the HTML files anymore-the unified script (`js/chapter.js`) automatically detects the chapter number from the filename (e.g., `chapter-01.html` loads `01`) and sets up everything.

To add a new chapter:
1. Create `markdown/chapter-06.md`.
2. Copy any existing `chapter-*.html` file to `chapter-06.html` (no script edits required!).
3. Add the chapter entry to `js/config.js` under `chapters`. The configured title appears in the table of contents immediately, without downloading the Markdown; keep it in sync with the chapter heading.

</details>


These are historical snapshots, not current setup instructions. Archived theme names have been updated to the current template names. Dates identify the repository snapshots, not necessarily when each sentence was first written.

### 26 November 2026 - before the new roadmap (v1.1 development)

<details>
<summary>Read the previous README in full</summary>

# Iron Swan

![IronSwan](https://github.com/user-attachments/assets/308f8a64-4f34-4af9-bae5-a385dbb2a158)

## About

Iron Swan is a web-book template. It is all flat files which you can modify for your own use and at your own peril. If you want to publish simple to read books for the web that you put on your own server somewhere, this is exactly for you. Somehow this didn’t exist which I still have such a hard time believing.

Be warned: it's super heavy metal, thus the name. It is good for all sorts of books, not just awesome books about dragons.

## How it works

There is a Markdown directory. You put your chapters in Markdown files there.

There are corresponding chapter HTML files in the root which have to have the same name as the markdown files. These chapter files render the Markdown files of the same names and that's it. Seriously it’s dead simple and that’s the point.

The chapter HTML files in the root simply load their corresponding Markdown files. You never have to manually edit a `CHAPTER_ID` in the HTML files anymore-the unified script (`js/chapter.js`) automatically detects the chapter number from the filename (e.g., `chapter-01.html` loads `01`) and sets up everything.

To add a new chapter:
1. Create `markdown/chapter-06.md`.
2. Copy any existing `chapter-*.html` file to `chapter-06.html` (no script edits required!).
3. Add the chapter entry to `js/config.js` under `chapters`. The configured title appears in the table of contents immediately, without downloading the Markdown; keep it in sync with the chapter heading.

## Themes

Iron Swan supports modular themes using standalone CSS files. They all link to a single entry point: `css/theme.css`. Themes are super important. Probably.

Theme files live in `css/` and follow the `[name]-theme.css` naming convention:

- **`css/ironswan-theme.css`**: The signature Iron Swan dark theme (matches the logo aesthetic)
- **`css/starter-theme.css`**: Starter Theme

### How to Switch Themes

Open `css/theme.css` and uncomment the theme you want:

```css
/* ==========================================================================
   Theme Selection
   Uncomment ONE of the lines below to choose the active theme:
   ========================================================================== */
@import url('ironswan-theme.css');
/* @import url('starter-theme.css'); */
```

Save the file and refresh your browser. That's it.

*(You can also set `theme: "ironswan"` or `theme: "starter"` in `js/config.js` if you like keeping your active theme recorded in your book config).*

### Creating a New Theme

1. Create a new CSS file in `css/`: e.g. `css/mycool-theme.css`.
2. Add your styles (you can use `ironswan-theme.css` or `starter-theme.css` as a starter template).
3. Add an `@import` line for it in `css/theme.css`:

   ```css
   @import url('mycool-theme.css');
   ```

## v1

- Generally working
- Chapter pages render Markdown
- Very mediocre at best front-end design
- Awesome logo and cover

## Security and Markdown support

Markdown is rendered as text-first HTML: raw HTML is escaped, and unsafe URL schemes are rejected. Supported features include headings, paragraphs, emphasis, links, images, blockquotes, horizontal rules, numbered and bulleted lists, and fenced code blocks. This is intentionally a small Markdown subset, not full CommonMark; deeply nested lists and complex inline nesting are not supported.

Each chapter is a separate HTML document. Browsers handle HTTP caching across chapters; the old in-memory prefetch feature was removed because its cache did not survive navigation.

## Tests

Run `node --test tests/*.test.mjs` with a recent Node.js release. No package installation or build step is required.

## Performance

The table of contents uses configuration only; chapter pages load their own Markdown. Scroll progress uses a transform with cached page dimensions, refreshed when content changes. Both themes retain their existing CSS entry point. Google Fonts uses swap and only requested styles; the cover retains its dimensions and high fetch priority.

Run the Node regression and performance budget tests with `node --test tests/*.test.mjs`. Budgets apply to gzip-compressed first-party CSS and JavaScript source (10 KiB each per page, excluding fonts and images). Browser targets: Lighthouse mobile performance 95+, LCP under 1.5 s as an aspirational target, CLS below 0.1; measure on the deployed site using cold-cache mobile throttling. These are targets, not measured results. Keep cover images compressed and enable HTTP compression and caching at the host.

## Roadmap

- Won't have to update the config.js files with the chapter names and will list automagically so about a minute less of typing
- [x] Automatically detect chapter IDs from filenames
- [x] Add baseline automated Markdown regression tests
- [ ] Expand tests to cover browser navigation, accessibility, and CSS
- Some sort of interaction method that makes makes reading actually better in a browser
- Way better front-end that is actually designed. Maybe.

## “Development” History

This is "design research" by a designer to test different platforms and techniques for AI-assisted coding and make the thing that I can’t seem to find anywhere.

This is amateur and I get that. I'm not a developer unlike these other demo vibe code bros. This is the main thing really. "Vibe coding," for lack of a better word or analogy, is easier for sure, but not "easy" per se to get what you want. However, if you're some dev bro, you know what to say to the robots to get them to do the right things. I don't, so I go back and forth non-stop and half the time it gets it wrong.

I started with debating with Claude 3.7 about how to structure it, and followed some advice which I believe worked about asking it to create a spec for you and then asking what could be done better and honing it till things are simple and it makes sense generally in terms of how it's put together. This seemed to work. What didn't work was what I did before which was pure vibes and typing into the chat thing make me a book format that does this and that. This ran into brick walls every time and I had to start over now three times, partially from lack of planning and putting the PM hat on and also because the LLMs really get stuck on things and many times keep on doing the same thing over and over again.

I can't keep track anymore of how many different models I’ve used on this thing. The notching up of models by the minute arms race and then putting your amazing opinions online about them feels about the same as writing about bands a decade or two ago and just as winnable.

I switched to Visual Studio Code (VSC) because I thought I had to and I've been using [Ollama](https://ollama.com/) a lot for everything else, so this seemed the way forward. Also, Cursor is harder to read VSC and feels really crowded as an interface. At first I tried to use Cursor with Ollama via [ngrok](https://ngrok.com/) which was painful and increased my anxiety levels by about 1000% because I realised it opens ports up to the Internet, meaning dragons, wolves and all that at my doorstep. [Continue](https://ollama.com/blog/continue-code-assistant) with VSC was pretty good, but very slow. Painfully slow in fact to the point where I thought I could take breaks whilst it was generating things. This was also on [DeepSeek Coder](https://ollama.com/library/deepseek-coder) mind you which is supposed to be able to cure cancer in a couple of minutes. It could not edit CSS in this span of time, but the results were decent. Then back to Cursor and trying out `cursor-small` and `cursor-fast` LLMs which were actually as good as anything and free. Then on to Gemini/Antigravity because we were already paying for it because Notebook LM got my kid through history class.

## Credits

- Logo typeface: [Henriette](https://www.typejockeys.com/fonts/henriette) (Michael Hochleitner, TypeJockeys)
- Swan model generated with [Anything.world](https://anything.world/)
- Anvil actually done by myself with Blender Guru's (Andrew Price) [Creating an Anvil](https://www.blenderguru.com/tutorials/2018/1/17/creating-an-anvil-full-series) series

## License

MIT License

Copyright (c) 2025 Jim Kosem

</details>

### 20 October 2026 - v1 (before the November work)

<details>
<summary>Read the original v1 README in full</summary>

# Iron Swan

![IronSwan](https://github.com/user-attachments/assets/308f8a64-4f34-4af9-bae5-a385dbb2a158)

## About

Iron Swan is a web-book template. It is all flat files which you can modify for your own use and at your own peril. If you want to publish simple to read books for the web that you put on your own server somewhere, this is exactly for you. Somehow this didn’t exist which I still have such a hard time believing.

Be warned: it's super heavy metal, thus the name. It is good for all sorts of books, not just awesome books about dragons.

## How it works

There is a Markdown directory. You put your chapters in Markdown files there.

There are corresponding chapter HTML files in the root which have to have the same name as the markdown files. These chapter files render the Markdown files of the same names and that's it. Seriously it’s dead simple and that’s the point.

The chapter HTML files in the root simply load their corresponding Markdown files. You never have to manually edit a `CHAPTER_ID` in the HTML files anymore-the unified script (`js/chapter.js`) automatically detects the chapter number from the filename (e.g., `chapter-01.html` loads `01`) and sets up everything.

To add a new chapter:
1. Create `markdown/chapter-06.md`.
2. Copy any existing `chapter-*.html` file to `chapter-06.html` (no script edits required!).
3. Add the chapter entry to `js/config.js` under `chapters`.

## Themes

Iron Swan supports modular themes using standalone CSS files. They all link to a single entry point: `css/theme.css`. Themes are super important. Probably.

Theme files live in `css/` and follow the `[name]-theme.css` naming convention:

- **`css/ironswan-theme.css`**: The signature Iron Swan dark theme (matches the logo aesthetic)
- **`css/starter-theme.css`**: Starter Theme

### How to Switch Themes

Open `css/theme.css` and uncomment the theme you want:

```css
/* ==========================================================================
   Theme Selection
   Uncomment ONE of the lines below to choose the active theme:
   ========================================================================== */
@import url('ironswan-theme.css');
/* @import url('starter-theme.css'); */
```

Save the file and refresh your browser. That's it.

*(You can also set `theme: "ironswan"` or `theme: "starter"` in `js/config.js` if you like keeping your active theme recorded in your book config).*

### Creating a New Theme

1. Create a new CSS file in `css/`: e.g. `css/mycool-theme.css`.
2. Add your styles (you can use `ironswan-theme.css` or `starter-theme.css` as a starter template).
3. Add an `@import` line for it in `css/theme.css`:

   ```css
   @import url('mycool-theme.css');
   ```

## v1

- Generally working
- Chapter pages render Markdown
- Very mediocre at best front-end design
- Awesome logo and cover

## Roadmap

- Won't have to update the config.js files with the chapter names and will list automagically so about a minute less of typing
- Won't have to update the CHAPTER_ID manually in each chapter file
- More than 2 minutes of testing
- Some sort of interaction method that makes makes reading actually better in a browser
- Way better front-end that is actually designed. Maybe.

## “Development” History

This is "design research" by a designer to test different platforms and techniques for AI-assisted coding and make the thing that I can’t seem to find anywhere.

This is amateur and I get that. I'm not a developer unlike these other demo vibe code bros. This is the main thing really. "Vibe coding," for lack of a better word or analogy, is easier for sure, but not "easy" per se to get what you want. However, if you're some dev bro, you know what to say to the robots to get them to do the right things. I don't, so I go back and forth non-stop and half the time it gets it wrong.

I started with debating with Claude 3.7 about how to structure it, and followed some advice which I believe worked about asking it to create a spec for you and then asking what could be done better and honing it till things are simple and it makes sense generally in terms of how it's put together. This seemed to work. What didn't work was what I did before which was pure vibes and typing into the chat thing make me a book format that does this and that. This ran into brick walls every time and I had to start over now three times, partially from lack of planning and putting the PM hat on and also because the LLMs really get stuck on things and many times keep on doing the same thing over and over again.

I can't keep track anymore of how many different models I’ve used on this thing. The notching up of models by the minute arms race and then putting your amazing opinions online about them feels about the same as writing about bands a decade or two ago and just as winnable.

I switched to Visual Studio Code (VSC) because I thought I had to and I've been using [Ollama](https://ollama.com/) a lot for everything else, so this seemed the way forward. Also, Cursor is harder to read VSC and feels really crowded as an interface. At first I tried to use Cursor with Ollama via [ngrok](https://ngrok.com/) which was painful and increased my anxiety levels by about 1000% because I realised it opens ports up to the Internet, meaning dragons, wolves and all that at my doorstep. [Continue](https://ollama.com/blog/continue-code-assistant) with VSC was pretty good, but very slow. Painfully slow in fact to the point where I thought I could take breaks whilst it was generating things. This was also on [DeepSeek Coder](https://ollama.com/library/deepseek-coder) mind you which is supposed to be able to cure cancer in a couple of minutes. It could not edit CSS in this span of time, but the results were decent. Then back to Cursor and trying out `cursor-small` and `cursor-fast` LLMs which were actually as good as anything and free. Then on to Gemini/Antigravity because we were already paying for it because Notebook LM got my kid through history class.

## Credits

- Logo typeface: [Henriette](https://www.typejockeys.com/fonts/henriette) (Michael Hochleitner, TypeJockeys)
- Swan model generated with [Anything.world](https://anything.world/)
- Anvil actually done by myself with Blender Guru's (Andrew Price) [Creating an Anvil](https://www.blenderguru.com/tutorials/2018/1/17/creating-an-anvil-full-series) series

## License

MIT License

Copyright (c) 2025 Jim Kosem

</details>
