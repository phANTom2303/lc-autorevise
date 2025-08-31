// interceptor.js (MAIN world)
// Executes in the page context to patch fetch & XHR before LeetCode scripts run.
// Avoids inline script injection (blocked by CSP) by shipping as a static resource.

(function install() {
  if (window.__leetcodeHelperInterceptInstalled) return;
  window.__leetcodeHelperInterceptInstalled = true;

  const CHECK_MATCH = /\/check(?![A-Za-z0-9_])/; // matches '/check' path segments
  const nowISO = () => new Date().toISOString();

  const logCheck = (transport, url, data) => {
    try {
      console.log('📊 [LC-Helper] /check response', {
        transport,
        url,
        timestamp: nowISO(),
        summary: data && typeof data === 'object' ? {
          status: data.status_code,
          state: data.state,
          status_msg: data.status_msg,
          run_success: data.run_success,
          lang: data.lang,
          runtime: data.status_runtime,
          memory: data.memory,
          total_correct: data.total_correct,
          total_testcases: data.total_testcases,
          submission_id: data.submission_id,
          error: data.full_compile_error || data.compile_error
        } : null,
        raw: data
      });
    } catch (_) {}
  };

  // ---- fetch interception ----
  const originalFetch = window.fetch;
  if (originalFetch) {
    window.fetch = async function(...args) {
      const [res, init] = args;
      const url = (typeof res === 'string') ? res : (res && res.url) || '';
      let response = await originalFetch.apply(this, args);
      try {
        if (url && CHECK_MATCH.test(url)) {
          const clone = response.clone();
          const ct = clone.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
              const data = await clone.json();
              logCheck('fetch', url, data);
            } else {
              logCheck('fetch', url, { note: 'Non-JSON response' });
            }
        }
      } catch (e) {
        console.warn('[LC-Helper] fetch /check parse failed', e);
      }
      return response;
    };
  }

  // ---- XHR interception ----
  const XHR = window.XMLHttpRequest;
  if (XHR) {
    const originalOpen = XHR.prototype.open;
    const originalSend = XHR.prototype.send;
    XHR.prototype.open = function(method, url, ...rest) {
      this.__lcHelperUrl = url;
      return originalOpen.apply(this, [method, url, ...rest]);
    };
    XHR.prototype.send = function(body) {
      const url = this.__lcHelperUrl;
      if (url && CHECK_MATCH.test(url)) {
        this.addEventListener('load', function() {
          try {
            const ct = this.getResponseHeader && this.getResponseHeader('content-type') || '';
            if (ct.includes('application/json')) {
              const data = JSON.parse(this.responseText);
              logCheck('xhr', url, data);
            } else {
              logCheck('xhr', url, { note: 'Non-JSON response' });
            }
          } catch (e) {
            console.warn('[LC-Helper] xhr /check parse failed', e);
          }
        });
      }
      return originalSend.apply(this, [body]);
    };
  }

  console.log('✅ [LC-Helper] Interceptor installed (fetch + XHR)');
})();
