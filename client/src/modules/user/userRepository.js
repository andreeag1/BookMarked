export const registerUser = async (
  firstName,
  lastName,
  email,
  username,
  password
) => {
  try {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
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
