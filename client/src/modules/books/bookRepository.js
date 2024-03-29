import { BACKEND_URL } from "../../lib/config";

export const createBook = async (title, author, imageLink) => {
  try {
    const res = await fetch(`${BACKEND_URL}/book/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: title,
        author: author,
        imageLink: imageLink,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    return data;
  } catch (error) {}
};

export const getBookByImg = async (imagelink) => {
  try {
    const res = await fetch(`${BACKEND_URL}/book/search/${imagelink}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res === 404) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};
