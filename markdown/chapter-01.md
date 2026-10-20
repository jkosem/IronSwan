# Introduction

Welcome to the digital book. For centuries, the codex—bound paper between two stiff boards—held an unchallenged monopoly over long-form prose. It was portable, durable, and required no battery. Yet as the screen swallowed our letters, newspapers, and conversations, long-form literature found itself adrift between two awkward extremes: the closed walled gardens of proprietary e-reader formats and the chaotic, hyperlinked frenzy of standard web pages.

Iron Swan began as an exploration into a quiet middle path. It asks a simple question: what happens when we treat a collection of plain Markdown documents as a book, using only standard web technologies, hosted on your own server, completely free of corporate platforms, tracking pixels, and bloated JavaScript bundles?

## The Philosophy of the Web Book

Publishing on the modern web has become needlessly complicated. Content management systems require continuous database migrations, complex build pipelines, and fragile dependency trees. If you return to a static project after three years, half the toolchain has been deprecated, and the simple act of reading has become buried beneath cookie banners, newsletter overlays, and automated analytics.

A web book should be as permanent and self-sufficient as the text it contains. When you write in Markdown, you are using the closest modern equivalent to archival ink. Markdown is readable by humans in raw form and easily parsed by machines without proprietary software. By pairing plain Markdown with minimalist HTML and CSS, you ensure that your prose remains accessible decades from now.

> A book on the web does not need to mimic the physics of paper; it needs to honor the psychology of reading. Immersion requires silence, rhythm, and predictability.

Extended reading demands focus. When a reader opens a chapter, the interface should immediately step into the background. The typography must carry the weight of the experience, offering comfortable line lengths, generous leading, and clear hierarchy without visual noise.

## Anatomy of the Reading Experience

Extended reading in a browser presents unique ergonomics. Unlike a physical book, where the weight of remaining pages provides tactile feedback, digital reading can leave the audience feeling disoriented. A reader wants to know where they stand: how long this section will take, how far they have traveled, and what awaits them around the bend.

### The Measure and Rhythm

The ideal reading column—often referred to as the measure—should comfortably accommodate sixty to seventy-five characters per line. If the line is too long, the reader's eye struggles to track back to the start of the next line; if too short, the rhythm becomes jerky and disjointed. 

Iron Swan employs a thirty-eight rem measure, grounding the reading experience in classical book design traditions while remaining fluid across mobile viewports. The typography relies on high-quality editorial serif type for the prose, paired with utilitarian monospace accents for metadata, chapter numbering, and navigation controls.

### Temporal Awareness

Digital readers experience time differently than print readers. When embarking on an essay or chapter, knowing the estimated reading duration allows someone to decide whether to savor the piece now or return when they have uninterrupted focus. 

- **Upfront Estimation:** Calculating reading time based on an average rate of 220 words per minute sets clear expectations before the first sentence is read.
- **Scroll Tracking:** A subtle, non-intrusive progress line along the edge of the viewport provides continuous visual feedback without drawing the eye away from the prose.
- **Natural Pacing:** Dividing ideas into logical subheadings and reflective blockquotes offers natural resting points throughout the narrative.

## Crafting Your Own Book

This template is intentionally minimal and hackable. It makes no assumptions about your backend, build system, or hosting provider. You can host it on GitHub Pages, upload it via FTP to an Apache server, or run it locally from a simple folder.

To create your own book, your workflow remains focused entirely on writing:

1. Draft your chapters as plain text files in the `markdown/` directory.
2. Structure your work using standard heading levels and semantic markup.
3. Configure your book title, author attribution, and chapter ordering in a single configuration file.
4. Customize your visual aesthetic using modular CSS themes, from stark void palettes to earthy editorial tones.

The chapters that follow explore the craft of long-form writing—from breathing life into characters and constructing believable worlds, to orchestrating dramatic tension and landing a memorable conclusion. Whether you are assembling a technical manual, a fantasy epic, or a personal memoir, the platform is designed to let your words speak for themselves.