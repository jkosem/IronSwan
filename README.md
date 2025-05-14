# Iron Swan

![IronSwan](https://github.com/user-attachments/assets/308f8a64-4f34-4af9-bae5-a385dbb2a158)

## About

Iron Swan is an web-book template. It is all flat files which you can modify for your own use and at your own peril. If you want to publish simple to read books for the web that you put on your own server somewhere, this is exactly for you.

Be warned: it's super heavy metal, thus the name. It is good for all sorts of books, not just awesome books about dragons.

## How it works

There is a Markdown directory. You put your chapters in Markdown files there.

There are corresponding chapter HTML files in the root which have to have the same name as the markdown files. These chapter files render the Markdown files of the same names and that's it.

So far, the chapter files need to all be listed in 'config.js' under 'chapters.' Likewise you should edit the author, publicationDate, copyright and license.

There is no static site generating or having to install Python, Ruby, faerie helpers, demonic assistants, etc.

## v1

- Generally working
- Chapter pages render Markdown
- Very mediocre CSS and front-end design
- Awesome logo and cover

## Roadmap

- Way better front-end design
- Won't have to update the config.js files with the chapter names and will list automagically
- More than 2 minutes of testing
- Some sort of interaction thing that makes sense

## Research

This is "design research" by a designer to test different platforms and techniques for AI-assisted coding and make the thing that I can’t seem to find anywhere.

This is amateur and I get that. I'm not a developer unlike these other demo vibe code bros. This is the main thing really. "Vibe coding," for lack of a better word or analogy, is easier for sure, but not "easy" per se to get what you want. However, if you're some dev bro, you know what to say to the robots to get them to do the right things. I don't, so I go back and forth non-stop and half the time it gets it wrong.

I started with debating with Claude 3.7 about how to structure it, and followed some advice which I believe worked about asking it to create a spec for you and then asking what could be done better and honing it till things are simple and it makes sense generally in terms of how it's put together. This seemed to work. What didn't work was what I did before which was pure vibes and typing into the chat thing make me a book format that does this and that. This ran into brick walls every time and I had to start over now three times, partially from lack of planning and putting the PM hat on and also because the LLMs really get stuck on things and many times keep on doing the same thing over and over again.

I started with Cursor and Claude 3.7 I believe. It might be on Claud 20.4 at this point. I have no idea, I can't keep track anymore and the notching up of models by the minute arms race and then putting your amazing opinions online about them feels about the same as writing about bands a decade or two ago and just as winnable.

I switched to Visual Studio Code (VSC) because I thought I had to and I've been using [Ollama](https://ollama.com/) a lot for everything else, so this seemed the way forward. Also, Cursor is a bad UI rip-off of VSC and feels really crowded as an interface. At first I tried to use Cursor with Ollama via [ngrok](https://ngrok.com/) which was painful and increased my anxiety levels by about 1000% because I realised it opens ports up to the Internet, meaning dragons, wolves and all that at my doorstep. [Continue](https://ollama.com/blog/continue-code-assistant) with VSC was pretty good, but very slow. Painfully slow in fact to the point where I thought I could take breaks whilst it was generating things. This was also on [DeepSeek Coder](https://ollama.com/library/deepseek-coder) mind you which is suppose to be able to cure cancer in a couple of minutes. It could not edit CSS in this span of time, but the results were decent.

Then back to Cursor and trying out `cursor-small` and `cursor-fast` LLMs which were actually as good as anything and free.

## Credits

- Logo typeface: [Henriette](michael-hochleitner) (Michael Hochleitner, TypeJockeys)
- Swan model generated with [Anything.world]()
- Anvil actually done myself with Blender Guru's (Andrew Price) [Creating an Anvil](https://www.blenderguru.com/tutorials/2018/1/17/creating-an-anvil-full-series) series

## License

MIT License

Copyright (c) 2025 Jim Kosem
