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
      title: "Chapter 1" // This will be overridden by the H1 in the markdown file
    }
    // Add more chapters as needed
  ],
  storage: {
    lastChapterKey: "webbook_last_chapter",
    expiryDays: 30
  }
};

export default BookConfig; 