import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Divider, Header, Loader } from "semantic-ui-react";
import ItemList from "../src/component/ItemList";
import styles from "../styles/Home.module.css";

function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);   

  const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  async function getData() {
    await Axios.get(API_URL).then((res) => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>HOME | NestJS 예제</title>
      </Head>
      {isLoading && (
        <Loader inline="centered" active>
          Loading...
        </Loader>
      )}
      {!isLoading && (
        <>
        <Header as="h3" style={{ paddingTop: 40 }}>
          베스트 상품
        </Header>
        <Divider />
        <ItemList list={list.slice(0, 9)} />
        <Header as="h3" style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <Divider />
        <ItemList list={list.slice(9)} />
        </>
      )}
    </div>
  );
}

export default Home;