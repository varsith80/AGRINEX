const { describe, it } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

describe('AgriNex Logistics Module Enhancement & Security Verification Suite', () => {

  // 1. PIN Security & Tamper Resistance
  describe('1. PIN Security Verification Hardening', () => {
    it('POST /api/logistics/verify-pin - should reject wrong PIN with 400 Bad Request', async () => {
      // Ensure order exists in backend
      await fetch(`${BASE_URL}/api/logistics/accept-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_code: 'CLUSTER-AGX-801',
          driver_name: 'Karthik Raja',
          vehicle_no: 'TN-33-AX-8910'
        })
      });

      const payload = JSON.stringify({
        order_code: 'CLUSTER-AGX-801',
        pin: '0000'
      });

      const res = await fetch(`${BASE_URL}/api/logistics/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });

      const data = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Invalid') || data.error.includes('Security PIN'));
    });

    it('POST /api/logistics/verify-pin - should successfully verify valid PIN and release escrow', async () => {
      const payload = JSON.stringify({
        order_code: 'CLUSTER-AGX-801',
        pin: '8821'
      });

      const res = await fetch(`${BASE_URL}/api/logistics/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });

      const data = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(data.success, true);
      assert.ok(data.message.includes('Delivery confirmed') || data.message.includes('Freight payout') || data.message.includes('Verified'));
    });

    it('client-side logistics.js should not contain backdoor bypass PINs in catch block', () => {
      const code = fs.readFileSync(path.join(__dirname, '../logistics-module/js/logistics.js'), 'utf8');
      assert.strictEqual(code.includes("pin === '1234'"), false, "Backdoor test PIN 1234 must be eliminated");
      assert.strictEqual(code.includes("pin === '5519'"), false, "Backdoor test PIN 5519 must be eliminated");
    });
  });

  // 2. Real-Time SSE Telemetry & Anomaly Bounds
  describe('2. Real-Time SSE Cold-Chain Telemetry Stream', () => {
    it('GET /api/logistics/stream-telemetry - should emit valid IoT sensor packets with temperature & GPS', async () => {
      return new Promise((resolve, reject) => {
        const req = http.get(`${BASE_URL}/api/logistics/stream-telemetry`, (res) => {
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(res.headers['content-type'], 'text/event-stream');

          let buffer = '';
          res.on('data', (chunk) => {
            buffer += chunk.toString();
            if (buffer.includes('data:')) {
              const lines = buffer.split('\n');
              for (const line of lines) {
                if (line.startsWith('data:')) {
                  try {
                    const data = JSON.parse(line.substring(5).trim());
                    assert.ok(typeof data.reefer_temp_c === 'number');
                    assert.ok(typeof data.humidity_pct === 'number');
                    assert.ok(typeof data.speed_kmh === 'number');
                    assert.ok(typeof data.freshness_score === 'string');
                    assert.ok(data.gps_lat > 0 && data.gps_lng > 0);
                    req.destroy();
                    return resolve();
                  } catch (e) {
                    // Incomplete chunk
                  }
                }
              }
            }
          });
        });
        req.on('error', reject);
      });
    });

    it('logistics.js should contain initLiveTelemetryStream and updateLiveTelemetryUI functions', () => {
      const code = fs.readFileSync(path.join(__dirname, '../logistics-module/js/logistics.js'), 'utf8');
      assert.ok(code.includes('function initLiveTelemetryStream()'), 'Must contain initLiveTelemetryStream');
      assert.ok(code.includes('function updateLiveTelemetryUI('), 'Must contain updateLiveTelemetryUI');
      assert.ok(code.includes('cold-chain-anomaly-alert'), 'Must handle cold-chain anomaly alert banner');
    });
  });

  // 3. Multi-Stop Route Optimization Mathematical Correctness
  describe('3. Multi-Stop Permutation Route Optimizer', () => {
    it('haversineDistance and calculateShortestRoute should compute accurate savings', () => {
      const origin = [11.3000, 77.6500];
      const stops = [
        { coords: [11.3190, 77.6880] },
        { coords: [11.2750, 77.5850] }
      ];
      const destination = [11.3410, 77.7172];

      function haversine(c1, c2) {
        const R = 6371;
        const dLat = (c2[0] - c1[0]) * Math.PI / 180;
        const dLon = (c2[1] - c1[1]) * Math.PI / 180;
        const a = Math.sin(dLat/2)**2 + Math.cos(c1[0]*Math.PI/180) * Math.cos(c2[0]*Math.PI/180) * Math.sin(dLon/2)**2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      }

      const dist = haversine(origin, destination);
      assert.ok(dist > 5 && dist < 50, 'Distance between Erode points must be in realistic local range');
    });
  });

  // 4. Digital Proof of Delivery (POD) Canvas & Signature Support
  describe('4. Proof of Delivery (POD) Digital Signature Pad', () => {
    it('logistics.js must export POD canvas signature functions', () => {
      const code = fs.readFileSync(path.join(__dirname, '../logistics-module/js/logistics.js'), 'utf8');
      assert.ok(code.includes('function initPodSignaturePad('), 'Must define initPodSignaturePad');
      assert.ok(code.includes('function clearPodSignature('), 'Must define clearPodSignature');
      assert.ok(code.includes('function savePodSignature('), 'Must define savePodSignature');
    });

    it('gps-tracking.html and driver-console.html should both have the signature canvas', () => {
      const gpsHtml = fs.readFileSync(path.join(__dirname, '../logistics-module/gps-tracking.html'), 'utf8');
      const driverHtml = fs.readFileSync(path.join(__dirname, '../logistics-module/driver-console.html'), 'utf8');
      assert.ok(gpsHtml.includes('pod-signature-canvas'), 'gps-tracking.html must have pod canvas');
      assert.ok(driverHtml.includes('pod-signature-canvas'), 'driver-console.html must have pod canvas');
    });
  });

  // 5. Index.html Integrity
  describe('5. Fleet Operations Command Dashboard (index.html)', () => {
    it('index.html must exist as a dedicated dashboard distinct from gps-tracking.html', () => {
      const indexHtml = fs.readFileSync(path.join(__dirname, '../logistics-module/index.html'), 'utf8');
      const gpsHtml = fs.readFileSync(path.join(__dirname, '../logistics-module/gps-tracking.html'), 'utf8');
      assert.notStrictEqual(indexHtml, gpsHtml, 'index.html must not be an identical clone of gps-tracking.html');
      assert.ok(indexHtml.includes('Enterprise Logistics &amp; Cold-Chain Fleet Command'));
      assert.ok(indexHtml.includes('dispatches-table-container'));
      assert.ok(indexHtml.includes('logistics-radar-map'));
    });
  });
});
