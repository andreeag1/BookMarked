export const addReview = async (review, bookId, userId, rating) => {
  try {
    const res = await fetch(`http://localhost:5000/review/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: review,
        bookId: bookId,
        userId: userId,
        rating: rating,
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

export const getReviewByBook = async (bookId) => {
  try {
    const res = await fetch(`http://localhost:5000/review/book/${bookId}`, {
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

export const getReviewByUser = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/review/user/${userId}`, {
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

export const addLike = async (reviewId) => {
  try {
    const res = await fetch(`http://localhost:5000/review/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reviewId,
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

export const deleteLike = async (reviewId) => {
  try {
    const res = await fetch(`http://localhost:5000/review/unlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reviewId,
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

export const getReviewById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/review/${id}`, {
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

export const deleteReview = async (reviewId) => {
  try {
    const res = await fetch(`http://localhost:5000/review/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: reviewId,
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
