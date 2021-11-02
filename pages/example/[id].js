import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Item from "../../src/component/Item";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState({});
  // isLoading의 기본 상태는 true이며, setIsLoading() 을 통해 상태를 변경할 수 있다.
  const [isLoading, setIsLoading] = useState(true);     

  const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  function getData() {
    Axios.get(API_URL).then((res) => {
      setItem(res.data);
    });
  }

  useEffect(() => {
    if (id && id > 0) {
      getData();
    }
  }, [id]);

  return  <>{item && <Item item={item}/>}</>;
};

export default Post;

// export async function getServerSideProps(context) {
//     const id = context.params.id;
//     const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
//     const res = await Axios.get(apiUrl);
//     const data = res.data;
//     return {
//         props: {
//             item: data,
//         },
//     };
// }