"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("./User");
const database_1 = require("../../lib/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(User_1.User);
    }
    getAllUsers() {
        return this.repository.find();
    }
    getUserById(id) {
        return this.repository.findOneOrFail({
            relations: {
                followers: true,
            },
            where: {
                id: id,
            },
        });
    }
    getUserByFollower(id) {
        return this.repository.findOne({
            relations: ["followers"],
            where: {
                id: id,
            },
        });
    }
    getUserByEmail(email) {
        return this.repository.findOne({
            where: {
                email: email,
            },
        });
    }
    getUserByUsername(username) {
        return this.repository.findOne({
            where: {
                username: username,
            },
        });
    }
    getUsersFollowing(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("user")
            .innerJoin("user.followers", "followers")
            .where("followers.id = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
    getUsersFriendsReviews(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("user")
            .innerJoin("user.followers", "followers")
            .innerJoinAndSelect("user.reviews", "reviews")
            .innerJoinAndSelect("reviews.book", "book")
            .where("followers.id = :idOne", { idOne: id })
            .getMany();
        return queryBuilder;
    }
    async saveUser(firstName, lastName, email, username, password) {
        const existingEmail = await this.repository.findOne({
            where: {
                email: email,
            },
        });
        const existingUsername = await this.repository.findOne({
            where: {
                username: username,
            },
        });
        if (existingEmail == null && existingUsername == null) {
            const user = this.repository.create({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: bcryptjs_1.default.hashSync(password, 12),
            });
            this.repository.save(user);
            return this.repository.findOne({
                where: {
                    username: username,
                    email: email,
                },
            });
        }
        return existingUsername || existingEmail;
    }
    updateUser(User) {
        return this.repository.save(User);
    }
    deleteUser(id) {
        return this.repository.delete(id);
    }
    unfollowUser(userToUnfollow, currentUser) {
        userToUnfollow.followers = userToUnfollow.followers.filter((follower) => {
            return follower.id !== currentUser.id;
        });
        return this.repository.save(userToUnfollow);
    }
    getReviewByUserId(id) {
        return this.repository.findOne({
            relations: ["reviews"],
            where: {
                id: id,
            },
        });
    }
    addGoal(user, goal) {
        user.goal = goal;
        return this.repository.save(user);
    }
    addProfilePic(user, picture) {
        user.picture = picture;
        return this.repository.save(user);
    }
    getCurrentRead(id) {
        const queryBuilder = this.repository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.currentread", "currentread")
            .where("user.id = :idOne", { idOne: id })
            .getOne();
        return queryBuilder;
    }
    addCurrentRead(user, book) {
        user.currentread = book;
        return this.repository.save(user);
    }
    deleteCurrentRead(user) {
        user.currentread = null;
        return this.repository.save(user);
    }
    updateReadBooksCount(user, progress) {
        user.readbooks = progress;
        return this.repository.save(user);
    }
    updateProgress(user, progress) {
        user.progress = progress;
        return this.repository.save(user);
    }
}
exports.UserRepository = UserRepository;
