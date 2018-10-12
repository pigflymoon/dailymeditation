import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import listStyle from '../styles/list';

const Label = props => (
    <View style={listStyle.label}>
        <Text style={listStyle.text}>
            {props.text}
        </Text>
    </View>
);

Label.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Label;
