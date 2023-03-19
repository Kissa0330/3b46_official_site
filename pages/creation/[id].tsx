import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image"
import styles from '@/styles/Creation.module.css'
import Footer from '@/component/footer'
import creation from "@/data/creation.json"

export default function Creation() {
  const router = useRouter();
  const [target, setTarget] = useState<any>({
    id: 0,
    image_length: 0,
    name: "a",
    Furigana: "a",
    color: "a",
    age: "a",
    birthday: "a",
    height: "a",
    job: "a",
    Species: "a",
    UkeSeme: "",
    verse: "",
    description: "a",
    quotations: "a",
    CP: null,
    siblings: null
  });
  const [profile, setProfile] = useState<any>([]);
  const [imageURL, setImageURL] = useState<string>("/");
  const [currentImagePage, setCurrentImagePage] = useState<number>(1);

  useEffect(() => {
    const { id } = router.query;
    const ele = creation.creations.filter((target) => target.id === Number(id))[0];
    if (ele) {
      setTarget(ele);
    }
  }, [router.query]);

  useEffect(() => {
    const imageColor = document.getElementById("image_color");
    if (imageColor) {
      imageColor.style.backgroundColor = target.color;
    }
    setProfile([{ name: "年齢", val: target.age }, { name: "誕生日", val: target.birthday }, { name: "身長", val: target.height }, { name: "職業", val: target.job }, { name: "種族", val: target.Species }, { name: "受け攻め", val: target.UkeSeme }, { name: "バース", val: target.verse }])
    setImageURL(target.Furigana.split(" ").length === 1 ? `/creations/${target.Furigana.split(" ")[0]}` : `/creations/${target.Furigana.split(" ")[0]}_${target.Furigana.split(" ")[1]}`);
  }, [target])

  function genProfile() {
    let list: any = [];
    for (let i = 0; i < profile.length; i++) {
      const ele = profile[i];
      if (ele.val !== null) {
        list.push(
          <div className={styles.profile} key={i}>
            <p className={styles.profile_p}>{ele.name}　{ele.val}</p>
            <div className={styles.profile_stick} />
          </div>
        );
      }
    }
    return <div className={styles.profiles}>{list}</div>;
  }

  function listImage() {
    let list: any = []
    for (let i = 0; i < target.image_length; i++) {
      list.push(
        <Image
          key={i}
          id="image"
          src={`${imageURL}/${i + 1}.JPG`}
          alt="content image"
          quality={100}
          fill
          sizes="100vw"
          priority={currentImagePage === i + 1 ? true : false}
          style={currentImagePage === i + 1 ? {
            objectFit: "contain"
          } : { display: "none" }} />
      );
    }
    return <div className={styles.image_wrapper}>{list}</div>
  }
  return <>
    <Head>
      <title>{target.name}</title>
      <meta name="description" content={`錆白の創作の詳細紹介ページです。\n名前:${target.name}\n「${target.description}」`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <div className={styles.left}>
        {listImage()}
        <div className={styles.page}>
          <div className={styles.arrow} onClick={() => {
            if (currentImagePage - 1 > 0) {
              setCurrentImagePage(currentImagePage - 1)
            }
          }}>
            <Image
              src={`/arrow_2.svg`}
              alt="arrow image"
              width={20}
              height={30} />
          </div>
          {currentImagePage} / {target.image_length}
          <div className={styles.arrow} onClick={() => {
            if (currentImagePage + 1 <= target.image_length) {
              setCurrentImagePage(currentImagePage + 1)
            }
          }}>
            <Image
              src={`/arrow_1.svg`}
              alt="arrow image"
              width={20}
              height={30} />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.name}>
          <div className={styles.image_color} id="image_color" />
          <div className={styles.name_wrapper}>
            <h1 className={styles.name_h1}>{target.name}</h1>
            <h2 className={styles.name_h2}>{target.Furigana}</h2>
          </div>
        </div>
        {genProfile()}
        <div className={styles.setting}>
          <h3 className={styles.setting_h3}>設定</h3>
          <p className={styles.setting_p}>{target.description.split(/(\n)/).map((v: string, i: number) => (i & 1 ? <br key={i} /> : v))}</p>
        </div>
        <h4 className={styles.quotations}>{target.quotations}</h4>
      </div>
    </main>
    <Footer />
  </>;
}
