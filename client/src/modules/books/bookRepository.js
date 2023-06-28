export const createBook = async (title, author, description, imageLink) => {
  try {
    const res = await fetch(`http://localhost:5000/book/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        description: description,
        imageLink: imageLink,
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
