import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import mockedData from "../data/mockedItems.json";
import axios from "axios";
import { useEffect, useState } from "react";

interface ItemsProps {
  id: number;
  itemName: string;
  price: number;
  image: string;
  stock: number;
}

async function getItems() {
  const accessToken = localStorage.getItem("accessToken");
  const res = await axios.get("https://localhost:7232/api/store/items", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return res.data;
}

export function Store({}) {
  const [items, setItems] = useState<ItemsProps[]>();

  useEffect(() => {
    async function fetchData() {
      const items = await getItems();
      setItems(items);
    }
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Store</h1>
      </div>
      {/* md - medium, xs - extra small, lg - large*/}
      <Row md={2} xs={1} lg={3} className="g-3" style={{ paddingTop: "20px" }}>
        {items != null ? (
          items.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            Something went wrong with our products, retry later.
          </div>
        )}
      </Row>
    </>
  );
}
