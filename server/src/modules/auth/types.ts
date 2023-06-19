import { DeleteResult, InsertResult } from "typeorm";
import { User } from "../../entity";

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
}

export type SaveUserResponse = {
  statusCode: number;
  message: string;
};
