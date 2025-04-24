const BookConfig = {
  title: "Book Title",
  author: "Author Name",
  publicationDate: "2024",
  copyright: "© 2024 Author Name",
  license: "All rights reserved",
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
    }
  ],
  storage: {
    lastChapterKey: "webbook_last_chapter",
    expiryDays: 30
  }
};

export default BookConfig; 