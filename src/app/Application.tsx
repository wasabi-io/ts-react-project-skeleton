import * as React from "react";
import {Col, Grid, Row} from "react-bootstrap";
import Component, {Props} from "../component/Component";

export interface ApplicationProps extends Props {
    name: string
}

export interface ApplicationState {
    counter: number
}

export default class Application extends Component<ApplicationProps, ApplicationState> {
    static propTypes = {
        name: React.PropTypes.string.isRequired
    }
    public constructor(props: ApplicationProps){
        super(props);
        this.state = {
            counter: 0
        };
    }

    public render(): JSX.Element {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={6} md={6}><code>ApplicationName: </code></Col>
                    <Col sm={6} md={6}><code>{this.props.name}</code></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={6} md={6}><code>Slogan: </code></Col>
                    <Col sm={6} md={6}><code>Hello World</code></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={6} md={4}><code>Answer:</code></Col>
                    <Col sm={6} md={4}><code><button onClick={this.onClick}>Hello</button></code></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={6} md={4}><code>Order</code></Col>
                    <Col sm={6} md={4}><code>Result</code></Col>
                </Row>
                { this.answer() }
            </Grid>
        )
    }

    public answer(): JSX.Element[]{
        let elements = [];
        for(let i = 0 ; i < this.state.counter;i++) {
            elements.push(
                <Row className="show-grid">
                    <Col sm={6} md={4}><code>{i}</code></Col>
                    <Col sm={6} md={4}><code>Hello</code></Col>
                </Row>
            )
        }
        return elements;
    }

    private onClick(e: any){
        this.setState({
            counter: this.state.counter + 1
        });
    }
}