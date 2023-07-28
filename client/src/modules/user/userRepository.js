import { BACKEND_URL } from "../../lib/config";

export const registerUser = async (
  firstName,
  lastName,
  email,
  username,
  password
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (data == null) {
      return 200;
    }
    return 403;
  } catch (error) {}
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return 200;
  } catch (error) {}
};

export const getCurrentUserId = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {
    return;
  }
};

export const addCurrentRead = async (title, author, imageLink) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/currentread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        imageLink: imageLink,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getCurrentRead = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/getcurrent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const removeCurrentRead = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/removecurrent`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const addProgressToCurrentRead = async (progress) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: progress,
      }),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const addYearlyGoal = async (goal) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal: goal,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const addProgressToYearlyGoal = async (progress) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/readbooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: progress,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const addProfilePic = async (picture) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/profilepic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture: picture,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const followUser = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return 404;
    }
    return data;
  } catch (error) {}
};

export const unfollowUser = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getCurrentUserFollowing = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/following/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getFollowing = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/following/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getFriendsReviews = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getUserByEmail = async (email) => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/user-email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const logout = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};
