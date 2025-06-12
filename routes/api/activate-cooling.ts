import { Handlers } from "$fresh/server.ts";
import { mqttClient, mqttConfig } from "../../src/utils/mqtt.ts";

export const handler: Handlers = {
  POST(_req: Request): Response {
    try {
      console.log("Activating cooling system...");

      const CMD = "ACTIVATE";

      console.log("Connecting to MQTT broker...");

      if (!mqttClient.connected) {
        console.error("MQTT client is not connected.");
        return new Response("MQTT client is not connected.", { status: 500 });
      }

      mqttClient.publish(mqttConfig.controlTopic, CMD, {
        qos: 0,
        retain: false,
      });

      console.log(`Sent command to topic ${mqttConfig.controlTopic}: ${CMD}`);

      return new Response("Cooling system activated successfully.", {
        status: 200,
      });
    } catch (error) {
      console.error("Error activating cooling system:", error);
      return new Response("Failed to activate cooling system.", {
        status: 500,
      });
    }
  },
};
