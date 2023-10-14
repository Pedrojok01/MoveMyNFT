import { Layout } from "antd";
import { NextPage } from "next";
import { Rubik } from "next/font/google";
import Head from "next/head";


import { Content, HeaderPage } from "../components/elements/";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

const MainPage: NextPage = () => {
  return (
    <Layout className={`layout ${rubik.variable}`}>
      <Head>
        <title>Move My NFT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <HeaderPage />

      <div className="content">
        <Content />
      </div>
    </Layout>
  );
};

export default MainPage;
