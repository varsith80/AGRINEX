const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

describe('AgriNex Admin Authentication & RBAC Guard Suite', () => {
  it('login_details/js/auth_db.js should persist agrinex_token, agrinex_user and agrinex_active_session', () => {
    const authDbPath = path.join(__dirname, '..', 'login_details', 'js', 'auth_db.js');
    const content = fs.readFileSync(authDbPath, 'utf8');
    
    assert.ok(content.includes('localStorage.setItem("agrinex_token"'), 'Must set agrinex_token in localStorage');
    assert.ok(content.includes('localStorage.setItem("agrinex_user"'), 'Must set agrinex_user in localStorage');
    assert.ok(content.includes('localStorage.setItem("agrinex_active_session"'), 'Must set agrinex_active_session in localStorage');
  });

  it('assets/js/agrinex-auth-bridge.js should synchronize agrinex_token and agrinex_user', () => {
    const bridgePath = path.join(__dirname, '..', 'assets', 'js', 'agrinex-auth-bridge.js');
    const content = fs.readFileSync(bridgePath, 'utf8');
    
    assert.ok(content.includes("localStorage.setItem('agrinex_token'"), 'Must sync agrinex_token in bridge');
    assert.ok(content.includes("localStorage.setItem('agrinex_user'"), 'Must sync agrinex_user in bridge');
  });

  it('admin-module/js/admin-api.js should have fallback session recovery', () => {
    const apiPath = path.join(__dirname, '..', 'admin-module', 'js', 'admin-api.js');
    const content = fs.readFileSync(apiPath, 'utf8');
    
    assert.ok(content.includes('agrinex_active_session'), 'Must check agrinex_active_session in AdminAPI');
  });

  it('all 5 admin-module HTML pages must contain resilient enforceAdminRBAC guards', () => {
    const adminPages = [
      'index.html',
      'mandi-governance.html',
      'grievance-arbitration.html',
      'manage-dispatches.html',
      'escrow-governance.html'
    ];

    for (const page of adminPages) {
      const pagePath = path.join(__dirname, '..', 'admin-module', page);
      assert.ok(fs.existsSync(pagePath), `Page ${page} must exist`);
      const html = fs.readFileSync(pagePath, 'utf8');
      assert.ok(html.includes('enforceAdminRBAC'), `Page ${page} must include enforceAdminRBAC guard`);
      assert.ok(html.includes('agrinex_active_session'), `Page ${page} must check agrinex_active_session`);
      assert.ok(html.includes('ROLE_ADMIN'), `Page ${page} must recognize ROLE_ADMIN`);
    }
  });
});
