import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})

export class BalanceGateway {
    @WebSocketServer()
    server: Server;

    sendBalanceUpdate(client: Socket, balance: number) {
        client.emit('balanceUpdate', balance);
    }
}