<template>
  <q-page padding class="solar-dashboard">
    <!-- Cabeçalho do Dashboard -->
    <div class="q-pa-sm bg-white text-dark shadow-1">

      <div>
        <div class="text-subtitle2">Universidade Lusófona</div>
        <div class="text-caption text-grey-7">
          Edifício U
        </div>
      </div>
    </div>

    <!-- Cards de métricas principais -->
    <div class="row q-col-gutter-sm q-mt-md">
      <!-- Monthly Yield -->
<div class="col-3">
  <q-card flat bordered class="text-center">
    <q-card-section>
      <div class="row items-center justify-center q-mb-sm">
        <q-icon name="battery_charging_full" size="32px" color="primary" class="q-mr-sm" />
        <div class="text-subtitle2">Monthly Yield</div>
      </div>
      <div class="text-h6">{{ monthEnergy}} kWh</div>
      <div class="text-caption">
      </div>
    </q-card-section>
  </q-card>
</div>

<!-- Yearly Yield -->
<div class="col-3">
  <q-card flat bordered class="text-center">
    <q-card-section>
      <div class="row items-center justify-center q-mb-sm">
        <q-icon name="calendar_today" size="32px" color="primary" class="q-mr-sm" />
        <div class="text-subtitle2">Yearly Yield</div>
      </div>
      <div class="text-h6">{{ yearEnergy}} kWh</div>
      <div class="text-caption">
      </div>
    </q-card-section>
  </q-card>
</div>


      <!-- CO2 Reduction -->
      <div class="col-3">
    <q-card flat bordered class="text-center">
      <q-card-section>
        <div class="row items-center justify-center q-mb-sm">
          <q-icon name="eco" size="32px" color="primary" class="q-mr-sm" />
          <div class="text-subtitle2">CO₂ Reduction</div>
        </div>
        <div class="text-h6">{{ co2Reduction.toFixed(2) }} tons</div>
        <div class="text-caption">
          Equivalent to planting <strong>{{ treesPlanted }}</strong> trees 🌳
        </div>
      </q-card-section>
    </q-card>
  </div>

      <!-- System Efficiency -->
      <div class="col-3">
        <q-card flat bordered class="text-center">
          <q-card-section>
            <div class="row items-center justify-center q-mb-sm">
              <q-icon name="speed" size="32px" color="primary" class="q-mr-sm" />
              <div class="text-subtitle2">System Efficiency</div>
            </div>
            <div class="text-h6">24.86%</div>
            <div class="text-caption">
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="row q-col-gutter-sm q-mt-md">
      <div class="col-6">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-body2 text-grey-7 q-mt-sm">

          <EnergyConsumptionProductionChart
  :dailySelfUseEnergy="dailySelfUseEnergy"
  :dailyUseEnergy="dailyUseEnergy"
/>
        </div>
      </q-card-section>
    </q-card>
  </div>

      <div class="col-6">
        <q-card flat bordered>
          <q-card-section>

            <div class="text-body2 text-grey-7 q-mt-sm">
            <!-- Usando o componente EnergyDistribution -->
            <EnergyDistribution
              :dailySelfUseEnergy="dailySelfUseEnergy"
              :dailyUseEnergy="dailyUseEnergy"
              :currentPower="currentPower"
            />
          </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Secção de custos -->
    <div class="row q-col-gutter-sm q-mt-md">
      <div class="col-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Daily Energy Cost Savings</div>
            <div class="text-h6 text-positive">€{{ (dailySelfUseEnergy * 0.19).toFixed(2) }}</div>
            <div class="text-caption">
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2">Daily Grid Energy Cost</div>
            <div class="text-h6 text-negative">€{{ (dailyUseEnergy * 0.19).toFixed(2) }}</div>
            <div class="text-caption">
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import influxService from 'src/api/influxService.js';
import EnergyConsumptionProductionChart from 'src/components/EnergyConsumptionProductionChart.vue';
import EnergyDistribution from 'src/components/EnergyDistribution.vue';



export default {
  components: {
    EnergyConsumptionProductionChart,
    EnergyDistribution
  },
  computed: {
    co2Reduction() {
      const factor = 0.169 / 1000; // Converter kg para toneladas
      return this.yearEnergy * factor;
    },
    treesPlanted() {
    const co2PerTree = 0.021; // Cada árvore captura 0.021 toneladas de CO₂ por ano
    return Math.round(this.co2Reduction / co2PerTree);
  }
  },


  name: 'SolarDashboardPage',
  setup() {
    const org = ref("energy");
    const bucket = ref("energy");
    const query = ref(`
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "solar_power")
      |> filter(fn: (r) => r["_field"] == "current_power" or r["_field"] == "daily_self_use_energy" or r["_field"] == "daily_use_energy" or r["_field"] == "month_energy" or r["_field"] == "year_energy")
      |> last()
    `);

    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const monthEnergy = ref(0);
    const yearEnergy = ref(0);
    const dailySelfUseEnergy = ref(0);
    const dailyUseEnergy = ref(0);
    const currentPower = ref(0);


    const fetchData = async () => {
      console.log("Fetching data from InfluxDB...");
      loading.value = true;
      error.value = null;

      try {
        const response = await influxService.queryInfluxDB({
          org: org.value,
          bucket: bucket.value,
          fluxQuery: query.value
        });

        console.log("API Response:", response);

        // Filtrar os valores específicos de month_energy e year_energy
        const dailySelfUseEnergyResult = response.trim().split('\n').find(row => row.includes('daily_self_use_energy'));
       const dailyUseEnergyResult = response.trim().split('\n').find(row => row.includes('daily_use_energy'));
        const monthResult = response.trim().split('\n').find(row => row.includes('month_energy'));
        const yearResult = response.trim().split('\n').find(row => row.includes('year_energy'));
        const currentPowerResult = response.trim().split('\n').find(row => row.includes('current_power'));

        // Extrair os valores corretos
        dailySelfUseEnergy.value = dailySelfUseEnergyResult ? parseFloat(dailySelfUseEnergyResult.split(',')?.[6]) || 0 : 0;
        dailyUseEnergy.value = dailyUseEnergyResult ? parseFloat(dailyUseEnergyResult.split(',')?.[6]) || 0 : 0;
        monthEnergy.value = monthResult ? parseFloat(monthResult.split(',')?.[6]) || 0 : 0;
        yearEnergy.value = yearResult ? parseFloat(yearResult.split(',')?.[6]) || 0 : 0;
        currentPower.value = currentPowerResult ? parseFloat(currentPowerResult.split(',')?.[6]) || 0 : 0;


        console.log("Daily Self Use Energy:", dailySelfUseEnergy.value);
      console.log("Daily Use Energy:", dailyUseEnergy.value);
        console.log("Month Energy:", monthEnergy.value);
        console.log("Year Energy:", yearEnergy.value);
        console.log("Current:", currentPower.value);

      } catch (err) {
        console.error("Error fetching data:", err);
        error.value = "Failed to fetch data: " + err.message;
      } finally {
        loading.value = false;
      }
    };

    // Chamar a API assim que o componente for carregado
    onMounted(() => {
      fetchData();
    });

    return { org, bucket, query, fetchData, data, error, loading, monthEnergy, yearEnergy, dailySelfUseEnergy, dailyUseEnergy, currentPower};
  },
};



</script>

<style scoped>
.solar-dashboard {
  background-color: #f7f8fa;
  min-height: 100%;
}

.rounded-borders {
  border-radius: 8px;
}
</style>
