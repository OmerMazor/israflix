import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";

import SectionCards from "../components/card/section-cards";

import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  const telavivVideos = await getVideos("tel aviv travel");

  const jerusalemVideos = await getVideos("jerusalem travel");

  const natureVideos = await getVideos("israel nature");

  const popularVideos = await getPopularVideos();
  return {
    props: {
      telavivVideos,
      jerusalemVideos,
      natureVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home({
  telavivVideos,
  jerusalemVideos,
  natureVideos,
  popularVideos,
  watchItAgainVideos,
}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Israflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username="omermazor144@gmail.com" />
        <Banner
          videoId="4tFXPbh3RC4"
          title="Israel in 4K"
          subTitle="By: The Vine Studios"
          imgUrl="/static/Israel4K.png"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Tel Aviv" videos={telavivVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Jerusalem" videos={jerusalemVideos} size="small" />
          <SectionCards
            title="Nature"
            videos={natureVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
