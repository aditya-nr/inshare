export type messageObject = {
  _id: string;
  from: string;
  type: string;
  message?: string;
  s3_key?: string;
  filename?: string;
  size?: string;
  state?: string;
};

export type createRoomDataObject = {
  name: string;
  password?: string;
  timeOut: string;
  maxCandidate: string;
};
export type joinRoomDataObject = {
  name: string;
  roomId: string;
  password?: string;
};

export type AppState = {
  roomId: string;
  name: string;
  timeOut: number;
};

export type Action = {
  type: "UPDATE_ROOM";
  roomId: string;
  timeOut: number;
  name: string;
};

export type ContextProps = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  socket?: any;
};

export type HeaderProp = {
  roomId: string;
  socket: any;
  timeOut: number;
  onTimeOut: any;
};

export type FooterProp = {
  handleFile: any;
  text: string;
  setText: any;
  handleSend: any;
};
