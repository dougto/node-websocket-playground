import WebSocket, { WebSocketServer } from 'ws';

const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT as unknown as number || 8080;

export const webSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });

webSocketServer.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('received: %s', data);
  });

  ws.send('Websocket Connection Established');
});

webSocketServer.on('new-move', (data) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
});
