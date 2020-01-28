import "core-js/stable";
import "regenerator-runtime/runtime";
import 'whatwg-fetch';
import { UserAgentApplication } from 'msal';

const clientId = process.env.CLIENTID;
const scopes = ['User.Read'];

const p = document.querySelector('p');
const buttons = document.querySelector('#buttons');
const loginButton = document.querySelector('#login');
const clearCacheButton = document.querySelector('#clear-cache');
const reloadButton = document.querySelector('#reload');
const callApiButton = document.querySelector('#call-api');

function log(...parts) {
  p.innerText = parts
    .map(part => typeof part === 'string' ? part : JSON.stringify(part))
    .join(' ');
}

log('Loading...');

(() => {
  // This part will be run inside the popup
  if (window.location.hash.includes('id_token=')) {
    log('Id token in hash (is callback)');
    Office.onReady(() => {
      log('Window is callback (wait)');
      if (Office.context.ui) {
        Office.context.ui.messageParent(window.location.hash);
        log('Message sent to parent');
      } else {
        log('Missing Office.context.ui');
      }
    });
    return;
  }

  buttons.hidden = false;

  // Only initialize msal if window is not callback (not popup).
  // MSAL will pick up the hash and redirect - we don't want this.
  const msal = new UserAgentApplication({
    auth: { clientId },
    cache: { cacheLocation: 'localStorage' }
  });

  // When hidden iframe for acquireTokenSilent
  if (msal.isCallback(window.location.hash)) {
    return;
  }

  clearCacheButton.addEventListener('click', () => {
    msal.clearCache();
  });

  async function callApi() {
    log('Calling Graph API (/me)...');
    try {
      const { accessToken } = await msal.acquireTokenSilent({ scopes });
      log('AccessToken:', accessToken);
      const me = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }).then(res => res.json());
      log('SUCCESS! Graph API (/me):', me);
    } catch (e) {
      log(e);
      throw e;
    }
  }

  log('Waiting for office...');
  Office.onReady(() => {
    log('Office loaded');
    if (msal.getAccount()) {
      callApi();
    } else if (msal.getLoginInProgress()) {
      log('Logging in (login in progress)...',);
    } else {
      loginButton.disabled = false;
      log('Ready. Click login button');
    }
  });

  loginButton.addEventListener('click', async () => {
    msal.openPopup = () => {
      const dummy = {
        close() {
        },
        location: {
          assign(url) {
            Office.context.ui.displayDialogAsync(url, { width: 25, height: 50 }, res => {
              dummy.close = res.value.close;
              res.value.addEventHandler(Office.EventType.DialogMessageReceived, ({ message }) =>
                dummy.location.href = dummy.location.hash = message
              );
            });
          }
        }
      };
      return dummy;
    };

    log('Logging in...');
    await msal.loginPopup({ scopes });
    callApi();
  });

  reloadButton.addEventListener('click', () => window.location.reload());
  callApiButton.addEventListener('click', callApi);
})();
