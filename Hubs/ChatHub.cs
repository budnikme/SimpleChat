using Chat.Models;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs;

public class ChatHub:Hub
{
    //ChatHistory object
    private readonly ChatHistory _chatHistory;

    public ChatHub(ChatHistory chatHistory)
    {
        _chatHistory=chatHistory;
    }
    public async Task Send(string user, string message)
    {
        //object with current message
        MessageModel msg = new MessageModel
        {
            Username = user,
            Message = message,
            Time = DateTime.Now.ToString("hh:mm:ss tt")
        };
        //if in List more than 15 messages delete the last message
        if (_chatHistory.Data.Count > 15)
        {
            _chatHistory.Data.RemoveAt(0);
        }
        else
        {
            _chatHistory.Data.Add(msg);
        }
        
        await Clients.All.SendAsync("ReceiveMessage", msg);
    }

    //method for getting history
    public List<MessageModel> GetChatHistory()
    {
        return _chatHistory.Data;
    }
    
}