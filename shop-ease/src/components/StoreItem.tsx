import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type ItemsProps = {
  id: number;
  itemName: string;
  price: number;
  image: string;
  stock: number;
};

export function StoreItem({ id, itemName, price, image }: ItemsProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "scale-down" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title
          className="d-flex
            justify-content-between align-items-baseline
            mb-4"
        >
          <span style={{ fontSize: "20px" }}>{itemName}</span>
          <span className="ms-2 text-muted" style={{ fontSize: "15px" }}>
            {formatCurrency(price)}
          </span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <div className="d-flex align-items-center flex-column">
              <Button className="w-50" onClick={() => increaseCartQuantity(id)}>
                + Add to Cart
              </Button>
            </div>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".7rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".7rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                  <span style={{ color: "gray" }}> in cart</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
