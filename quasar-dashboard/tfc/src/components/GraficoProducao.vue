<template>
  <div>
    <apexchart :options="chartOptions" :series="chartData" height="350" type="area" />
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts';

export default {
  name: 'GraficoPotenciaAtual',
  components: { apexchart: ApexCharts },
  props: {
    currentPowerSeries: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chartCategories() {
      // Gera as horas fixas de 00:00 até 23:00
      const fixedHours = [];
      for (let i = 0; i < 24; i++) {
        fixedHours.push(i.toString().padStart(2, '0') + ':00');
      }
      return fixedHours;
    },
    chartData() {
      const fixedHours = this.chartCategories;

      // Mapeia os valores por hora
      const valuesByHour = {};
      this.currentPowerSeries.forEach(point => {
        const d = new Date(point.time);
        const hourStr = d.getHours().toString().padStart(2, '0') + ':00';
        valuesByHour[hourStr] = parseFloat(point.value.toFixed(2));
      });

      // Alinha os dados às horas fixas
      const alignedData = fixedHours.map(hour => valuesByHour[hour] ?? null);

      return [
        {
          name: 'Potência Atual (kW)',
          data: alignedData,
          color: '#4CAF50',
          fill: {
            type: 'solid',
            opacity: 0.1
          }
        }
      ];
    }
  },
  data() {
    return {
      chartOptions: {
        chart: { zoom: { enabled: false } },
        dataLabels: { enabled: false },
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        title: {
          text: 'Potência Atual ao Longo do Dia',
          align: 'center',
          style: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#263238'
          }
        },
        stroke: { curve: 'smooth' },
        xaxis: {
          categories: [], // será preenchido via computed
          axisTicks: {
            show: true,
            borderType: 'dashed'
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            style: {
              fontSize: '16px',
              colors: '#263238'
            }
          }
        },
        yaxis: {
          title: {
            text: 'kW',
            style: {
              fontSize: '20px',
              color: '#263238',
              fontWeight: 'bold'
            }
          },
          labels: {
            style: {
              fontSize: '16px',
              colors: '#263238'
            }
          },
          min: 0
        },
        legend: { position: 'top' },
        tooltip: { shared: true, intersect: false },
        grid: {
          borderColor: '#888888',
          strokeWidth: 0.5,
          yaxis: {
            lines: {
              show: true,
              dashArray: [1, 1]
            }
          },
          xaxis: {
            lines: {
              show: false
            }
          }
        }
      }
    };
  },
  mounted() {
    // Define as categorias fixas no mount
    this.chartOptions.xaxis.categories = this.chartCategories;
  }
};
</script>
