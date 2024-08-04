namespace BookStoreApp.Models.Domain
{
    public class Book
    {
        public Guid Id { get; set; }

        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string Author { get; set; }
        public required string Isbn { get; set; }

    }
}
