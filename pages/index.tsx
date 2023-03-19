import Head from 'next/head'
import Image from "next/image"
import styles from '@/styles/Home.module.css'
import Footer from '@/component/footer'
import Link from 'next/link'
import creation from "../data/creation.json"
import { useEffect } from "react"


export default function Home() {
  const creations = creation.creations.sort((a, b) => {
    if (a.Furigana > b.Furigana) {
      return 1;
    }
    else {
      return -1;
    }
  })

  function depictionCreations() {
    let list = [];
    let index = "0";
    for (let i = 0; i < creations.length; i++) {
      const target = creations[i];
      const imageURL = target.Furigana.split(" ").length === 1 ? `/creations/${target.Furigana.split(" "[0])}/1.JPG` : `/creations/${target.Furigana.split(" ")[0]}_${target.Furigana.split(" ")[1]}/1.JPG`;
      if (index !== target.Furigana[0]) {
        index = target.Furigana[0]
        list.push(
          <div key={i}><div className={styles.creation_header}>
            <div className={styles.creation_header_left}>
              <div className={styles.creation_stick} />
              <h3 className={styles.creation_index}>{index}</h3>
            </div>
            <div className={styles.creation_header_right}><div className={styles.creation_stick} /></div>
          </div>
            <Link href="/" key={i}>
              <div className={styles.creation_content}>
                <div className={styles.creation_content_left}>
                  <div className={styles.creation_image_color} id={"image_color_" + i} />
                  <h4 className={styles.creation_name}>{target.name}{"　"}{target.Furigana}</h4>
                </div>
                <div className={styles.creation_content_right}>
                  <Image
                    src={imageURL}
                    alt="content image"
                    quality={1}
                    fill
                    sizes="100vw"
                    style={{
                      borderRadius: "10px",
                      objectFit: "contain"
                    }} />
                </div>
              </div>
            </Link>
          </div>);
        continue;
      }
      list.push(<Link href="/" key={i}>
        <div className={styles.creation_content}>
          <div className={styles.creation_content_left}>
            <div className={styles.creation_image_color} id={"image_color_" + i} />
            <h4 className={styles.creation_name}>{target.name}{"　"}{target.Furigana}</h4>
          </div>
          <div className={styles.creation_content_right}>
            <Image
              src={imageURL}
              alt="content image"
              quality={1}
              fill
              sizes="100vw"
              style={{
                objectFit: "contain"
              }} />
          </div>
        </div>
      </Link>);
    }
    return list;
  }

  useEffect(() => {
    for (let i = 0; i < creations.length; i++) {
      const target = creations[i];
      const imageColor = document.getElementById("image_color_" + i);
      if (imageColor) {
        imageColor.style.backgroundColor = target.color;
      }
    }
  })

  return <>
    <Head>
      <title>錆白 Official Site</title>
      <meta name="description" content="Twitterで活動している絵師の錆白のオフィシャルサイトです。創作物の設定などを公開しています。" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.top_image_wrapper}>
          <Image
            className={styles.top_image}
            src="/top_image.jpg"
            alt="top image"
            priority={true}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover"
            }} />
        </div>
        <h1 className={styles.top_h1}>3b46 official site</h1>
      </div>
      <div className={styles.creation}>
        <h2 className={styles.creation_title}>Creation</h2>
        <div className={styles.creation_contents}>
          {depictionCreations()}
        </div>
      </div>
    </main>
    <Footer />
  </>;
}
