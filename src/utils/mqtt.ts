import mqtt from "npm:mqtt";

const MQTT_CONFIG = {
  broker: Deno.env.get("MQTT_BROKER"),
  port: Number(Deno.env.get("MQTT_PORT")),
  user: Deno.env.get("MQTT_USER"),
  pass: Deno.env.get("MQTT_PASS"),
  tempTopic: Deno.env.get("MQTT_TEMP_TOPIC"),
  controlTopic: Deno.env.get("MQTT_CONTROL_TOPIC"),
} as {
  broker: string;
  port: number;
  user: string;
  pass: string;
  tempTopic: string;
  controlTopic: string;
};

export const mqttConfig = MQTT_CONFIG;

export let mqttClient;

if (
  mqttConfig.broker && mqttConfig.port && mqttConfig.user && mqttConfig.pass &&
  mqttConfig.tempTopic && mqttConfig.controlTopic
) {
  mqttClient = mqtt.connect(mqttConfig.broker, {
    port: mqttConfig.port,
    username: mqttConfig.user,
    password: mqttConfig.pass,
  });

  mqttClient.on("connect", () => {
    console.log("MQTT client connected successfully.");
  });

  mqttClient.on("error", (err: Error) => {
    console.error("MQTT client error:", err);
  });
}

/**
 * Starts the MQTT listener.
 * Fetches temperature data from the MQTT broker and stores it in Deno KV.
 */
export async function startMqttListener() {
  console.log("Starting MQTT listener...");

  if (
    !mqttConfig.broker || !mqttConfig.port || !mqttConfig.user ||
    !mqttConfig.pass || !mqttConfig.tempTopic || !mqttConfig.controlTopic
  ) {
    console.error(
      "MQTT configuration is missing. Please check your .env file.",
    );

    return;
  }

  const client = mqtt.connect(mqttConfig.broker, {
    port: mqttConfig.port,
    username: mqttConfig.user,
    password: mqttConfig.pass,
  });

  const kv = await Deno.openKv();

  console.log("Deno KV store opened successfully.");

  client.on("connect", () => {
    console.log("Connected to MQTT broker successfully.");

    client.subscribe(mqttConfig.tempTopic, (err: unknown) => {
      if (err) {
        console.error("Failed to subscribe to temperature topic:", err);
      } else {
        console.log(`Subscribed to topic: ${mqttConfig.tempTopic}`);
      }
    });
  });

  client.on("message", async (topic: string, message: unknown) => {
    console.log(`Received message on topic ${topic}:`, message);

    if (topic === mqttConfig.tempTopic) {
      const tempData = new TextDecoder().decode(message as ArrayBuffer);

      const newTemp = {
        timestamp: Date.now(),
        temperature: parseFloat(tempData),
      };

      console.log("Storing temperature data:", newTemp);
      await kv.set(["temperature", newTemp.timestamp.toString()], newTemp);

      console.log("Temperature data stored in Deno KV.");
    }
  });

  client.on("error", (err: Error) => {
    console.error("MQTT connection error:", err);
  });
}

mqttClient && startMqttListener().catch((err) => {
  console.error("Error starting MQTT listener:", err);
});
