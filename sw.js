// DIRECT PWA PROMPT ONLY (စာတန်းလုံးဝ မပြစေရန်)
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const banner = document.getElementById('directHomeInstallBanner');
      if (banner) banner.classList.remove('hidden');
    });

    async function executeDirectHomeInstall() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          dismissHomeBanner();
        }
        deferredPrompt = null;
      }
    }

    function dismissHomeBanner() {
      const banner = document.getElementById('directHomeInstallBanner');
      if (banner) banner.classList.add('hidden');
    }
