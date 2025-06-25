<template>
  <div class="chart-container">
    <apexchart type="bar" :options="chartOptions" :series="chartSeries" height="380" />
    <div class="comparison-text">
      {{ comparisonText }}
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts'

export default {
  name: 'EnergyDistributionChart',
  components: { apexchart: ApexCharts },
  props: {
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
    chartSeries() {
      return [
        {
          name: 'Energia Solar',
          data: [this.dailySelfUseEnergy],
        },
        {
          name: 'Energia da Rede',
          data: [this.dailyUseEnergy],
        },
      ]
    },
    comparisonText() {
      const solar = this.dailySelfUseEnergy
      const rede = this.dailyUseEnergy

      if (solar === rede) return 'A produção solar e o consumo da rede foram iguais hoje.'

      const diff = Math.abs(solar - rede)
      const percent = ((diff / Math.max(solar, rede)) * 100).toFixed(1)

      return solar > rede
        ? `Hoje, a energia solar representou ${percent}% mais que a energia da rede.`
        : `Hoje, a energia da rede representou ${percent}% mais que a energia solar.`
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          stacked: 'true',
          toolbar: { show: false },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '20%',
            endingShape: 'rounded',
            dataLabels: {
              position: 'center',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(2) + ' kWh'
          },
          style: {
            fontSize: '28px',    // Aumentado aqui (antes 22px)
            fontWeight: 'bold',
            colors: ['#fff'],
          },
        },
        xaxis: {
          categories: ['Hoje'],
          title: {
            text: 'Período do Dia',
            style: {
              fontSize: '20px',   // Aumentado (antes 16px)
              fontWeight: 'bold',
            },
          },
          labels: {
            style: {
              fontSize: '16px',  // opcional para aumentar os labels do eixo X
              colors: '#263238',
            }
          }
        },
        yaxis: {
          title: {
            text: 'Energia (kWh)',
            style: {
              fontSize: '22px',   // Aumentado (antes 18px)
              fontWeight: 'bold',
              color: '#263238'
            }
          },
          labels: {
            style: {
              fontSize: '18px',  // Aumentado (antes 14px)
              colors: '#263238'
            }
          },
          min: 0,
        },
        legend: {
          position: 'top',
          labels: {
            colors: '#263238',
            fontSize: '18px',   // aumentar fonte da legenda
          }
        },
        colors: ['#4CAF50', '#FF9800'],
        title: {
          text: 'Distribuição Diária de Energia',
          align: 'center',
          style: {
            fontSize: '32px',    // Aumentado (antes 26px)
            fontWeight: 'bold',
            color: '#263238',
          },
        },
      },
    }
  },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: auto;
}

.comparison-text {
  text-align: center;
  margin-top: 14px;
  font-size: 20px;
  /* Aumentado (antes 16px) */
  font-weight: bold;
  color: #333;
  /* pode trocar para uma cor mais vibrante, tipo #1976D2 */
}
</style>
