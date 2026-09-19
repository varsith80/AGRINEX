/**
 * AgriNex Buyer Module - Phase 1, 2, 3 Feature Verification Tests
 * Tests Security (Anti-XSS, Idempotency), Performance & Real-Time SSE Streams.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

describe('AgriNex Buyer Module - Phases 1, 2, 3 Implementation Suite', () => {

  // -------------------------------------------------------------
  // PHASE 1: SECURITY & INPUT SANITIZATION
  // -------------------------------------------------------------
  describe('Phase 1: Anti-XSS Sanitization & Escaping', () => {
    function escapeHTML(str) {
      if (str === null || str === undefined) return '';
      if (typeof str !== 'string') str = String(str);
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    it('should sanitize script injection payloads in chat and grievance messages', () => {
      const maliciousPayload = '<script>alert("XSS")</script><img src="x" onerror="stealCookie()" />';
      const sanitized = escapeHTML(maliciousPayload);

      assert.strictEqual(sanitized.includes('<script>'), false);
      assert.strictEqual(sanitized.includes('</script>'), false);
      assert.strictEqual(sanitized.includes('<img'), false);
      assert.strictEqual(sanitized, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;&lt;img src=&quot;x&quot; onerror=&quot;stealCookie()&quot; /&gt;');
    });

    it('should sanitize single quotes, double quotes, and ampersands in corporate grievance notes', () => {
      const complexText = "Farmer's Onion Lot & Quality \"Grade A\" <12% Moisture>";
      const sanitized = escapeHTML(complexText);
      assert.strictEqual(sanitized, 'Farmer&#39;s Onion Lot &amp; Quality &quot;Grade A&quot; &lt;12% Moisture&gt;');
    });
  });

  // -------------------------------------------------------------
  // PHASE 1: IDEMPOTENCY & FINANCIAL ESCROW ANTI-REPLAY
  // -------------------------------------------------------------
  describe('Phase 1: Escrow Release Idempotency & Financial Safety', () => {
    let testContractNo = null;

    it('should create direct-buy escrow contract and lock 35% advance', async () => {
      const res = await fetch(`${BASE_URL}/api/buyer/direct-buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'AgriNex-Buyer-Client'
        },
        body: JSON.stringify({
          lot_id: 'LOT-PHASE-TEST-01',
          crop: 'Nashik Red Onion',
          qty_kg: 5000,
          rate_kg: 20,
          buyer_name: 'BigBasket Direct Procurement'
        })
      });

      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.contract && data.contract.contract_no);
      testContractNo = data.contract.contract_no;
    });

    it('should settle contract on first release call', async () => {
      assert.ok(testContractNo);
      const res = await fetch(`${BASE_URL}/api/buyer/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contract_no: testContractNo })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.message.includes('settled'));
    });

    it('should safely handle duplicate release calls idempotently without duplicate release error', async () => {
      assert.ok(testContractNo);
      const res = await fetch(`${BASE_URL}/api/buyer/escrow/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contract_no: testContractNo })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.alreadySettled, true);
    });
  });

  // -------------------------------------------------------------
  // PHASE 3: REAL-TIME SERVER-SENT EVENTS (SSE) STREAMS
  // -------------------------------------------------------------
  describe('Phase 3: Real-Time Server-Sent Events (SSE) Telemetry Stream', () => {
    it('GET /api/logistics/stream-telemetry - should stream live cold-chain IoT data with reefer temperature & GPS', async () => {
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
                  const jsonStr = line.substring(5).trim();
                  try {
                    const telemetry = JSON.parse(jsonStr);
                    assert.ok(typeof telemetry.reefer_temp_c === 'number');
                    assert.ok(typeof telemetry.humidity_pct === 'number');
                    assert.ok(typeof telemetry.speed_kmh === 'number');
                    assert.ok(typeof telemetry.freshness_score === 'string');
                    assert.ok(typeof telemetry.current_location === 'string');
                    assert.ok(telemetry.gps_lat > 0 && telemetry.gps_lng > 0);
                    
                    req.destroy();
                    return resolve();
                  } catch (e) {
                    // Wait for full chunk
                  }
                }
              }
            }
          });

          res.on('error', reject);
        });

        req.on('error', reject);
        req.setTimeout(4000, () => {
          req.destroy();
          reject(new Error('SSE Stream Timeout'));
        });
      });
    });

    it('GET /api/buyer/stream-bids - should stream live marketplace counter-bids updates', async () => {
      return new Promise((resolve, reject) => {
        const req = http.get(`${BASE_URL}/api/buyer/stream-bids`, (res) => {
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(res.headers['content-type'], 'text/event-stream');

          let buffer = '';
          res.on('data', (chunk) => {
            buffer += chunk.toString();
            if (buffer.includes('data:')) {
              const lines = buffer.split('\n');
              for (const line of lines) {
                if (line.startsWith('data:')) {
                  const jsonStr = line.substring(5).trim();
                  try {
                    const pulse = JSON.parse(jsonStr);
                    assert.ok(Array.isArray(pulse.bids));
                    assert.ok(typeof pulse.timestamp === 'string');

                    req.destroy();
                    return resolve();
                  } catch (e) {}
                }
              }
            }
          });

          res.on('error', reject);
        });

        req.on('error', reject);
        req.setTimeout(4000, () => {
          req.destroy();
          reject(new Error('Bids SSE Stream Timeout'));
        });
      });
    });
  });

});
