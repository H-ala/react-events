import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="برای خبرنامه ثبت‌نام کنید…"
        aria-label="برای خبرنامه ثبت‌نام کنید"
      />
      <button>ثبت‌نام</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
