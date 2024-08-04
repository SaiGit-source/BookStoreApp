namespace BookStoreApp.Models
{
    public class AddBookRequestDTO
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string Author { get; set; }
        public required string Isbn { get; set; }
    }
}
