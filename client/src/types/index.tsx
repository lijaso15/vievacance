export interface Viewer {
  viewer: boolean | string;
}

export type Photos = Array<{
  title: string;
  subtitle: string;
  image: string;
}>;

export type MementosData = Array<{
  owner: string;
  photos: Photos;
  city: string;
  country: string;
  description: string;
  active: boolean;
  profilePicture: string;
  username: string;
  _id: string;
  slideNumber: string;
  likes: string[];
}>;

export interface MementosProps {
  data: MementosData;
  updateData(data: MementosData, label: string): any;
  viewer: Viewer;
  fullAccess: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  value: string | undefined;
}

export interface MementoProps {
  owner: string;
  photos: Photos;
  title: string;
  description: string;
  active: boolean;
  onClick(): any;
  isEditing: boolean;
  isDeleting: boolean;
  fullAccess: boolean;
  value: string | undefined;
  profilePicture: string;
  username: string;
  _id: string;
  slideNumber: number;
  likes: string[];
}

export interface LikeProps {
  active: boolean;
  likes: string[];
  viewer: Viewer;
  messageIsActive: boolean;
  showMessage(): any;
  toggleActive(): any;
  _id: string;
}

export interface MessageProps {
  viewer: Viewer;
  message: string[];
}

export interface LikeState {
  likes: string[];
}
