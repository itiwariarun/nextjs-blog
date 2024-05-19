import { getSession } from "next-auth/react";
import App from "next/app";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const session = await getSession(appContext.ctx);
  return { ...appProps, pageProps: { ...appProps.pageProps, session } };
};

export default MyApp;
