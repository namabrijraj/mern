import { Card, CardGroup } from "react-bootstrap";
import data from './data'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  
  return (
    <>
      <CardGroup>
        {
          data.map((res) => {
            return (
              <Card key={res.id}>
                  <Card.Img variant="top" src={res.img} />
                  <Card.Body>
                    <Card.Title>{res.name}</Card.Title>
                    <Card.Text>{res.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </Card.Footer>
              </Card>
            )
          })
        }
      </CardGroup>
    </>
  )
}

export default App;