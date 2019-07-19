export const register = () => {
  if ("serviceWorker" in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    navigator.serviceWorker.register(swUrl, { scope: "/" }).then(function(reg) {
      if (reg.updated) window.location.reload();
    });
  }
};
