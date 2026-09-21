const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

describe('AgriNex Admin User Management: Removal & Suspension Governance Suite', () => {
  it('admin-module/js/data.js should export removeUser, suspendUser, and reactivateUser methods', () => {
    const dataJsPath = path.join(__dirname, '..', 'admin-module', 'js', 'data.js');
    const content = fs.readFileSync(dataJsPath, 'utf8');

    assert.ok(content.includes('static removeUser('), 'AgriNexAdminGovernance must provide removeUser method');
    assert.ok(content.includes('static suspendUser('), 'AgriNexAdminGovernance must provide suspendUser method');
    assert.ok(content.includes('static reactivateUser('), 'AgriNexAdminGovernance must provide reactivateUser method');
    assert.ok(content.includes('User Account De-listed & Removed'), 'removeUser must add an immutable audit trail entry');
    assert.ok(content.includes('User Account Suspended'), 'suspendUser must add an audit trail entry');
  });

  it('admin-module/js/dashboard.js should render Remove and Suspend action buttons and expose handlers', () => {
    const dashJsPath = path.join(__dirname, '..', 'admin-module', 'js', 'dashboard.js');
    const content = fs.readFileSync(dashJsPath, 'utf8');

    assert.ok(content.includes('handleRemoveUser'), 'dashboard.js must define and expose handleRemoveUser');
    assert.ok(content.includes('handleSuspendUser'), 'dashboard.js must define and expose handleSuspendUser');
    assert.ok(content.includes('handleReactivateUser'), 'dashboard.js must define and expose handleReactivateUser');
    assert.ok(content.includes('btn-gov-remove'), 'dashboard.js must render .btn-gov-remove button');
    assert.ok(content.includes('btn-gov-suspend'), 'dashboard.js must render .btn-gov-suspend button');
  });

  it('admin-module/css/dashboard.css must style .btn-gov-remove and .btn-gov-suspend', () => {
    const cssPath = path.join(__dirname, '..', 'admin-module', 'css', 'dashboard.css');
    const content = fs.readFileSync(cssPath, 'utf8');

    assert.ok(content.includes('.btn-gov-remove'), 'dashboard.css must include .btn-gov-remove selector');
    assert.ok(content.includes('.btn-gov-suspend'), 'dashboard.css must include .btn-gov-suspend selector');
  });

  it('admin-module/js/admin-shell.js should handle user:removed and user:suspended events', () => {
    const shellJsPath = path.join(__dirname, '..', 'admin-module', 'js', 'admin-shell.js');
    const content = fs.readFileSync(shellJsPath, 'utf8');

    assert.ok(content.includes("case 'user:removed':"), 'admin-shell.js must listen for user:removed events');
    assert.ok(content.includes("case 'user:suspended':"), 'admin-shell.js must listen for user:suspended events');
  });

  it('admin-module/js/i18n.js must have complete trilingual terms for user removal and suspension', () => {
    const i18nPath = path.join(__dirname, '..', 'admin-module', 'js', 'i18n.js');
    const content = fs.readFileSync(i18nPath, 'utf8');

    assert.ok(content.includes("['Suspend',"), 'i18n.js must translate Suspend');
    assert.ok(content.includes("['Remove',"), 'i18n.js must translate Remove');
    assert.ok(content.includes("['De-list',"), 'i18n.js must translate De-list');
    assert.ok(content.includes("['Suspended',"), 'i18n.js must translate Suspended');
  });
});
