export type UIDialogs = "addContact";

export type UINavs = "contactInfo";

export type UIChat = "recordingAudio";

export type UIState = {
  dialogs: Record<UIDialogs, boolean>;
  navs: Record<UINavs, boolean>;
  chat: Record<UIChat, boolean>;
};
