export const addComment = async (comment, user, review) => {
  try {
    const res = await fetch(`http://localhost:5000/comment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        user: user,
        review: review,
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

export const getCommentsByReview = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/comment/review/${id}`, {
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

export const getCommentCount = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/comment/count/${id}`, {
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
