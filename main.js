"use strict";

/*
 * Created with @iobroker/create-adapter v1.16.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");
const mcpadc = require('spi-device');
// Load your modules here, e.g.:
// const fs = require("fs");

class Mcp3xxxAnalog extends utils.Adapter {

  /**
   * @param {Partial<ioBroker.AdapterOptions>} [options={}]
   */
  constructor(options) {
    super({
      ...options,
      name: "mcp3xxx-analog",
    });
    this.on("ready", this.onReady.bind(this));
    this.on("objectChange", this.onObjectChange.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    // this.on("message", this.onMessage.bind(this));
    this.on("unload", this.onUnload.bind(this));
  }

  /**
   * Is called when databases are connected and adapter received configuration.
   */
  async onReady() {

    var requiredchannels = (Number(this.config.SelectIC[6]));
    var n = 0;

    while (n < requiredchannels) {
      await this.setObjectNotExists('Channel' + n, {
        type: 'state',
        common: {
          name: 'Kanal' + n,
          type: 'number',
          role: 'value',
          read: true,
          write: true
        },
        native: {}
      });
      this.log.info("Channel " + n + " initialized");
      n++;
    };


    readanalog(this, Number(this.config.Bus), Number(this.config.device), requiredchannels, Number(this.config.Interval), Number(this.config.SelectIC[4]));

    this.subscribeStates("*");

  }

  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   * @param {() => void} callback
   */
  onUnload(callback) {
    try {
      this.log.info("cleaned everything up...");
      callback();
    } catch (e) {
      callback();
    }
  }

  /**
   * Is called if a subscribed object changes
   * @param {string} id
   * @param {ioBroker.Object | null | undefined} obj
   */
  onObjectChange(id, obj) {

  }

  /**
   * Is called if a subscribed state changes
   * @param {string} id
   * @param {ioBroker.State | null | undefined} state
   */
  onStateChange(id, state) {

  }



}

// @ts-ignore parent is a valid property on module
if (module.parent) {
  // Export the constructor in compact mode
  /**
   * @param {Partial<ioBroker.AdapterOptions>} [options={}]
   */
  module.exports = (options) => new Mcp3xxxAnalog(options);
} else {
  // otherwise start the instance directly
  new Mcp3xxxAnalog();
}

function readanalog(self, busNum, devNum, channels, readtime, resolution) {
  self.log.info("Start reading analog values at bus " + busNum + " device " + devNum + " on " + channels + " channels @ " + readtime + " ms interval" + " with resolution 1" + resolution + " Bit");

  const mcp = require('spi-device');
  try{
  const mcp3204 = mcp.open(busNum, devNum, (err) => {

    var i;
    for (i = 0; i < channels; i++) {
      (function(i) {
        setInterval(() => {

          if (resolution == 2) { 
            cmd = [0x04, ((0x00 + i) << 6), 0x00]; // Sent to read           
          } else { 
            cmd = [0x01, ((0x08 + i) << 4), 0x00]; // Sent to read
          };
              const message = [{

                sendBuffer: Buffer.from(cmd), // Sent to read
                receiveBuffer: Buffer.alloc(3), // received raw data
                byteLength: 3,
                speedHz: 20000
              }];
 
          if (err) throw err;
          
          mcp3204.transfer(message, (err, message) => {
            if (err) {
              throw err;
              self.log.warn("Error reading analog values");
            } else {
              if (resolution == 0) {
                self.setStateAsync(('Channel' + i), (((message[0].receiveBuffer[1] & 0x03) << 8) + message[0].receiveBuffer[2]), true);
              } else if (resolution == 2) {
                self.setStateAsync(('Channel' + i), (((message[0].receiveBuffer[1] & 0x0f) << 8) + message[0].receiveBuffer[2]), true);
              };
            };
          });
        }, readtime);
      })(i);
    }
  });
} catch (err) {
  self.log.warn("Error reading analog values. " + err)};
};
