import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";

import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { method: "post", action: "/logout" });
      return;
    }
    
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { method: "post", action: "/logout" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
