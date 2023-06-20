import { DeleteResult, InsertResult } from "typeorm";
import { Book, User, UserRepositoryContract } from "../../entity";
import { AuthServiceContract } from "./types";

export class AuthService implements AuthServiceContract {
  private userRepository: UserRepositoryContract;

  constructor(userRepository: UserRepositoryContract) {
    this.userRepository = userRepository;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Promise<InsertResult> {
    return this.userRepository.saveUser(
      firstName,
      lastName,
      email,
      username,
      password
    );
  }

  updateUser(User: User): Promise<User> {
    return this.userRepository.updateUser(User);
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.userRepository.deleteUser(id);
  }

  getUsersFollowing(id: string): Promise<User[]> {
    return this.userRepository.getUsersFollowing(id);
  }

  getUserByFollower(id: string): Promise<User | null> {
    return this.userRepository.getUserByFollower(id);
  }

  getUsersFriendsReviews(id: string): Promise<User[]> {
    return this.userRepository.getUsersFriendsReviews(id);
  }

  getReviewByUserId(id: string): Promise<User | null> {
    return this.userRepository.getReviewByUserId(id);
  }

  unfollowUser(userToUnfollow: User, currentUser: User): Promise<User> {
    return this.userRepository.unfollowUser(userToUnfollow, currentUser);
  }

  addGoal(user: User, goal: number): Promise<User> {
    return this.userRepository.addGoal(user, goal);
  }

  addCurrentRead(user: User, book: Book): Promise<User> {
    return this.userRepository.addCurrentRead(user, book);
  }

  deleteCurrentRead(user: User): Promise<User> {
    return this.userRepository.deleteCurrentRead(user);
  }

  updateReadBooksCount(user: User, progress: number): Promise<User> {
    return this.userRepository.updateReadBooksCount(user, progress);
  }

  updateProgress(user: User, progress: number): Promise<User> {
    return this.userRepository.updateProgress(user, progress);
  }
}
