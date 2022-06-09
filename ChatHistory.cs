using Chat.Models;

namespace Chat;

public class ChatHistory
{
    public List<MessageModel> Data { get; set; } = new();
}