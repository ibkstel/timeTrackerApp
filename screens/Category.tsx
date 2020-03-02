import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { categories } from '../categories/categories';
import { CategoryCard } from '../components/categorycard/categorycard';


export class CategoriesScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={{ padding: 120 }}>
                    <Text style={{paddingBottom:20}}> Categories Page </Text>
                    {
                        categories.map((val, index) =>
                                (<CategoryCard category={val} />)
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}
export default CategoriesScreen;
