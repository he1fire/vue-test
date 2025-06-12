<template>
  <div class="chart-container">
    <LineChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Line as LineChart } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// 미리 준비된 마작 점수 데이터
const players = ['▼', '▶', '▲', '◀']
const rounds = [
  '東1局 0本場', '東2局 0本場', '東3局 1本場', '東4局 0本場',
  '南1局 0本場', '南2局 1本場', '南3局 0本場', '南3局 1本場', '南4局 0本場'
]
const scores = [
  [22000, 30000, 24000, 24000],
  [21000, 29000, 26000, 23000],
  [30300, 26900, 21900, 20900],
  [30300, 34300, 14500, 20900],
  [28800, 32800, 16000, 21400],
  [25700, 26700, 29300, 18300],
  [23100, 24100, 37100, 15700],
  [21700, 22700, 34400, 21200],
  [33700, 10700, 34400, 21200]
]

// 차트 데이터 변환
const datasets = players.map((player, idx) => ({
  label: player,
  data: scores.map(round => round[idx]),
  borderColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'][idx],
  backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'][idx] + '40',
  pointRadius: 5,
  tension: 0.1
}))

const chartData = ref({
  labels: rounds,
  datasets: datasets
})

const chartOptions = ref({
  responsive: true,
  // plugins: {
  //   legend: { position: 'top' }
  // },
  // scales: {
  //   y: {
  //     beginAtZero: false,
  //     ticks: {
  //       callback: value => `${value/10000}만`
  //     }
  //   }
  // }
})

console.log('chartData:', chartData.value)
console.log('datasets:', datasets)
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>
