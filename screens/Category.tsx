import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { categories } from '../categories/categories';
import { CategoryCard } from '../components/categorycard/CategoryCard';

export class CategoriesScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={style.categoriesColumn}>
                    {categories.map((val, index) => (
                        <CategoryCard category={val} />
                    ))}
                </View>
            </ScrollView>
        );
    }
}
export default CategoriesScreen;

const style = StyleSheet.create({
    categoriesColumn: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'space-around',
    },

    text: {
        textAlign: 'center',
    },
});
