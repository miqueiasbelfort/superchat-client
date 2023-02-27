import React, {createContext} from 'react'
import { messageListI } from '../interfaces/interfaces'

interface messageI {
    sendMessage: () => Promise<void>,
    joinRoom: (room: string) => void,
    username: string,
    room: string,
    createUsername: (name: string) => void,
    getEmoji: (emoji: string) => void,
    showEmoji: boolean,
    setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>,
    messageList: messageListI[],
    currentMessage: string,
    setCurrentMessage: React.Dispatch<React.SetStateAction<string>>,
    setMessageList: React.Dispatch<React.SetStateAction<messageListI[]>>
}

export const Context = createContext<messageI | null>(null)