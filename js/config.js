const BookConfig = {
  title: "Iron Swan",
  author: "Halfman",
  publicationDate: "2025",
  copyright: "© 2024 Jim Kosem",
  license: "MIT License",
  chapters: [
    {
      id: "01",
      file: "chapter-01.md",
      title: "Introduction"
    },
    {
      id: "02",
      file: "chapter-02.md",
      title: "Character Development"
    },
    {
      id: "03",
      file: "chapter-03.md",
      title: "World Building"
    },
    {
      id: "04",
      file: "chapter-04.md",
      title: "Plot Structure"
    },
    {
      id: "05",
      file: "chapter-05.md",
      title: "The Last Chapter"
    }
  ],
  storage: {
    lastChapterKey: "webbook_last_chapter",
    expiryDays: 30
  }
};

export default BookConfig; 