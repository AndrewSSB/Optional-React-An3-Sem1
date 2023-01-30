import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import mockedData from "../data/mockedItems.json"

export function Store() {
    return (
        <>
            <h1>Store</h1>
            {/* md - medium, xs - extra small, lg - large*/}
            <Row md={2} xs={1} lg={3} className="g-3"> 
                {
                    mockedData.map(item => (
                        <Col key={item.id}>
                            <StoreItem {...item} />
                        </Col>    
                    ))
                }
            </Row>
        </>
    )
}