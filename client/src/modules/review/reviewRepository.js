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
      console.log(data.description);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
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
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
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
      console.log(data);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
