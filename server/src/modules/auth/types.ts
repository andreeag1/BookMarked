import { DeleteResult, InsertResult } from "typeorm";
import { Book, User } from "../../entity";

export interface AuthControllerContract {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Promise<SaveUserResponse>;
  updateUser(User: User): Promise<SaveUserResponse>;
  deleteUser(id: string): Promise<DeleteResult>;
  getUsersFollowing(id: string): Promise<User[]>;
  getUserByFollower(id: string): Promise<User | null>;
  getUsersFriendsReviews(id: string): Promise<User[]>;
  getReviewByUserId(id: string): Promise<User | null>;
  unfollowUser(
    userToUnfollow: User,
    currentUser: User
  ): Promise<SaveUserResponse>;
  addGoal(user: User, goal: number): Promise<SaveUserResponse>;
  addCurrentRead(user: User, book: Book): Promise<SaveUserResponse>;
  deleteCurrentRead(user: User): Promise<SaveUserResponse>;
  updateReadBooksCount(user: User, progress: number): Promise<SaveUserResponse>;
  updateProgress(user: User, progress: number): Promise<SaveUserResponse>;
  getUserByUsername(username: string): Promise<User | null>;
  getCurrentRead(id: string): Promise<User | null>;
  addProfilePic(user: User, picture: string): Promise<SaveUserResponse>;
}

export interface AuthServiceContract {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Promise<InsertResult>;
  updateUser(User: User): Promise<User>;
  deleteUser(id: string): Promise<DeleteResult>;
  getUsersFollowing(id: string): Promise<User[]>;
  getUserByFollower(id: string): Promise<User | null>;
  getUsersFriendsReviews(id: string): Promise<User[]>;
  getReviewByUserId(id: string): Promise<User | null>;
  unfollowUser(userToUnfollow: User, currentUser: User): Promise<User>;
  addGoal(user: User, goal: number): Promise<User>;
  addCurrentRead(user: User, book: Book): Promise<User>;
  deleteCurrentRead(user: User): Promise<User>;
  updateReadBooksCount(user: User, progress: number): Promise<User>;
  updateProgress(user: User, progress: number): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getCurrentRead(id: string): Promise<User | null>;
  addProfilePic(user: User, picture: string): Promise<User>;
}

export interface TokenContent {
  id: string;
}

export type SaveUserResponse = {
  statusCode: number;
  message: string;
};
