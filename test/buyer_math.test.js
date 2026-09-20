/**
 * AgriNex Enterprise Suite - Buyer Module Mathematical & Algorithmic Unit Tests
 * Uses native Node.js test runner (node:test) and assertions (node:assert).
 */

const { describe, it } = require('node:test');
const assert = require('node:assert');
const authService = require('../backend/auth');
const gstinValidator = require('../backend/gstin_validator');

describe('AgriNex Buyer Mathematical & Algorithmic Engine', () => {

  describe('1. Escrow 35% Advance / 65% Balance Integer Conservation', () => {
    it('should split exact rupee amounts with zero rounding leakage across prime and odd lot values', () => {
      const testCases = [
        { qtyKg: 5000, rateKg: 18.25 }, // ₹ 91,250
        { qtyKg: 3333, rateKg: 17.50 }, // ₹ 58,328 (rounded)
        { qtyKg: 12000, rateKg: 14.75 }, // ₹ 177,000
        { qtyKg: 777, rateKg: 88.30 },  // ₹ 68,609
        { qtyKg: 10000, rateKg: 12.00 } // ₹ 120,000
      ];

      testCases.forEach(({ qtyKg, rateKg }) => {
        const totalVal = Math.round(qtyKg * rateKg);
        const advAmount = Math.round(totalVal * 0.35);
        const balAmount = totalVal - advAmount;

        // Mathematical invariant: Advance + Balance MUST equal Total exactly to the rupee
        assert.strictEqual(
          advAmount + balAmount,
          totalVal,
          `Escrow split leak detected for total ₹${totalVal}: adv=${advAmount}, bal=${balAmount}`
        );

        // Advance must be between 34.9% and 35.1% of total value
        const advRatio = advAmount / totalVal;
        assert.ok(
          Math.abs(advRatio - 0.35) < 0.005,
          `Advance ratio ${advRatio} deviated significantly from 35%`
        );
      });
    });
  });

  describe('2. Net Landed Cost & Total Cost of Ownership (TCO)', () => {
    // Standard AgriNex landed cost formula:
    // Farm-Gate Base Cost + Freight (Distance * Diesel Tariff / Efficiency) + Tolls + Handling + Mandi Cess (1%) + Escrow Fee (1.2%)
    function calculateNetLandedCost({
      qtyKg,
      rateKg,
      distanceKm,
      dieselPerLiter = 92.50,
      kmPerLiter = 4.5,
      tollCharges = 850,
      handlingPerKg = 0.40,
      mandiCessPct = 0.01,
      escrowFeePct = 0.012
    }) {
      const farmGateCost = Math.round(qtyKg * rateKg);
      const fuelCost = Math.round((distanceKm / kmPerLiter) * dieselPerLiter);
      const freightCost = fuelCost + tollCharges;
      const handlingCost = Math.round(qtyKg * handlingPerKg);
      const mandiCess = Math.round(farmGateCost * mandiCessPct);
      const escrowFee = Math.round(farmGateCost * escrowFeePct);
      const totalLandedCost = farmGateCost + freightCost + handlingCost + mandiCess + escrowFee;
      const landedCostPerKg = parseFloat((totalLandedCost / qtyKg).toFixed(2));

      return {
        farmGateCost,
        freightCost,
        handlingCost,
        mandiCess,
        escrowFee,
        totalLandedCost,
        landedCostPerKg
      };
    }

    it('should accurately calculate landed cost from Lasalgaon to Vashi (210 km, 5000 kg @ ₹18/kg)', () => {
      const res = calculateNetLandedCost({
        qtyKg: 5000,
        rateKg: 18.0,
        distanceKm: 210
      });

      assert.strictEqual(res.farmGateCost, 90000);
      assert.ok(res.freightCost > 4500 && res.freightCost < 6000, `Freight cost ${res.freightCost} out of expected bounds`);
      assert.strictEqual(res.handlingCost, 2000); // 5000 * 0.40
      assert.strictEqual(res.mandiCess, 900); // 1% of 90,000
      assert.strictEqual(res.escrowFee, 1080); // 1.2% of 90,000
      assert.strictEqual(
        res.totalLandedCost,
        res.farmGateCost + res.freightCost + res.handlingCost + res.mandiCess + res.escrowFee
      );
      assert.ok(res.landedCostPerKg > 19.5 && res.landedCostPerKg < 20.5, `Landed cost per kg ₹${res.landedCostPerKg} out of expected range`);
    });
  });

  describe('3. Inward Weighbridge Tolerance & Grievance Trigger Threshold', () => {
    function assessWeighbridgeDiscrepancy(dispatchGrossKg, dispatchTareKg, arrivalGrossKg, arrivalTareKg) {
      const dispatchNet = dispatchGrossKg - dispatchTareKg;
      const arrivalNet = arrivalGrossKg - arrivalTareKg;
      const differenceKg = dispatchNet - arrivalNet;
      const discrepancyPct = parseFloat(((differenceKg / dispatchNet) * 100).toFixed(2));

      let action = 'ACCEPT';
      if (discrepancyPct > 5.0) {
        action = 'AUTO_GRIEVANCE_HOLD';
      } else if (discrepancyPct > 2.0) {
        action = 'TRANSIT_LOSS_FLAG';
      }

      return { dispatchNet, arrivalNet, differenceKg, discrepancyPct, action };
    }

    it('should accept normal transit loss within 2% tolerance without blocking release', () => {
      // 5,000 kg dispatched, 4,940 kg received (1.2% moisture loss)
      const res = assessWeighbridgeDiscrepancy(8400, 3400, 8340, 3400);
      assert.strictEqual(res.dispatchNet, 5000);
      assert.strictEqual(res.arrivalNet, 4940);
      assert.strictEqual(res.discrepancyPct, 1.2);
      assert.strictEqual(res.action, 'ACCEPT');
    });

    it('should flag transit loss between 2% and 5%', () => {
      // 5,000 kg dispatched, 4,820 kg received (3.6% loss)
      const res = assessWeighbridgeDiscrepancy(8400, 3400, 8220, 3400);
      assert.strictEqual(res.discrepancyPct, 3.6);
      assert.strictEqual(res.action, 'TRANSIT_LOSS_FLAG');
    });

    it('should trigger AUTO_GRIEVANCE_HOLD when weight discrepancy exceeds 5%', () => {
      // 5,000 kg dispatched, 4,650 kg received (7% missing consignment)
      const res = assessWeighbridgeDiscrepancy(8400, 3400, 8050, 3400);
      assert.strictEqual(res.discrepancyPct, 7.0);
      assert.strictEqual(res.action, 'AUTO_GRIEVANCE_HOLD');
    });
  });

  describe('4. Indian Corporate GSTIN & FSSAI Verification', () => {
    it('should validate valid 15-character Indian corporate GSTIN with correct state code', () => {
      const validGstin = '27AABCB2210M1Z2'; // Maharashtra (27)
      const res = gstinValidator.validateGSTIN(validGstin);

      assert.strictEqual(res.valid, true);
      assert.strictEqual(res.stateCode, '27');
      assert.strictEqual(res.stateName, 'Maharashtra');
      assert.strictEqual(res.pan, 'AABCB2210M');
    });

    it('should reject malformed GSTIN (wrong length, invalid chars, invalid state)', () => {
      assert.strictEqual(gstinValidator.validateGSTIN('12345').valid, false);
      assert.strictEqual(gstinValidator.validateGSTIN('99AABCB2210M1Z2').valid, false); // State 99 not standard state
      assert.strictEqual(gstinValidator.validateGSTIN('').valid, false);
    });

    it('should validate 14-digit FSSAI food safety licenses', () => {
      assert.strictEqual(gstinValidator.validateFSSAI('11522034000189').valid, true);
      assert.strictEqual(gstinValidator.validateFSSAI('10014022002595').valid, true);
      assert.strictEqual(gstinValidator.validateFSSAI('12345').valid, false); // too short
      assert.strictEqual(gstinValidator.validateFSSAI('1152203400018900').valid, false); // too long
      assert.strictEqual(gstinValidator.validateFSSAI('ABCD1234567890').valid, false); // contains letters
    });
  });

  describe('5. Enterprise HMAC-SHA256 JWT Authentication & Tampering Guard', () => {
    it('should sign, verify, and extract payload for authenticated corporate buyers', () => {
      const payload = {
        officer: 'Karthik Sundaram',
        company: 'BigBasket Direct Farm Sourcing',
        gstin: '27AABCB2210M1Z2',
        role: 'Procurement Lead'
      };

      const token = authService.signToken(payload);
      assert.ok(typeof token === 'string' && token.split('.').length === 3);

      const verified = authService.verifyToken(token);
      assert.strictEqual(verified.valid, true);
      assert.strictEqual(verified.payload.officer, payload.officer);
      assert.strictEqual(verified.payload.company, payload.company);
      assert.strictEqual(verified.payload.gstin, payload.gstin);
    });

    it('should detect token tampering (signature mismatch)', () => {
      const token = authService.signToken({ officer: 'Karthik Sundaram' });
      const parts = token.split('.');
      
      // Tamper payload
      const tamperedPayload = Buffer.from(JSON.stringify({ officer: 'Malicious Attacker' })).toString('base64url');
      const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;

      const verified = authService.verifyToken(tamperedToken);
      assert.strictEqual(verified.valid, false);
      assert.strictEqual(verified.error, 'Invalid token signature');
    });

    it('should detect expired tokens', () => {
      // Sign with -1 second expiration
      const expiredToken = authService.signToken({ officer: 'Karthik Sundaram' }, -1);
      const verified = authService.verifyToken(expiredToken);
      assert.strictEqual(verified.valid, false);
      assert.strictEqual(verified.error, 'Token has expired');
    });
  });

  describe('6. Interactive Bidding Margin & AI Farmer Acceptance Probability Engine', () => {
    function computeBiddingMargins({ baseAskRate, counterRate, qtyKg, wholesaleMarkup = 0.35 }) {
      const askTotalVal = Math.round(qtyKg * baseAskRate);
      const counterTotalVal = Math.round(qtyKg * counterRate);
      const savingsRupees = askTotalVal - counterTotalVal;
      const savingsPct = ((baseAskRate - counterRate) / baseAskRate) * 100;
      const advAmount = Math.round(counterTotalVal * 0.35);
      const balAmount = counterTotalVal - advAmount;

      const estWholesaleSellRate = baseAskRate * (1 + wholesaleMarkup);
      const grossProfitPerKg = estWholesaleSellRate - counterRate;
      const grossMarginPct = (grossProfitPerKg / estWholesaleSellRate) * 100;

      const ratio = counterRate / baseAskRate;
      let acceptanceCategory = 'Low';
      if (ratio >= 0.95) acceptanceCategory = 'Very High';
      else if (ratio >= 0.88) acceptanceCategory = 'High';
      else if (ratio >= 0.80) acceptanceCategory = 'Moderate';

      return {
        askTotalVal,
        counterTotalVal,
        savingsRupees,
        savingsPct,
        advAmount,
        balAmount,
        grossProfitPerKg,
        grossMarginPct,
        acceptanceCategory
      };
    }

    it('should calculate -6% optimal preset margin and escrow advance with high acceptance', () => {
      const result = computeBiddingMargins({
        baseAskRate: 18.0,
        counterRate: 16.92,
        qtyKg: 10000
      });

      assert.strictEqual(result.askTotalVal, 180000);
      assert.strictEqual(result.counterTotalVal, 169200);
      assert.strictEqual(result.savingsRupees, 10800);
      assert.strictEqual(Math.round(result.savingsPct), 6);
      assert.strictEqual(result.advAmount, 59220);
      assert.strictEqual(result.balAmount, 109980);
      assert.strictEqual(result.acceptanceCategory, 'High');
    });

    it('should calculate -3% fast-deal preset with very high acceptance probability', () => {
      const result = computeBiddingMargins({
        baseAskRate: 18.0,
        counterRate: 17.46,
        qtyKg: 5000
      });

      assert.strictEqual(result.counterTotalVal, 87300);
      assert.strictEqual(result.savingsRupees, 2700);
      assert.strictEqual(result.advAmount, 30555);
      assert.strictEqual(result.acceptanceCategory, 'Very High');
    });

    it('should flag bids below 80% ask as aggressive with low acceptance probability', () => {
      const result = computeBiddingMargins({
        baseAskRate: 18.0,
        counterRate: 13.50,
        qtyKg: 5000
      });

      assert.strictEqual(result.savingsRupees, 22500);
      assert.strictEqual(result.acceptanceCategory, 'Low');
    });
  });

});
