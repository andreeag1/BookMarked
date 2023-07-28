import { BACKEND_URL } from "../../lib/config";

export const addComment = async (comment, user, review) => {
  try {
    const res = await fetch(`${BACKEND_URL}/comment/add`, {
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
    const res = await fetch(`${BACKEND_URL}/comment/review/${id}`, {
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
    const res = await fetch(`${BACKEND_URL}/comment/count/${id}`, {
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
    const res = await fetch(`${BACKEND_URL}/comment/delete`, {
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
