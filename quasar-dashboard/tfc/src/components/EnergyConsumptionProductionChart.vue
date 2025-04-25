<template>
  <div>
    <apexchart type="line" :options="chartOptions" :series="chartData" height="350"></apexchart>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts';

export default {
  name: 'EnergyConsumptionProductionChart',
  components: {
    apexchart: ApexCharts
  },
  props: {
    dailySelfUseEnergy: Number,  // Energia solar usada internamente
    dailyUseEnergy: Number       // Consumo total diário
  },
  computed: {
  chartData() {
    return [
      {
        name: 'Consumo Total Diário (kWh)',
        data: Array(12).fill(parseFloat((this.dailyUseEnergy / 12).toFixed(2))),
        color: '#2980B9'
      },
      {
        name: 'Uso Interno da Produção Solar (kWh)',
        data: Array(12).fill(parseFloat((this.dailySelfUseEnergy / 12).toFixed(2))),
        color: '#27AE60'
      }
    ];
  }
}
,
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'line',
          zoom: { enabled: false }
        },
        title: {
          text: 'Produção vs Consumo de Energia',
          align: 'left',
          style: { fontSize: '18px', fontWeight: 'bold', color: '#263238' }
        },
        stroke: { curve: 'smooth' },
        xaxis: {
          categories: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          title: { text: 'Hora do Dia', style: { fontSize: '14px', color: '#263238' } }
        },
        yaxis: {
          title: { text: 'kWh', style: { fontSize: '14px', color: '#263238' } },
          min: 0
        },
        legend: { position: 'top' },
        tooltip: { shared: true, intersect: false }
      }
    };
  }
};
</script>
