"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getAllUsers() {
        return this.authService.getAllUsers();
    }
    getUserById(id) {
        return this.authService.getUserById(id);
    }
    getUserByEmail(email) {
        return this.authService.getUserByEmail(email);
    }
    getUsersFollowing(id) {
        return this.authService.getUsersFollowing(id);
    }
    getUserByFollower(id) {
        return this.authService.getUserByFollower(id);
    }
    getUsersFriendsReviews(id) {
        return this.authService.getUsersFriendsReviews(id);
    }
    saveUser(firstName, lastName, email, username, password) {
        return this.authService.saveUser(firstName, lastName, email, username, password);
    }
    updateUser(User) {
        this.authService.updateUser(User);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    deleteUser(id) {
        return this.authService.deleteUser(id);
    }
    getReviewByUserId(id) {
        return this.authService.getReviewByUserId(id);
    }
    unfollowUser(userToUnfollow, currentUser) {
        this.authService.unfollowUser(userToUnfollow, currentUser);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    addGoal(user, goal) {
        this.authService.addGoal(user, goal);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    addCurrentRead(user, book) {
        this.authService.addCurrentRead(user, book);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    deleteCurrentRead(user) {
        this.authService.deleteCurrentRead(user);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    updateReadBooksCount(user, progress) {
        this.authService.updateReadBooksCount(user, progress);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    updateProgress(user, progress) {
        this.authService.updateProgress(user, progress);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
    getUserByUsername(username) {
        return this.authService.getUserByUsername(username);
    }
    getCurrentRead(id) {
        return this.authService.getCurrentRead(id);
    }
    addProfilePic(user, picture) {
        this.authService.addProfilePic(user, picture);
        return new Promise((resolve, reject) => {
            resolve({
                statusCode: 200,
                message: "success",
            });
        });
    }
}
exports.AuthController = AuthController;
