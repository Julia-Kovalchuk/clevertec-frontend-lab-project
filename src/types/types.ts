export interface ICategory {
  name: string;
  path: string;
  id: number;
}

export interface IBookingInfo {
  id: number;
  order: boolean;
  dateOrder: string | null;
  customerId: number | null;
  customerFirstName: string | null;
  customerLastName: string | null;
}

export interface IHistoryInfo {
  id: number;
  userId: number;
}

export interface IBookImage {
  url: string | null;
}

export interface IUser {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface IComment {
  id: string;
  rating: number;
  text: string | null;
  createdAt: string;
  user: IUser;
}

export interface IDelivery {
  id: number;
  handed: boolean;
  dateHandedFrom: string | null;
  dateHandedTo: string;
  recipientId: number | null;
  recipientFirstName: string | null;
  recipientLastName: string | null;
}

export interface IBookShortInfo {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  image: IBookImage;
  categories: string[] | null;
  id: number;
  booking: null | IBookingInfo;
  delivery: null | IDelivery;
  histories: null | IHistoryInfo[];
}

export interface IBookInfo {
  id: number;
  title: string;
  rating: null | number;
  issueYear: string | null;
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  authors: string[] | null;
  images: IBookImage[];
  categories: string[];
  comments: null | IComment[];
  booking: null | IBookingInfo;
  delivery: null | IDelivery;
  histories: null | IHistoryInfo[];
}

export type SortType = "down" | "up";

export interface ICategoryAmount {
  [key: string]: number;
}

export type SignUpValues = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type SignInValues = {
  identifier: string;
  password: string;
};

export type ForgotPasswordValues = {
  email: string;
};

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IRegisterResponse {
  jwt: string;
  user: IUserResponse;
}

export interface IRegisterError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}

export interface IAuthResponse {
  jwt: string;
  user: IUserResponse;
}

export interface IForgotPasswordResponse {
  ok: boolean;
}

export interface IResetPasswordValues {
  password: string;
  passwordConfirmation: string;
  code: string | null;
}

export interface IResetPasswordResponse {
  jwt: string;
  user: IUserResponse;
}

export interface IBookingValues {
  data: {
    order: boolean;
    dateOrder: string;
    book: string;
    customer: string | null;
  };
}

export interface IBookingResponse {
  id: number;
  attributes: {
    order: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    dateOrder: string;
  };
}

export interface IDeleteBookingResponse {
  id: number;
  attributes: {
    order: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    dateOrder: string;
  };
}

export interface IReviewValues {
  data: {
    rating: number;
    text: string;
    book: string;
    user: string;
  };
}

export interface IReviewResponse {
  id: number;
  attributes: {
    rating: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface IEditBookingValues {
  data: {
    order: boolean;
    dateOrder: string;
    book: string;
    customer: string;
  };
}

export interface IEditBookingResponse {
  id: number;
  attributes: {
    order: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    dateOrder: string;
  };
}

export interface IEditBookingData {
  bookingId: number;
  fetchData: IEditBookingValues;
}

export interface ICommentInfo {
  id: number;
  rating: number;
  text: string | null;
  bookId: number;
}

export interface IUserBook {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  authors: string[];
  image: null | string;
}

export interface IUserInfo {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
  comments: ICommentInfo[];
  avatar: string;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string;
    book: IUserBook;
  };
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    book: IUserBook;
  };
  history: {
    id: number;
    books: IUserBook[];
  };
}
