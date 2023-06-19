import { DeleteResult, InsertResult } from "typeorm";
import { User } from "../../entity";
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
}
