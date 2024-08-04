using BookStoreApp.Data;
using BookStoreApp.Models;
using BookStoreApp.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookStoreDbContext dbContext;
        public BooksController(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var Books = dbContext.Books.ToList();
            return Ok(Books); // default 200 response
        }

        [HttpPost]
        public IActionResult AddBook(AddBookRequestDTO request)
        {
            var domainModelBook = new Book
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                Author = request.Author,
                Isbn = request.Isbn,
            };

            dbContext.Books.Add(domainModelBook);
            dbContext.SaveChanges();

            return Ok(domainModelBook);
        }

        [HttpPost]
        [Route("{id:guid}")]
        public IActionResult UpdateOneBook(Guid id, AddBookRequestDTO request)
        {
            var Book = dbContext.Books.Find(id);

            Book.Title = request.Title;
            Book.Description = request.Description;
            Book.Author = request.Author;
            Book.Isbn = request.Isbn;

            dbContext.SaveChanges();

            return Ok(Book); // default 200 response

        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetOneBook(Guid id)
        {
            var Book = dbContext.Books.Find(id);
            return Ok(Book); // default 200 response
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteBook(Guid id)
        {
            var Book = dbContext.Books.Find(id);
            if (Book is not null)
            {
                dbContext.Books.Remove(Book);
                dbContext.SaveChanges();
            }
            return Ok(Book);
        }
    }
}
