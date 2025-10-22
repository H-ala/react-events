import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "خطایی رخ داد!";
  let message = "مشکلی پیش آمد!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "یافت نشد!";
    message = "منبع یا صفحه پیدا نشد.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
