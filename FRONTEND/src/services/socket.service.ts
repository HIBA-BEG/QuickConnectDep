import { io, Socket } from 'socket.io-client';

class SocketService {
    private static instance: SocketService;
    private socket: Socket | null = null;
    private SOCKET_URL = process.env.REACT_APP_API_URL;
    private isProd = process.env.NODE_ENV === 'production';


    private constructor() {
        this.initSocket();
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    private initSocket() {
        try {

        this.socket = io(this.SOCKET_URL, {
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000,
            withCredentials: true,
            path: '/socket.io',
            autoConnect: true,
            reconnection: true,
            secure: this.isProd,
        });

        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            if (this.socket) {
                this.socket.io.opts.transports = ['polling', 'websocket'];
                }
            });

        console.log(`Connecting to socket at ${this.SOCKET_URL} (${this.isProd ? 'production' : 'development'})`);

        } catch (error) {
            console.error('Socket initialization error:', error);
        }
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public emit(event: string, data: any) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    public on(event: string, callback: (data: any) => void) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    private reconnect() {
        if (this.socket) {
            this.socket.connect();
        } else {
            this.initSocket();
        }
    }
}

export const socketService = SocketService.getInstance();