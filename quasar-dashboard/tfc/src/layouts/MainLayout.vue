<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="my-toolbar">

        <q-img
          src="/src/assets/logotipo-horizontal-centro-universitario-lisboa-branco-png.png"
          alt="Logo"
          class="logo-img"
          :style="{ width: '350px', height: 'auto' }"
        />


        <q-space />


        <div class="date-time">
          <span>{{ currentDate }}</span>

        </div>


        <div class="temperature">

  <span class="material-icons" :style="{ color: temperatureColor, marginRight: '12px', fontSize: '20px'}">
    sunny
  </span>
  <span v-if="temperature !== null">{{ temperature }}°C</span>
  <span v-else>Loading temperature...</span>
</div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentDate: '',
      currentTime: '',
      temperature: null,
      temperatureColor: 'yellow', // Cor padrão do ícone (amarelo)
    };
  },
  created() {
    this.updateDateTime();
    this.fetchTemperature();
    setInterval(this.updateDateTime, 1000 * 60); // Atualiza a data e hora a cada 1 minuto
  },
  methods: {
    // Função para formatar e exibir a data e hora
    updateDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString('pt-PT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      this.currentTime = now.toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
    // Função para buscar a temperatura da nova API
    async fetchTemperature() {
      try {
        const response = await axios.get(
          'https://api.open-meteo.com/v1/forecast?latitude=38.7167&longitude=-9.1333&hourly=temperature_2m'
        );

        if (response.data && response.data.data && response.data.data.temp) {
          this.temperature = response.data.data.temp[0]; // Pega a temperatura do primeiro valor disponível
          this.setTemperatureColor(); // Atualiza a cor do ícone com base na temperatura
        }
      } catch (error) {
        console.error('Erro ao buscar temperatura:', error);
        this.temperature = null; // Se houver erro, mantém nulla
      }
    },
    // Função para definir a cor do ícone com base na temperatura
    setTemperatureColor() {
      if (this.temperature > 30) {
        this.temperatureColor = 'red'; // Temperatura alta
      } else if (this.temperature > 20) {
        this.temperatureColor = 'orange';
      } else if (this.temperature > 10) {
        this.temperatureColor = 'yellow';
      } else {
        this.temperatureColor = 'blue'; // Frio
      }
    },
  },
};
</script>


<style scoped>

.my-toolbar {
  height: 100px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.logo-img {
  max-height: 100%;
  object-fit: contain;
}


.date-time {
  font-size: 14px;
  font-weight: 400;
  margin-right: 14px;
}


.temperature {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
</style>
