import {
  Form,
  useSearchParams,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const navigation = useNavigation();
  const data = useActionData();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "ورود" : "ایجاد کاربر جدید"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">ایمیل</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">رمز عبور</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "ایجاد کاربر جدید" : "ورود"}
          </Link>
          <button disable={isSubmitting.toString()}>
            {isSubmitting ? "در حال ارسال…" : "ذخیره"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
