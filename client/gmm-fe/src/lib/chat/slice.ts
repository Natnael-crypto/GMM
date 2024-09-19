'use client';

import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../schemas/chat';

export interface ChatInitialState {
  messages: Message[];
  pendingMessages: Message[];
}

export const chatInitialState: ChatInitialState = {
  messages: [],
  pendingMessages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },

    addPendingMessage(state, action) {
      state.pendingMessages = [...state.pendingMessages, action.payload];
    },

    removePendingMessage(state, action) {
      state.pendingMessages = state.pendingMessages.filter(
        (message) => message.content !== action.payload.content
      );
    },

    clearMessages(state) {
      state.messages = [];
    },

    clearPendingMessages(state) {
      state.pendingMessages = [];
    },

    clearChat(state) {
      state.messages = [];
      state.pendingMessages = [];
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
