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
      return;
    }
    return data;
  } catch (error) {}
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
      return;
    }
    return data;
  } catch (error) {}
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
      return;
    }
    return data;
  } catch (error) {}
};

export const deleteComment = async (commentId) => {
  try {
    const res = await fetch(`http://localhost:5000/comment/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId: commentId,
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
