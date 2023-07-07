import { DeleteResult, InsertResult, Repository } from "typeorm";
import { User } from "./User";
import { AppDataSource } from "../../lib/database";
import bcryptjs from "bcryptjs";
import { Review } from "../Review";
import { Book } from "../Book/Book";

export interface UserRepositoryContract {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
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
  getCurrentRead(id: string): Promise<User | null>;
  addProfilePic(user: User, picture: string): Promise<User>;
}

export class UserRepository implements UserRepositoryContract {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.repository.findOneOrFail({
      relations: {
        followers: true,
      },
      where: {
        id: id,
      },
    });
  }

  getUserByFollower(id: string): Promise<User | null> {
    return this.repository.findOne({
      relations: ["followers"],
      where: {
        id: id,
      },
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email: email,
      },
    });
  }

  getUserByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        username: username,
      },
    });
  }

  getUsersFollowing(id: string): Promise<User[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("user")
      .innerJoin("user.followers", "followers")
      .where("followers.id = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }

  getUsersFriendsReviews(id: string): Promise<User[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("user")
      .innerJoin("user.followers", "followers")
      .innerJoinAndSelect("user.reviews", "reviews")
      .where("followers.id = :idOne", { idOne: id })
      .getMany();

    return queryBuilder;
  }

  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ): Promise<InsertResult> {
    return this.repository.insert({
      firstName,
      lastName,
      username,
      email,
      password: bcryptjs.hashSync(password, 12),
    });
  }

  updateUser(User: User): Promise<User> {
    return this.repository.save(User);
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  unfollowUser(userToUnfollow: User, currentUser: User): Promise<User> {
    userToUnfollow.followers = userToUnfollow.followers.filter((follower) => {
      return follower.id !== currentUser.id;
    });
    return this.repository.save(userToUnfollow);
  }

  getReviewByUserId(id: string): Promise<User | null> {
    return this.repository.findOne({
      relations: ["reviews"],
      where: {
        id: id,
      },
    });
  }

  addGoal(user: User, goal: number): Promise<User> {
    user.goal = goal;
    return this.repository.save(user);
  }

  addProfilePic(user: User, picture: string): Promise<User> {
    user.picture = picture;
    return this.repository.save(user);
  }

  getCurrentRead(id: string): Promise<User | null> {
    const queryBuilder = this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.currentread", "currentread")
      .where("user.id = :idOne", { idOne: id })
      .getOne();

    return queryBuilder;
  }

  addCurrentRead(user: User, book: Book): Promise<User> {
    user.currentread = book;
    return this.repository.save(user);
  }

  deleteCurrentRead(user: User): Promise<User> {
    user.currentread = null;
    return this.repository.save(user);
  }

  updateReadBooksCount(user: User, progress: number): Promise<User> {
    user.readbooks = progress;
    return this.repository.save(user);
  }

  updateProgress(user: User, progress: number): Promise<User> {
    user.progress = progress;
    return this.repository.save(user);
  }
}
