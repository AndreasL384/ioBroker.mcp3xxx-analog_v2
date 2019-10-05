![Logo](admin/mcp3xxx-analog.png)
# ioBroker.mcp3xxx-analog

[![NPM version](http://img.shields.io/npm/v/iobroker.mcp3xxx-analog.svg)](https://www.npmjs.com/package/iobroker.mcp3xxx-analog)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mcp3xxx-analog.svg)](https://www.npmjs.com/package/iobroker.mcp3xxx-analog)
[![Dependency Status](https://img.shields.io/david/raspilc/iobroker.mcp3xxx-analog.svg)](https://david-dm.org/raspilc/iobroker.mcp3xxx-analog)
[![Known Vulnerabilities](https://snyk.io/test/github/raspilc/ioBroker.mcp3xxx-analog/badge.svg)](https://snyk.io/test/github/raspilc/ioBroker.mcp3xxx-analog)

[![NPM](https://nodei.co/npm/iobroker.mcp3xxx-analog.png?downloads=true)](https://nodei.co/npm/iobroker.mcp3xxx-analog/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/raspilc/ioBroker.mcp3xxx-analog/master.svg)](https://travis-ci.org/raspilc/ioBroker.mcp3xxx-analog)

## mcp3xxx-analog adapter for ioBroker

This adapter provides support for Microchips MCP3xxx A/D-converter IC's with SPI-Port.
It works on SBC's that has an SPI-Interface like Raspberry Pi, Tinkerboard or Banana Pi.

Simply wire the IC to your SPI-port, enable SPI in config (raspi-config etc.) and install adapter.

After that in adapters settings select the correct bus, device, the used A/D-converter and the desired interval for reading the values.

Supported A/D-converters : MCP3002, MCP3004, MCP3008 (2,4 or 8 channels, 10bit resolution),
													 MCP3202, MCP3204, MCP3208 (2,4 or 8 channels, 12bit resolution)



## Changelog

### 0.0.1
* (raspilc) initial release

## License
MIT License

Copyright (c) 2019 raspilc <info@raspilc.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
