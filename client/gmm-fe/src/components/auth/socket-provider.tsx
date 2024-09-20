'use client'

import { constants } from '@/config';
import { addMessage, addPendingMessage, removePendingMessage } from '@/lib/chat/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextProps {
    socket?: Socket;
    sendMessage: (text: string, chatId: string) => void;
}

const SocketContext = React.createContext<SocketContextProps>({
    sendMessage: () => { },
});

export const useSocketContext = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const token = useAppSelector((state) => state.auth.token);
    const socket = io(constants.apiBaseUrl, {
        autoConnect: false,
        extraHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [socket, token]);

    useEffect(() => {
        const onMessageReceived = (message: any) => {
            dispatch(addMessage(message));
            console.log('Message received:', message);
        }

        const onMessageDelivered = (message: any) => {
            dispatch(removePendingMessage(message));
            dispatch(addMessage(message));
            console.log('Message delivered:', message);
        }

        socket.on('message:received', onMessageReceived);
        socket.on('message:delivered', onMessageDelivered);

        return () => {
            socket.off('message:received', onMessageReceived);
            socket.off('message:delivered', onMessageDelivered);
        };
    }, [socket, dispatch]);


    useEffect(() => {
        const onConnect = () => { console.log('Connected to socket server'); }
        const onDisconnect = () => { console.log('Disconnected from socket server'); }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('disconnect', onDisconnect);
            socket.off('connect', onConnect);
        };
    }, [socket]);

    const sendMessage = (text: string, chatId: string) => {
        socket?.emit('message:sent', { roomId: chatId, content: text, contentType: 'text' });
        dispatch(addPendingMessage({ content: text, contentType: 'text' }));
    }

    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
