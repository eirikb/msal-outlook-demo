import "core-js/stable";
import "regenerator-runtime/runtime";
import 'whatwg-fetch';
import { UserAgentApplication } from 'msal';

const clientId = process.env.CLIENTID;
const scopes = ['User.Read'];
const msal = new UserAgentApplication({
  auth: { clientId },
  cache: { cacheLocation: 'localStorage' }
});

const p = document.querySelector('p');
const loginButton = document.querySelector('#login');
const clearCacheButton = document.querySelector('#clear-cache');

clearCacheButton.addEventListener('click', () => {
  msal.clearCache();
});

function log(text) {
  p.innerText = JSON.stringify(text);
}

async function callApi() {
  log('Call Graph API (get /me)');
  try {
    const { accessToken } = await msal.acquireTokenSilent({ scopes });
    log(accessToken);
    const me = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }).then(res => res.json());
    log(me);
  } catch (e) {
    log(e);
    throw e;
  }
}

log('Waiting for office...');
Office.onReady(() => {
  if (msal.isCallback(window.location.hash)) {
    log('Window is callback (wait)');
    Office.context.ui.messageParent(window.location.hash);
  } else {
    if (msal.getAccount()) {
      callApi();
    } else if (msal.getLoginInProgress()) {
      log('Logging in (login in progress)...',);
    } else {
      loginButton.disabled = false;
      log('Ready. Click button');
    }
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
