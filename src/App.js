import React, { Component } from 'react';
import {
    Header,
    Container
} from "semantic-ui-react";

import TabBarContainer from "./features/tabs/TabBarContainer";

import './App.css';

const unitIngfo = () => <div>Unit info content</div>;
const pilots = () => <div>Pilots content</div>;
const mechs = () => <div>Mechs content</div>;
const unitOrganization = () => <div>Unit Organization content</div>;

class App extends Component {
    render() {

        const tabs = [
            { name: "unitInfo", label: "Unit Info", component : unitIngfo },
            { name: "pilots", label: "Pilots", component : pilots },
            { name: "mechs", label: "Mechs", component : mechs },
            { name: "unitOrganization", label: "Unit Organization", component : unitOrganization }
        ];

        return (
            <div className="App">
                <div className="App-header">
                    <Header inverted as="h1">Project Mini-Mek</Header>
                </div>
                <Container>
                    <TabBarContainer tabs={tabs} size="massive" />
                </Container>
            </div>
        );
    }
}

export default App;