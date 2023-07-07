import { DeleteResult, InsertResult } from "typeorm";
import { Book, User } from "../../entity";
import {
  AuthControllerContract,
  AuthServiceContract,
  SaveUserResponse,
} from "./types";

export class AuthController implements AuthControllerContract {
  private authService: AuthServiceContract;

  constructor(authService: AuthServiceContract) {
    this.authService = authService;
  }

  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  getUserById(id: string): Promise<User> {
    return this.authService.getUserById(id);
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.authService.getUserByEmail(email);
  }

  getUsersFollowing(id: string): Promise<User[]> {
    return this.authService.getUsersFollowing(id);
  }

  getUserByFollower(id: string): Promise<User | null> {
    return this.authService.getUserByFollower(id);
  }

  getUsersFriendsReviews(id: string): Promise<User[]> {
    return this.authService.getUsersFriendsReviews(id);
  }

  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Promise<SaveUserResponse> {
    this.authService.saveUser(firstName, lastName, email, username, password);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  updateUser(User: User): Promise<SaveUserResponse> {
    this.authService.updateUser(User);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.authService.deleteUser(id);
  }

  getReviewByUserId(id: string): Promise<User | null> {
    return this.authService.getReviewByUserId(id);
  }

  unfollowUser(
    userToUnfollow: User,
    currentUser: User
  ): Promise<SaveUserResponse> {
    this.authService.unfollowUser(userToUnfollow, currentUser);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  addGoal(user: User, goal: number): Promise<SaveUserResponse> {
    this.authService.addGoal(user, goal);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  addCurrentRead(user: User, book: Book): Promise<SaveUserResponse> {
    this.authService.addCurrentRead(user, book);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  deleteCurrentRead(user: User): Promise<SaveUserResponse> {
    this.authService.deleteCurrentRead(user);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  updateReadBooksCount(
    user: User,
    progress: number
  ): Promise<SaveUserResponse> {
    this.authService.updateReadBooksCount(user, progress);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  updateProgress(user: User, progress: number): Promise<SaveUserResponse> {
    this.authService.updateProgress(user, progress);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }

  getUserByUsername(username: string): Promise<User | null> {
    return this.authService.getUserByUsername(username);
  }

  getCurrentRead(id: string): Promise<User | null> {
    return this.authService.getCurrentRead(id);
  }

  addProfilePic(user: User, picture: string): Promise<SaveUserResponse> {
    this.authService.addProfilePic(user, picture);
    return new Promise<SaveUserResponse>((resolve, reject) => {
      resolve({
        statusCode: 200,
        message: "success",
      });
    });
  }
}
