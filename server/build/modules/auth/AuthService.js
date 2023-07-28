"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(userRepository, bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    getAllUsers() {
        return this.userRepository.getAllUsers();
    }
    getUserById(id) {
        return this.userRepository.getUserById(id);
    }
    getUserByEmail(email) {
        return this.userRepository.getUserByEmail(email);
    }
    saveUser(firstName, lastName, email, username, password) {
        return this.userRepository.saveUser(firstName, lastName, email, username, password);
    }
    updateUser(User) {
        return this.userRepository.updateUser(User);
    }
    deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
    getUsersFollowing(id) {
        return this.userRepository.getUsersFollowing(id);
    }
    getUserByFollower(id) {
        return this.userRepository.getUserByFollower(id);
    }
    getUsersFriendsReviews(id) {
        return this.userRepository.getUsersFriendsReviews(id);
    }
    getReviewByUserId(id) {
        return this.userRepository.getReviewByUserId(id);
    }
    unfollowUser(userToUnfollow, currentUser) {
        return this.userRepository.unfollowUser(userToUnfollow, currentUser);
    }
    addGoal(user, goal) {
        return this.userRepository.addGoal(user, goal);
    }
    addCurrentRead(user, book) {
        return this.userRepository.addCurrentRead(user, book);
    }
    deleteCurrentRead(user) {
        return this.userRepository.deleteCurrentRead(user);
    }
    updateReadBooksCount(user, progress) {
        return this.userRepository.updateReadBooksCount(user, progress);
    }
    updateProgress(user, progress) {
        return this.userRepository.updateProgress(user, progress);
    }
    getUserByUsername(username) {
        return this.userRepository.getUserByUsername(username);
    }
    getCurrentRead(id) {
        return this.userRepository.getCurrentRead(id);
    }
    addProfilePic(user, picture) {
        return this.userRepository.addProfilePic(user, picture);
    }
}
exports.AuthService = AuthService;
