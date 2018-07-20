import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import sliderTabStyle from '../../styles/slideTab';
import colorStyle from '../../styles/colors';
class SlideTabBar extends React.Component {
    icons = [];

    constructor(props) {
        super(props);
        this.icons = [];
    }

    render() {
        return <View style={[sliderTabStyle.tabs, this.props.style]}>
            {this.props.tabs.map((tab, i) => {

                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)}
                                         style={[sliderTabStyle.tab]}>
                    <Text style={{color:this.props.activeTab === i?colorStyle.orange:'rgb(204,204,204)'}}> {tab}</Text>
                </TouchableOpacity>;
            })}
        </View>;
    }
}


export default SlideTabBar;