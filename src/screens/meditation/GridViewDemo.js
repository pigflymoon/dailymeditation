import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import GridView from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import img1 from '../../assets/images/1.jpg';
import img2 from '../../assets/images/2.jpg';
import img3 from '../../assets/images/3.jpg';


export default class GridViewDemo extends Component {
    render() {
        // Taken from https://flatuicolors.com/
        const items = [
            {name: 'TURQUOISE', code: '#1abc9c'}, {name: 'EMERALD', code: '#2ecc71'},
            {name: 'PETER RIVER', code: '#3498db'}, {name: 'AMETHYST', code: '#9b59b6'},
            {name: 'WET ASPHALT', code: '#34495e'}, {name: 'GREEN SEA', code: '#16a085'},
            {name: 'NEPHRITIS', code: '#27ae60'}, {name: 'BELIZE HOLE', code: '#2980b9'},
            {name: 'WISTERIA', code: '#8e44ad'}, {name: 'MIDNIGHT BLUE', code: '#2c3e50'},
            {name: 'SUN FLOWER', code: '#f1c40f'}, {name: 'CARROT', code: '#e67e22'},
            {name: 'ALIZARIN', code: '#e74c3c'}, {name: 'CLOUDS', code: '#ecf0f1'},
            {name: 'CONCRETE', code: '#95a5a6'}, {name: 'ORANGE', code: '#f39c12'},
            {name: 'PUMPKIN', code: '#d35400'}, {name: 'POMEGRANATE', code: '#c0392b'},
            {name: 'SILVER', code: '#bdc3c7'}, {name: 'ASBESTOS', code: '#7f8c8d'},
        ];
        const images = [
            {image: img1, name: 'TURQUOISE', code: '#1abc9c'}, {name: 'EMERALD', code: '#2ecc71'},
            {image: img2, name: 'PETER RIVER', code: '#3498db'}, {name: 'AMETHYST', code: '#9b59b6'},
            {image: img3, name: 'WET ASPHALT', code: '#34495e'}, {name: 'GREEN SEA', code: '#16a085'}
        ];
// { backgroundColor: item.code }
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