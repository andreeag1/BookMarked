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
    if (!res.ok) {
      console.log(data.description);
      return;
    }
    console.log(data);
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
      console.log(data.description);
      return;
    }
    const userId = data.id;
    return userId;
  } catch (error) {
    console.log(error);
  }
};

// export const addCurrentRead = async (id, bookId) => {
//   try {
//     const res = await fetch(`http://localhost:5000/auth/currentread`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: id,
//         bookId: bookId,
//       }),
//       credentials: "include",
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       console.log(data.description);
//       return;
//     }
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addCurrentRead = async (id, title, author, imageLink) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/currentread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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

export const getCurrentRead = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/getcurrent/${id}`, {
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
      body: JSON.stringify({
        id: id,
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

export const addProgressToCurrentRead = async (id, progress) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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

export const addYearlyGoal = async (id, goal) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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

export const addProgressToYearlyGoal = async (id, progress) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/readbooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
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

export const getUserById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/${id}`, {
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
