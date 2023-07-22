export const registerUser = async (
  firstName,
  lastName,
  email,
  username,
  password
) => {
  try {
    const res = await fetch("http://localhost:5000/auth/register", {
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
    console.log(data);
    if (data == null) {
      return 200;
    }
    return 403;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
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
      console.log(data.description);
      return;
    }
    console.log(data);
    return 200;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserId = async () => {
  try {
    const res = await fetch(`http://localhost:5000/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addCurrentRead = async (title, author, imageLink) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/currentread`, {
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
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentRead = async () => {
  try {
    const res = await fetch(`http://localhost:5000/auth/getcurrent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCurrentRead = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/removecurrent`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProgressToCurrentRead = async (progress) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/progress`, {
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
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addYearlyGoal = async (goal) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/goal`, {
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
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProgressToYearlyGoal = async (progress) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/readbooks`, {
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
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`http://localhost:5000/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProfilePic = async (picture) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/profilepic`, {
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
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/follow`, {
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
      console.log(data);
      return 404;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/unfollow`, {
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
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserFollowing = async () => {
  try {
    const res = await fetch(`http://localhost:5000/auth/following/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowing = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/following/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFriendsReviews = async () => {
  try {
    const res = await fetch(`http://localhost:5000/auth/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/user-email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
