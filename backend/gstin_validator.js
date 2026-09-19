/**
 * AgriNex Corporate GSTIN & FSSAI License Validation Service
 * Validates Indian Goods & Services Tax Identification Numbers and Food Safety Standards Authority of India licenses.
 */

const STATE_CODES = {
  '01': 'Jammu and Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '19': 'West Bengal',
  '24': 'Gujarat',
  '27': 'Maharashtra',
  '29': 'Karnataka',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '36': 'Telangana',
  '37': 'Andhra Pradesh'
};

/**
 * Validates Indian 15-character GSTIN format:
 * 2 digits (State Code) + 10 chars (PAN) + 1 digit (Entity Code) + 'Z' + 1 Check Digit
 */
function validateGSTIN(gstin) {
  if (!gstin || typeof gstin !== 'string') {
    return { valid: false, error: 'GSTIN must be a non-empty string' };
  }

  const clean = gstin.trim().toUpperCase();

  if (clean.length !== 15) {
    return { valid: false, error: 'GSTIN must be exactly 15 characters long' };
  }

  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstinRegex.test(clean)) {
    return { valid: false, error: 'Invalid GSTIN syntax format (Expected e.g. 27AABCB2210M1Z2)' };
  }

  const stateCode = clean.substring(0, 2);
  const stateCodeNum = parseInt(stateCode, 10);
  if (stateCodeNum < 1 || (stateCodeNum > 38 && stateCodeNum !== 97)) {
    return { valid: false, error: `Invalid Indian GSTIN state code: ${stateCode}` };
  }

  const pan = clean.substring(2, 12);
  const entityNumber = clean[12];
  const checkChar = clean[14];

  const stateName = STATE_CODES[stateCode] || 'Other Indian State/UT';

  return {
    valid: true,
    gstin: clean,
    stateCode,
    stateName,
    pan,
    entityNumber,
    checkDigit: checkChar,
    verified_at: new Date().toISOString()
  };
}

/**
 * Validates 14-digit FSSAI License Number
 * Format: 1 digit (Reg/Lic) + 2 digits (State) + 2 digits (Year) + 3 digits (Officer/District) + 6 digits (Serial)
 */
function validateFSSAI(fssai) {
  if (!fssai || typeof fssai !== 'string') {
    return { valid: false, error: 'FSSAI license must be a non-empty string' };
  }

  const clean = fssai.trim();

  if (!/^[0-9]{14}$/.test(clean)) {
    return { valid: false, error: 'FSSAI License must be exactly 14 digits' };
  }

  const regType = clean[0] === '1' ? 'FSSAI Central / State License' : 'FSSAI Basic Registration';
  const stateCode = clean.substring(1, 3);
  const stateName = STATE_CODES[stateCode] || 'Approved Food Zone';

  return {
    valid: true,
    fssai: clean,
    regType,
    stateCode,
    stateName,
    verified_at: new Date().toISOString()
  };
}

module.exports = {
  validateGSTIN,
  validateFSSAI,
  STATE_CODES
};
