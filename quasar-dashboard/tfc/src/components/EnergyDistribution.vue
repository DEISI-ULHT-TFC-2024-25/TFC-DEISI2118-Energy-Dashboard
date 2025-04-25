<template>
  <div class="chart-container">
    <!-- Usando o componente ApexCharts para exibir o gráfico de pizza -->
    <apexchart type="donut" :options="chartOptions" :series="chartData" height="300"></apexchart>
  </div>
</template>

<script>
// Importando o ApexCharts
import ApexCharts from 'vue3-apexcharts'

export default {
  name: 'EnergyDistributionChart',
  components: {
    apexchart: ApexCharts, // Componente ApexCharts
  },
  props: {
    // Recebendo os dados como props da página principal
    dailySelfUseEnergy: {
      type: Number,
      required: true,
    },
    dailyUseEnergy: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // Definindo os dados do gráfico com base nas props recebidas
    chartData() {
      return [
        this.dailySelfUseEnergy, // Energia gerada pelo painel solar
        this.dailyUseEnergy, // Energia do grid
      ]
    },
  },
  data() {
    return {
      // Opções de configuração do gráfico
      chartOptions: {
        chart: {
          align: 'center',
          type: 'donut', // Tipo de gráfico
        },
        title: {
          text: 'Energy Distribution',
          align: 'left',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#263238',
          },
        },
        labels: ['Solar Panel Energy', 'Grid Energy'], // Labels para as fatias do gráfico
        colors: ['#FF9800', '#4CAF50'], // Cores das fatias
        tooltip: {
          shared: true,
          intersect: false,
        },
      },
    }
  },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>
