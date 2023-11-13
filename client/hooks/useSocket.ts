import { useEffect, useState } from 'react';
import { io, Socket} from 'socket.io-client';

const useSocket = (url: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        const socketIo = io(url);
    
        socketIo.on('balanceUpdate', (newBalance) => {
          console.log('Nuevo balance:', newBalance);
        });
    
        setSocket(socketIo);
    
        return () => {
          socketIo.disconnect();
        };
      }, []);

      return socket;
}

export default useSocket;
