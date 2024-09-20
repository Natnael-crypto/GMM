'use client';

import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../schemas/chat';

export interface MessageWithSequence extends Message {
  sequence: string;
}

export interface ChatInitialState {
  messages: MessageWithSequence[];
  pendingMessagesSequence: string[];
}

export const chatInitialState: ChatInitialState = {
  messages: [],
  pendingMessagesSequence: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },

    addPendingMessage(state, action) {
      state.pendingMessagesSequence = [
        ...state.pendingMessagesSequence,
        action.payload,
      ];
    },

    removePendingMessage(state, action) {
      state.pendingMessagesSequence = state.pendingMessagesSequence.filter(
        (seq) => seq !== action.payload
      );
    },

    clearMessages(state) {
      state.messages = [];
    },

    clearPendingMessages(state) {
      state.pendingMessagesSequence = [];
    },

    clearChat(state) {
      state.messages = [];
      state.pendingMessagesSequence = [];
    },
  },
});

export const {
  addMessage,
  addPendingMessage,
  removePendingMessage,
  clearChat,
  clearPendingMessages,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
