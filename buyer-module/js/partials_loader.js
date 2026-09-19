/**
 * AgriNex Buyer Module - Async Partials Loader
 * Asynchronously loads modular views and modals into the DOM shell before initialization.
 */

(function () {
  const VIEWS = [
    'views/verified-produce.html',
    'views/bulk-demands.html',
    'views/consignments.html',
    'views/escrow-vault.html',
    'views/calculator.html',
    'views/messages.html',
    'views/grievance.html',
    'views/insights.html'
  ];

  const MODALS = [
    'modals/modal-post-demand.html',
    'modals/modal-demand-bids.html',
    'modals/modal-direct-buy.html',
    'modals/modal-emergency-buyout.html',
    'modals/modal-counter-bid.html',
    'modals/modal-buyer-profile.html',
    'modals/modal-negotiation-feedback.html',
    'modals/modal-file-grievance.html',
    'modals/modal-lorry-receipt.html',
    'modals/modal-confirm-arrival.html',
    'modals/modal-gps-tracker.html',
    'modals/modal-driver-fleet.html',
    'modals/modal-book-transport.html',
    'modals/modal-deposit-escrow.html',
    'modals/modal-deposit-receipt.html',
    'modals/modal-escrow-deed.html',
    'modals/modal-ai-copilot.html',
    'modals/modal-digital-po.html',
    'modals/modal-lot-comparison.html',
    'modals/modal-district-crop-matrix.html',
    'modals/modal-escrow-payment-gateway.html',
    'modals/modal-payment-receipt.html',
    'modals/modal-auth.html'
  ];

  async function loadPartials() {
    const viewsContainer = document.getElementById('views-container');
    const modalsContainer = document.getElementById('modals-container');

    if (!viewsContainer || !modalsContainer) return;

    try {
      const [viewTexts, modalTexts] = await Promise.all([
        Promise.all(VIEWS.map(v => fetch(v).then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${v}`);
          return r.text();
        }))),
        Promise.all(MODALS.map(m => fetch(m).then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${m}`);
          return r.text();
        })))
      ]);

      viewsContainer.innerHTML = viewTexts.join('\n');
      modalsContainer.innerHTML = modalTexts.join('\n');

      window.__agrinex_partials_ready = true;
      document.dispatchEvent(new CustomEvent('agrinex:partials-ready'));
    } catch (err) {
      console.warn('Partials loader fallback:', err.message);
      // If running without HTTP server or partial fetch fails, signal ready anyway
      window.__agrinex_partials_ready = true;
      document.dispatchEvent(new CustomEvent('agrinex:partials-ready'));
    }
  }

  // Kick off loading immediately on script execution or DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPartials);
  } else {
    loadPartials();
  }
})();
