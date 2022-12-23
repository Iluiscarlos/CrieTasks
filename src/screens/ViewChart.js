import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Theme } from '../styles/Theme';

// import { Container } from './styles';

const ViewChart = () => {

  const width = Dimensions.get('window').width

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const dataProgress = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const dataBar = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#0C1A26",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#0C1A26",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={Theme.container}>
      <SafeAreaView>
        <ScrollView>
          <LineChart
            data={data}
            width={width}
            height={220}
            chartConfig={chartConfig}
          />

          <LineChart
            data={data}
            width={width}
            height={220}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          />

          <ProgressChart
            data={dataProgress}
            width={width}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />

          <BarChart
            data={dataBar}
            width={width}
            height={250}
            yAxisLabel="R$ "
            chartConfig={chartConfig}
            verticalLabelRotation={20}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default ViewChart;