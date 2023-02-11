import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import axios from "axios";
import { useEffect, useState } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
};

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

export function CartItem({ id, quantity }: CartItemProps) {
  const [items, setItems] = useState<ItemsProps[]>();

  useEffect(() => {
    async function fetchData() {
      const items = await getItems();
      setItems(items);
    }
    fetchData();
  }, []);

  const { removeFromCart } = useShoppingCart();
  if (items == null) return null;
  const item = items.find((i) => i.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.itemName}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.78rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.78rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
