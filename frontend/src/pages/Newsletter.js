import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

function NewsletterPage() {
  return (
    <PageContent title="به خبرنامه فوق‌العاده ما بپیوندید!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'ثبت‌نام با موفقیت انجام شد!' };
}
