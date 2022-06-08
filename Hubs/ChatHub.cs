using Microsoft.AspNetCore.SignalR;

namespace Chat.Hubs;

public class ChatHub:Hub
{
    public async Task Send(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message, DateTime.Now.ToString("hh:mm:ss tt"));
    }
}