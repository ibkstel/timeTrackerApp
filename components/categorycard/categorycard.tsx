import React ,{Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { category } from 'categories/categories';

interface Props{
   category: category,
}

interface State{

}


export class CategoryCard extends Component<Props,State>{
    constructor(props: Props){
        super(props);
    }

    render(){
        return(
            <View>
             <View style={styles.categoryCard}>

                <Text>Categories: {this.props.category.name} </Text>

             </View>
            </View>
        )
    }

}



const styles = StyleSheet.create(
    {
        categoryCard:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
        }
    }
);