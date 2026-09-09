# Iron Swan

![IronSwan](https://github.com/user-attachments/assets/308f8a64-4f34-4af9-bae5-a385dbb2a158)

## About

Iron Swan is a web-book template. It is all flat files which you can modify for your own use and at your own peril. If you want to publish simple to read books for the web that you put on your own server somewhere, this is exactly for you. Somehow this didn’t exist which I still have such a hard time believing.

Be warned: it's super heavy metal, thus the name. It is good for all sorts of books, not just awesome books about dragons.

## How it works

There is a Markdown directory. You put your chapters in Markdown files there.

There are corresponding chapter HTML files in the root which have to have the same name as the markdown files. These chapter files render the Markdown files of the same names and that's it. Seriously it’s dead simple and that’s the point.

The chapter HTML files in the root simply load their corresponding Markdown files. You never have to manually edit a `CHAPTER_ID` in the HTML files anymore—the unified script (`js/chapter.js`) automatically detects the chapter number from the filename (e.g., `chapter-01.html` loads `01`) and sets up everything.

To add a new chapter:
1. Create `markdown/chapter-06.md`.
2. Copy any existing `chapter-*.html` file to `chapter-06.html` (no script edits required!).
3. Add the chapter entry to `js/config.js` under `chapters`.

## Themes

Iron Swan supports modular themes using standalone CSS files. They all link to a single entry point: `css/theme.css`. Themes are super important. Probably.

Theme files live in `css/` and follow the `[name]-theme.css` naming convention:

- **`css/ironswan-theme.css`**: The signature Iron Swan dark theme (matches the logo aesthetic)
- **`css/coldforest-theme.css`**: The Cold Forest theme (under development, replacing the old "base" theme)

### How to Switch Themes

Open `css/theme.css` and uncomment the theme you want:

```css
/* ==========================================================================
   Theme Selection
   Uncomment ONE of the lines below to choose the active theme:
   ========================================================================== */
@import url('ironswan-theme.css');
/* @import url('coldforest-theme.css'); */
```

Save the file and refresh your browser. That's it.

*(You can also set `theme: "ironswan"` or `theme: "coldforest"` in `js/config.js` if you like keeping your active theme recorded in your book config).*

### Creating a New Theme

1. Create a new CSS file in `css/`: e.g. `css/mycool-theme.css`.
2. Add your styles (you can use `ironswan-theme.css` or `coldforest-theme.css` as a starter template).
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