// file: api/influxService.js
import axios from "axios";

const influxService = {
  async queryInfluxDB({ org, bucket, fluxQuery }) {
    try {
      const response = await axios.post(
        `https://influx.spaces.deisi.ulusofona.pt/api/v2/query?org=${org}`,
        {
          query: `from(bucket: "${bucket}") ${fluxQuery}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token NEWauHm4dAF8xxvugk_zafO9X8dbx-UYXS6gQzl608iTvWQdkIIrzv6RQ8pYYtTTsD1T1d9fvXZ1HH6NwFi6pg==`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("InfluxDB Query Error:", error);
      throw error;
    }
  },
};

export default influxService;
