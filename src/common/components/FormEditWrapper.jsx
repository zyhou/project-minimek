import React, { Component, PropTypes } from "react";
import { noop, debounce, defaults, values } from "lodash";

import { getValueFromEvent } from "common/utils/clientUtils";

class FormEditWrapper extends Component {
    static propTypes = {
        value: PropTypes.object.isRequired,
        isEditing: PropTypes.bool,
        onChange: PropTypes.func,
        valuePropName: PropTypes.string,
        onChangePropName: PropTypes.string,
        singleValue: PropTypes.bool,
        passIsEditing: PropTypes.bool,
        dispatchDelay: PropTypes.number,
    }

    static defaultProps = {
        isEditing: true,
        onChange: noop,
        valuePropName: "value",
        onChangePropName: "onChange",
        singleValue: false,
        passIsEditing: true,
        dispatchDelay: 250,
    }

    constructor(props) {
        super(props);
        const boundDispatchAttributes = this.dispatchAttributeChange.bind(this);
        this.dispatchAttributeChange = debounce(boundDispatchAttributes, props.dispatchDelay);

        this.state = {
            value: {},
        };
    }

    componentWillReceiveProps() {
        // Reset any component-local changes  Note that the incoming props
        // SHOULD match the changes we just had in local state.
        this.setState({ value: {} });
    }

    onChildChange = (e) => {
        const {isEditing} = this.props;

        if (isEditing) {
            const newValues = getValueFromEvent(e);

            if (newValues) {
                const change = {
                    ...this.state.value,
                    ...newValues
                };

                this.setState({ value: change });
                this.dispatchAttributeChange(change);
            }
        }
    }

    dispatchAttributeChange(change) {
        this.props.onChange(change);
    }

    render() {
        const {value: propsValue, children} = this.props;
        const {isEditing, passIsEditing, valuePropName, onChangePropName, singleValue} = this.props;
        const {value: stateValue = {}} = this.state;

        const currentValues = defaults({}, stateValue, propsValue);

        let valueToPassDown = currentValues;
        if (singleValue) {
            valueToPassDown = values(currentValues)[0];
        }

        const editingValue = passIsEditing ? { isEditing } : {};

        // Force the child form to re-render itself with these values
        const child = React.Children.only(children);

        const updatedChild = React.cloneElement(child, {
            [valuePropName]: valueToPassDown,
            [onChangePropName]: this.onChildChange,
            ...editingValue
        });

        return updatedChild;
    }
}

export default FormEditWrapper;