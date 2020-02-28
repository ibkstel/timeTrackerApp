import React, { Component } from 'react'
import {BarChart, PieChart} from 'react-native-svg-charts';
import { Data } from '../../interfaces/Data';
import { getDiff } from '../../utils/time/duration';
import { lightColor } from '../../screens/colors';
import { ViewStyle } from 'react-native';

interface Props {
    data: Data,
    style?: ViewStyle
}

const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

export class Graph extends Component<Props>{
    render() {
        return (
            <PieChart
                style={{ height: 200, ...this.props.style }}
                svg={{ fill: lightColor }} 
                contentInset={{ top: 30, bottom: 30 }} 
                data={this.props.data.Durations.map((i) => getDiff(i.startDate, i.endDate))
                    .map((value, index) => ({
                        value,
                        svg: {
                            fill: randomColor(),
                            onPress: () => console.log('press', index),
                        },
                        key: `pie-${index}`,
                    }))}
            />
        )
    }
}

export default Graph
