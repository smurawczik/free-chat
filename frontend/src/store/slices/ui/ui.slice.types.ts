export type UIDialogs = "addContact";

export type UINavs = "contactInfo";

export type UIState = {
  dialogs: Record<UIDialogs, boolean>;
  navs: Record<UINavs, boolean>;
};
