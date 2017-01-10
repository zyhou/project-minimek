import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Grid,
    Segment,
    Header
} from "semantic-ui-react";

import orm from "app/orm";

import MechsList from "../MechsList";
import MechDetails from "../MechDetails";

const mapState = (state) => {
    const session = orm.session(state.entities);
    const {Mech} = session;

    const mechs = Mech.all().toModelArray().map(mechModel => {
        const mech = {
            ...mechModel.ref,
            mechType: {},
        };

        if (mechModel.type) {
            mech.mechType = { ...mechModel.type.ref };
        }

        return mech;
    });

    return { mechs }
}

class Mechs extends Component {
    render() {
        const {mechs = []} = this.props;
        const currentMech = mechs[0] || {};

        return (
            <Segment>
                <Grid>
                    <Grid.Column width={10}>
                        <Header as="h3">Mechs List</Header>
                        <MechsList mechs={mechs} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header as="h3">Mech Details</Header>
                        <Segment >
                            <MechDetails mech={currentMech} />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default connect(mapState)(Mechs);