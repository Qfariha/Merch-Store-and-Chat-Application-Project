import { useEffect, useState } from "react";

const useAdmin = (authUser) => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const username = authUser?.username;
    if (username) {
      fetch(`http://localhost:5000/api/auth/admin-verify/${username}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
        });
    }
  }, [authUser]);

  return [admin];
};

export default useAdmin;
