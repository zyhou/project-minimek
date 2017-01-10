import { createReducer } from "common/utils/reducerUtils";

import { DATA_LOADED } from "features/tools/toolConstants";

import orm from "app/orm"

const initialState = orm.getDefaultState();

export function loadData(state, payload) {
    // Create a Redux-ORM session from our entities "tables"
    const session = orm.session(state);
    // Get a reference to the correct version of model classes for this Session
    const {Pilot, MechDesign, Mech} = session;

    const {pilots, designs, mechs} = payload;

    // Queue up creation commands for each entry
    pilots.forEach(pilot => Pilot.parse(pilot));
    designs.forEach(design => MechDesign.parse(design));
    mechs.forEach(mech => Mech.parse(mech));

    // Apply the queued updates and return the updated "tables"
    return session.state;
}

export default createReducer(initialState, {
    [DATA_LOADED]: loadData
});