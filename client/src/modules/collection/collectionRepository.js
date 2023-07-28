export const addCollection = async (title, userId) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
      }),
    });

    const data = await res.json();

    return data;
  } catch (error) {}
};

export const getCollectionTitles = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/user/${id}`, {
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
    var titles = [];
    data.map((collection) => {
      titles.push(collection);
    });
    return titles;
  } catch (error) {}
};

export const addBookToCollection = async (collectionId, bookId) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
        bookId: bookId,
      }),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const deleteBookFromCollection = async (collectionId, bookId) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/deletebook`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
        bookId: bookId,
      }),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const getCollection = async (id, title) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/${id}/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const getCollectionById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};
