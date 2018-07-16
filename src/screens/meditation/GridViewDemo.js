import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import GridView from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import img1 from '../../assets/images/1.jpg';
import img2 from '../../assets/images/2.jpg';
import img3 from '../../assets/images/3.jpg';
import img4 from '../../assets/images/4.jpg';
import img5 from '../../assets/images/5.jpg';
import img6 from '../../assets/images/6.jpg';
const images = [
    {image: img1, name: 'TURQUOISE', code: '#1abc9c'},
    {image: img2, name: 'PETER RIVER', code: '#3498db'},
    {image: img3, name: 'WET ASPHALT', code: '#34495e'},
    {image: img4, name: 'PUMPKIN', code: '#d35400'},
    {image: img5, name: 'ALIZARIN', code: '#e74c3c'},
    {image: img6, name: 'NEPHRITIS', code: '#27ae60'}
];


export default class GridViewDemo extends Component {
    render() {
        return (
            <GridView
                itemDimension={130}
                items={images}
                style={styles.gridView}
                renderItem={item => (
                      <ImageBackground style={styles.itemContainer} source={item.image}>
                       <LinearGradient colors={['transparent', 'black']} start={[0.5, 0.40]} style={{flex:1,width:'100%',height:'100%'}}>
                         <Text>SKIP</Text>
                       </LinearGradient>
                      </ImageBackground>


        )}
            />
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: 5,
        // padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },

});