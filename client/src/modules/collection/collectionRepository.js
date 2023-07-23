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
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
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
    console.log(data);
    if (!res.ok) {
      console.log(data.description);
      return;
    }
    var titles = [];
    data.map((collection) => {
      titles.push(collection);
    });
    return titles;
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
};

export const deleteCollection = async (collectionId) => {
  try {
    const res = await fetch(`http://localhost:5000/collection/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionId: collectionId,
      }),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
