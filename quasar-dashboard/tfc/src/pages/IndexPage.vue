<template>
  <q-page padding class="solar-dashboard scale-dashboard">

    <div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%;">
      <div class="text-subtitle1" style="font-size: 2.5rem; font-weight: 600;">
        Universidade Lusófona
      </div>

    </div>


    <transition name="fade" mode="out-in">
      <div :key="currentGroup" class="row q-col-gutter-sm q-mt-md">
        <template v-if="currentGroup === 1">

          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <div class="row items-center justify-center q-mb-sm">
                  <q-icon name="solar_power" size="32px" color="orange" class="q-mr-sm" />
                  <div class="text-subtitle2 text-orange">Produção Mensal</div>
                </div>
                <div class="text-h6">{{ monthEnergy }} kWh</div>
              </q-card-section>
            </q-card>
          </div>


          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <div class="row items-center justify-center q-mb-sm">
                  <q-icon name="date_range" size="32px" color="deep-orange" class="q-mr-sm" />
                  <div class="text-subtitle2 text-deep-orange">Produção Anual</div>
                </div>
                <div class="text-h6">{{ yearEnergy }} kWh</div>
              </q-card-section>
            </q-card>
          </div>


          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <div class="row items-center justify-center q-mb-sm">
                  <q-icon name="eco" size="32px" color="green" class="q-mr-sm" />
                  <div class="text-subtitle2 text-green">Redução de CO₂</div>
                </div>
                <div class="text-h6">{{ co2Reduction.toFixed(2) }} toneladas</div>
              </q-card-section>
            </q-card>
          </div>


          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <div class="row items-center justify-center q-mb-sm">
                  <q-icon name="speed" size="32px" color="purple" class="q-mr-sm" />
                  <div class="text-subtitle2 text-purple">Eficiência do Sistema</div>
                </div>
                <div class="text-h6">24.86%</div>
              </q-card-section>
            </q-card>
          </div>


        </template>

        <template v-else-if="currentGroup === 2">
          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <q-icon name="account_balance_wallet" size="32px" color="positive" class="q-mb-sm" />
                <div class="row items-center justify-center q-mb-sm">
                  <div class="text-subtitle2 text-positive">Poupança Mensal</div>
                </div>
                <div class="text-h6 text-positive">€{{ (monthEnergy * 0.19).toFixed(2) }}</div>
              </q-card-section>
            </q-card>
          </div>




          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <q-icon name="account_balance" size="32px" color="positive" class="q-mb-sm" />

                <div class="row items-center justify-center q-mb-sm">
                  <div class="text-subtitle2 text-positive">Poupança Anual</div>
                </div>

                <div class="text-h6 text-positive">€{{ (yearEnergy * 0.19).toFixed(2) }}</div>
              </q-card-section>
            </q-card>
          </div>


          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <div class="row items-center justify-center q-mb-sm">
                  <q-icon name="eco" size="32px" color="secondary" class="q-mr-sm" />
                  <div class="text-subtitle2 text-secondary">Equivalente a Árvores Plantadas</div>
                </div>
                <div class="text-h6">{{ treesPlanted }}</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <div class="row items-center justify-center q-mb-sm">
                  <q-icon name="electric_car" size="32px" color="secondary" class="q-mr-sm" />
                  <div class="text-subtitle2 text-secondary">Autonomia Estimada com a Produção Mensal</div>
                </div>
                <div class="text-h6">
                  {{ monthEnergy ? (monthEnergy / 0.15).toFixed(0) + ' km' : '...' }}
                </div>
              </q-card-section>
            </q-card>
          </div>






        </template>

      </div>
    </transition>



    <div class="row q-col-gutter-sm q-mt-md">
      <div class="col-12 q-mt-md">
        <q-card bordered>
          <q-card-section>
            <div class="text-body2 text-grey-7 q-mt-sm">
              <GraficoPotenciaAtual :currentPowerSeries="currentPowerSeries" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 q-mt-md">
        <q-card bordered>
          <q-card-section>
            <div class="text-body2 text-grey-7 q-mt-sm">
              <EnergyDistribution :dailySelfUseEnergy="dailySelfUseEnergy" :dailyUseEnergy="dailyUseEnergy"
                :currentPower="currentPower" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div :key="currentGroup" class="row q-col-gutter-sm q-mt-md">
        <template v-if="currentGroup === 1">

          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <q-icon name="savings" size="32px" color="positive" class="q-mb-sm" />
                <div class="row items-center justify-center q-mb-sm">
                  <div class="text-subtitle2 text-positive">Poupança Diária</div>
                </div>
                <div class="text-h6 text-positive">€{{ (dailySelfUseEnergy * 0.19).toFixed(2) }}</div>
                <div class="text-h6">Energia usada da produção própria</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <q-icon name="bolt" size="32px" color="negative" class="q-mb-sm" />
                <div class="row items-center justify-center q-mb-sm">
                  <div class="text-subtitle2 text-negative">Custo da Rede</div>
                </div>
                <div class="text-h6 text-negative">€{{ (dailyUseEnergy * 0.19).toFixed(2) }}</div>
                <div class="text-h6">Energia consumida da rede</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <q-icon name="trending_up" size="32px" color="secondary" class="q-mb-sm" />
                <div class="row items-center justify-center q-mb-sm">
                  <div class="text-subtitle2 text-secondary">Eficiência Económica</div>
                </div>
                <div class="text-h6">{{ ((dailySelfUseEnergy / (dailyUseEnergy + dailySelfUseEnergy)) * 100).toFixed(1)
                }}%</div>
                <div class="text-h6">Proporção de consumo sem custo</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-6">
            <q-card bordered class="text-center">
              <q-card-section>
                <q-icon name="local_cafe" size="32px" color="brown" class="q-mb-sm" />
                <div class="row items-center justify-center q-mb-sm">
                  <div class="text-subtitle2 text-brown">Cafés comprados</div>
                </div>
                <div class="text-h6">☕ {{ Math.floor((dailySelfUseEnergy * 0.19) / 0.65) }}</div>
                <div class="text-h6">Com a poupança de hoje</div>
              </q-card-section>
            </q-card>
          </div>
        </template>

        <template v-else-if="currentGroup === 2">
          <div class="col-12">
            <div class="text-h4 text-primary q-mb-xl text-center">Últimas Notícias</div>
            <q-spinner v-if="loadingNoticias" size="lg" color="primary" class="flex flex-center q-mt-xl" />
            <div v-else class="row q-col-gutter-sm">
              <div v-for="noticia in noticias.slice(0, 4)" :key="noticia.id" class="col-12">
                <q-card class="full-height" bordered>
                  <q-card-section class="row no-wrap justify-between items-start">
                    <div class="col" style="padding-right: 8px;">
                      <div class="text-subtitle2 text-weight-bold text-primary ellipsis-2-lines q-mb-md">
                        {{ noticia.title }}
                      </div>
                      <div class="text-subtitle2 text-grey q-mb-sm">
                        {{ formatarData(noticia.start_date) }}
                      </div>
                      <div class="text-body2 text-grey-9 ellipsis-3-lines">
                        {{ noticia.leading }}
                      </div>
                    </div>

                    <img :src="getImageUrl(noticia.image)" alt="Imagem da Notícia"
                      style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;" />
                  </q-card-section>

                  <q-separator />
                </q-card>
              </div>
            </div>
          </div>


        </template>




      </div>
    </transition>

    <div class="row q-col-gutter-sm q-mt-xl justify-center">
      <div class="col-12 col-sm-6 col-md-6">
        <q-card bordered class="text-center bg-white shadow-2 rounded-borders">
          <q-card-section style="padding: 41px;">
            <div class="text-h4 text-primary q-mb-sm" style="letter-spacing: 1px; font-weight: 700;">
              {{ currentTime }}
            </div>
            <div class="text-caption text-grey-6"
              style="font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
              Hora Atual
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-6">
        <q-card bordered class="text-center q-pa-md" style="min-width: 160px;">
          <div class="row items-center justify-center q-mb-sm">
            <div class="text-subtitle2 q-mb-sm text-light">
              Temperatura Atual
            </div>
          </div>

          <div class="temp-row row items-center justify-center no-wrap" style="gap: 12px;">
            <img :src="weatherIcon" alt="Weather Icon" class="temp-icon" style="width: 40px; height: 40px;" />
            <div class="temp-value text-h4" style="font-weight: 600; color: #222;">
              {{ temperature !== null ? temperature.toFixed(1) + '°C' : '...' }}
            </div>
          </div>
          <div class="weather-description text-h6 q-mt-sm" style="color: #666;">
            {{ weatherDescription }}
          </div>
        </q-card>
      </div>
    </div>





  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import influxService from 'src/api/influxService.js';
import GraficoPotenciaAtual from 'src/components/GraficoProducao.vue';
import EnergyDistribution from 'src/components/EnergyDistribution.vue';


export default {

  props: {
    temp: Number,
    icon: String,
    weatherCodeChild: Number
  },

  components: {
    GraficoPotenciaAtual,
    EnergyDistribution
  },
  computed: {

    weatherDescription() {
      const code = this.weatherCode;
      switch (code) {
        case 0: return 'Céu Limpo';
        case 1: return 'Principalmente limpo';
        case 2: return 'Parcialmente nublado';
        case 3: return 'Nublado';
        case 45: return 'Nevoeiro';
        case 48: return 'Geada';
        case 51: return 'Chuvisco leve';
        case 53: return 'Chuvisco moderado';
        case 55: return 'Chuvisco intenso';
        case 56: return 'Chuvisco congelante leve';
        case 57: return 'Chuvisco congelante intenso';
        case 61: return 'Chuva leve';
        case 63: return 'Chuva moderada';
        case 65: return 'Chuva forte';
        case 66: return 'Chuva congelante leve';
        case 67: return 'Chuva congelante forte';
        case 71: return 'Neve leve';
        case 73: return 'Neve moderada';
        case 75: return 'Neve forte';
        case 77: return 'Grãos de neve';
        case 80: return 'Chuva forte leve';
        case 81: return 'Chuva forte moderada';
        case 82: return 'Chuva forte violenta';
        case 85: return 'Nevasca leve';
        case 86: return 'Nevasca forte';
        case 95: return 'Trovoada leve ou moderada';
        case 96: return 'Trovoada com granizo leve';
        case 99: return 'Trovoada com granizo forte';
        default: return 'Descrição indisponível';
      }
    },

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
    const currentTime = ref(new Date().toLocaleTimeString());
    let timer = null
    const currentGroup = ref(1);
    let intervalId = null;

    const temperature = ref(null);
    const weatherCode = ref(null);
    const isDay = ref(true); // Para decidir se mostra 'd' ou 'n'
    const weatherIcon = ref('');

    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.7167&longitude=-9.1333&current=temperature_2m,weather_code');
        const data = await res.json();

        temperature.value = data.current.temperature_2m;
        weatherCode.value = data.current.weather_code;

        // Pega a hora atual da API em UTC
        const currentTime = new Date(data.current.time + 'Z'); // adiciona Z para UTC
        const hour = currentTime.getUTCHours();

        // Considera dia se entre 6h e 18h
        isDay.value = hour >= 6 && hour < 18;

        // Monta o nome do arquivo SVG
        weatherIcon.value = new URL(
          `/src/assets/svg/wmo_icon_${weatherCode.value.toString().padStart(2, '0')}${isDay.value ? 'd' : 'n'}.svg`,
          import.meta.url
        ).href;

      } catch (e) {
        console.error('Erro ao buscar clima:', e);
      }
    };

    const org = ref("energy");
    const bucket = ref("energy");
    const query = ref(`
      |> range(start: -30d)
      |> filter(fn: (r) => r["_measurement"] == "solar_power")
      |> filter(fn: (r) => r["_field"] ==  "daily_self_use_energy" or r["_field"] == "daily_use_energy" or r["_field"] == "month_energy" or r["_field"] == "year_energy")
      |> last()
    `);

    const currentPowerQuery = ref(`
      |> range(start: today())
      |> filter(fn: (r) => r["_measurement"] == "solar_power" and r["_field"] == "current_power")
      |> aggregateWindow(every: 1h, fn: last, createEmpty: false)
      |> yield(name: "hourly")
    `);

    const currentPowerSeries = ref([]);

    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const monthEnergy = ref(0);
    const yearEnergy = ref(0);
    const dailySelfUseEnergy = ref(0);
    const dailyUseEnergy = ref(0);
    const currentPower = ref(0);

    // --- Novas refs para notícias ---
    const noticias = ref([]);
    const loadingNoticias = ref(true);

    const fetchNoticias = async () => {
      loadingNoticias.value = true;
      try {
        const res = await fetch('https://www.ulusofona.pt/api/search/news?lang=pt&q=&page=1&tab=noticias');
        const json = await res.json();
        noticias.value = json.data.news;
      } catch (e) {
        console.error('Erro ao buscar notícias:', e);
      } finally {
        loadingNoticias.value = false;
      }
    };

    // Reutilizar funções para a imagem, data e link
    const getImageUrl = (image) => {
      if (!image || !image.image_name) {
        return 'https://via.placeholder.com/150?text=Sem+Imagem';
      }
      return `https://www.ulusofona.pt/images/${image.image_name}_150.jpg`;
    };

    const formatarData = (dataStr) => {
      return new Date(dataStr).toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getLink = (noticia) => {
      return noticia.link || `https://www.ulusofona.pt/noticias/${noticia.slug}`;
    };

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

        const dailySelfUseEnergyResult = response.trim().split('\n').find(row => row.includes('daily_self_use_energy'));
        const dailyUseEnergyResult = response.trim().split('\n').find(row => row.includes('daily_use_energy'));
        const monthResult = response.trim().split('\n').find(row => row.includes('month_energy'));
        const yearResult = response.trim().split('\n').find(row => row.includes('year_energy'));
        const currentPowerResult = response.trim().split('\n').find(row => row.includes('current_power'));

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

    const fetchCurrentPowerSeries = async () => {
      try {
        const response = await influxService.queryInfluxDB({
          org: org.value,
          bucket: bucket.value,
          fluxQuery: currentPowerQuery.value
        });

        const lines = response.trim().split('\n').slice(1);
        const series = lines.map(line => {
          const cols = line.split(',');
          return {
            time: cols[5],
            value: parseFloat(cols[6]) || 0
          };
        });
        currentPowerSeries.value = [...series];
      } catch (err) {
        console.error("Error fetching current power series:", err);
      }
    };

    // Rodar fetch e alternar grupos
    onMounted(() => {
      fetchData();
      fetchCurrentPowerSeries();
      fetchNoticias();
      fetchWeather();

      intervalId = setInterval(() => {
        currentGroup.value = currentGroup.value === 1 ? 2 : 1;
      }, 30000);

      timer = setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString()
      }, 1000);
    });



    onUnmounted(() => {
      clearInterval(intervalId);
      clearInterval(timer);
    });

    return {
      currentGroup,
      org,
      bucket,
      query,
      fetchData,
      data,
      error,
      loading,
      monthEnergy,
      yearEnergy,
      dailySelfUseEnergy,
      dailyUseEnergy,
      currentPower,
      currentPowerSeries,
      noticias,
      loadingNoticias,
      getImageUrl,
      formatarData,
      getLink,
      temperature,
      weatherIcon,
      weatherCode,
      currentTime
    };
  },
};
</script>

<style scoped>
.solar-dashboard {
  background-color: #f7f8fa;
  min-height: 100%;
}

.solar-dashboard .q-card {
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.q-card {
  border-radius: 4px !important;
}

.rounded-borders {
  border-radius: 8px;
}

.ellipsis-2-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ellipsis-3-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.scale-dashboard {
  font-size: 1.25rem;
  /* aumenta o texto base */
}

.scale-dashboard .q-icon {
  font-size: 48px !important;
  /* ícones maiores */
}

.scale-dashboard .text-subtitle2 {
  font-size: 1.8rem !important;
}

.scale-dashboard .text-h6 {
  font-size: 1.5rem !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7) !important;
  /* preto 70% opaco */
}
</style>
