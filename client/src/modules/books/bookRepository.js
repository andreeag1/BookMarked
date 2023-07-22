export const createBook = async (title, author, imageLink) => {
  try {
    const res = await fetch("http://localhost:5000/book/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        imageLink: imageLink,
      }),
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

export const getBookByImg = async (imagelink) => {
  try {
    const res = await fetch(`http://localhost:5000/book/search/${imagelink}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res == 404) {
      console.log(data);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
