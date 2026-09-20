const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('AgriNex Buyer Module - Comprehensive Multilingual (i18n) Audit', () => {
  const i18n = require('../buyer-module/js/i18n.js');

  it('i18n.js should export TRANSLATIONS and translation functions', () => {
    assert.ok(i18n, 'i18n module must be exported');
    assert.ok(i18n.TRANSLATIONS, 'TRANSLATIONS dictionary must exist');
    assert.ok(i18n.TRANSLATIONS.en, 'en dictionary must exist');
    assert.ok(i18n.TRANSLATIONS.hi, 'hi dictionary must exist');
    assert.ok(i18n.TRANSLATIONS.mr, 'mr dictionary must exist');
  });

  it('all required view translation keys must exist across English, Hindi, and Marathi', () => {
    const { en, hi, mr } = i18n.TRANSLATIONS;

    const criticalKeys = [
      'badge_gps_telemetry', 'badge_escrow_disbursal', 'btn_book_dedicated_reefer',
      'hdr_consignments_title', 'hdr_consignments_sub', 'btn_refresh_telemetry',
      'th_tracking_id', 'th_origin_farmer', 'th_dest_hub', 'th_commodity_vol',
      'th_temp_humidity', 'th_escrow_stage', 'th_est_arrival', 'th_live_action',
      'badge_reverse_auction', 'demands_header_title', 'demands_header_subtitle',
      'btn_export_pos', 'btn_automatch_refresh', 'btn_broadcast_new_quota',
      'kpi_active_quota_vol', 'kpi_strategic_commodities', 'kpi_fulfilled_vol',
      'kpi_quality_passed', 'kpi_net_sourcing_savings', 'kpi_zero_middlemen',
      'kpi_live_farmer_bids', 'kpi_avg_response_time', 'tab_demands_all',
      'tab_demands_automatch', 'tab_demands_broadcasting', 'tab_demands_fulfilled',
      'badge_default_proof', 'btn_audit_statement', 'btn_deposit_escrow',
      'kpi_active_contracts', 'kpi_committed_pool', 'kpi_advance_in_escrow',
      'kpi_rbi_compliant', 'kpi_delivery_balances', 'kpi_disbursed_qc',
      'kpi_liquid_reserves', 'kpi_unallocated_buffer', 'escrow_safeguard_callout',
      'btn_raise_qc_hold', 'escrow_active_contracts_title', 'escrow_ledger_title',
      'escrow_ledger_sub', 'tab_ledger_all', 'tab_ledger_advances',
      'tab_ledger_finals', 'tab_ledger_completed', 'th_txn_ref', 'th_contract_ref',
      'th_farmer', 'th_produce_lot', 'th_tranche_type', 'th_amount', 'th_bank_utr',
      'th_status', 'th_action', 'hero_calc_title', 'badge_landed_cost',
      'hero_calc_subtitle', 'btn_download_cost_sheet', 'btn_find_matching_lots',
      'quick_presets_label', 'calc_params_header', 'calc_3step_setup',
      'calc_step1_title', 'calc_step1_label', 'calc_procurement_volume',
      'calc_step2_title', 'calc_origin_mandi_label', 'calc_receiving_terminal_label',
      'calc_auto_calc_route', 'calc_step3_title', 'calc_direct_farm_ask',
      'calc_mandi_modal_rate', 'btn_customize_fleet', 'hero_direct_landed_rate',
      'badge_zero_middlemen', 'lbl_delivered', 'lbl_total_order_val',
      'lbl_trad_mandi', 'lbl_net_sourcing_savings', 'btn_broadcast_demand_rate',
      'btn_explore_matching_lots', 'title_cost_stack_composition', 'bucket_farm_produce',
      'bucket_logistics_freight', 'bucket_handling_crates', 'summary_adv_logistics_ledger',
      'btn_click_expand', 'hdr_vehicle_fleet_controls', 'lbl_hauler_fleet_type',
      'lbl_packaging_crate_mode', 'lbl_loading_hamali', 'lbl_route_distance',
      'hdr_agrinex_direct_cost_stack', 'badge_zero_intermediary', 'cost_item_farmgate',
      'cost_item_packaging', 'cost_item_freight', 'cost_item_tolls', 'cost_item_hamali',
      'cost_item_escrow_fee', 'cost_item_qc_slip', 'cost_item_transit_loss',
      'cost_item_total_direct', 'hdr_mandi_cost_stack', 'badge_4layer_brokers',
      'cost_item_apmc_modal', 'cost_item_apmc_cess', 'cost_item_mandi_arhatiya',
      'cost_item_mandi_brokerage', 'cost_item_mandi_hamali', 'cost_item_mandi_freight',
      'cost_item_mandi_tolls', 'cost_item_mandi_spoilage', 'cost_item_total_mandi',
      'badge_negotiation_room', 'badge_escrow_protected', 'messages_header_title',
      'messages_header_subtitle', 'signal_encrypted', 'farmer_contacts_label',
      'quick_replies_label', 'chip_moisture_slip', 'chip_dispatch_ready',
      'chip_counter_rate', 'chip_confirm_escrow', 'badge_resolution_sla',
      'btn_file_new_grievance', 'kpi_active_disputes', 'kpi_assigned_arbitrator',
      'kpi_escrow_frozen', 'kpi_protected_safe_vault', 'kpi_claims_resolved',
      'kpi_credited_wallet', 'kpi_avg_turnaround', 'kpi_guaranteed_sla',
      'grv_guarantee_title', 'grv_guarantee_desc', 'btn_view_dispute_policy',
      'msamb_tribunal_title', 'msamb_tribunal_subtitle', 'badge_legal_binding',
      'tribunal_step1_title', 'tribunal_step1_desc', 'tribunal_step2_title',
      'tribunal_step2_desc', 'tribunal_step3_title', 'tribunal_step3_desc',
      'filter_claims_label', 'tab_grv_all', 'tab_grv_review', 'tab_grv_settled',
      'showing_claims_records'
    ];

    criticalKeys.forEach(k => {
      assert.ok(en[k], `Missing key in en: ${k}`);
      assert.ok(hi[k], `Missing key in hi: ${k}`);
      assert.ok(mr[k], `Missing key in mr: ${k}`);
    });
  });

  it('all HTML view files should have valid data-i18n attributes', () => {
    const viewsDir = path.join(__dirname, '..', 'buyer-module', 'views');
    const viewFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html'));

    assert.strictEqual(viewFiles.length, 8, 'Should have all 8 view templates');

    const { en, hi, mr } = i18n.TRANSLATIONS;

    viewFiles.forEach(file => {
      const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
      const matches = [...content.matchAll(/data-i18n="([^"]+)"/g)];
      matches.forEach(m => {
        const key = m[1];
        assert.ok(en[key] || hi[key] || mr[key], `data-i18n key "${key}" in ${file} must exist in translations`);
      });
    });
  });

  it('translation functions tCrop, tPerson, tLocation, and tText work properly for Hindi & Marathi', () => {
    assert.strictEqual(i18n.tPerson('Karthik Sundaram', 'hi'), 'कार्तिक सुंदरम');
    assert.strictEqual(i18n.tPerson('Karthik Sundaram', 'mr'), 'कार्तिक सुंदरम');

    assert.strictEqual(i18n.tCrop('Red Onion', 'hi'), 'लाल प्याज');
    assert.strictEqual(i18n.tCrop('Red Onion', 'mr'), 'लाल कांदा');

    assert.strictEqual(i18n.tLocation('Lasalgaon APMC', 'hi'), 'लासलगांव मंडी');
    assert.strictEqual(i18n.tLocation('Lasalgaon APMC', 'mr'), 'लासलगाव बाजार समिती');
  });
});
