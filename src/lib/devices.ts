export const isServer = () => typeof window === "undefined";

export const isMobile = () =>
  !isServer() &&
  /Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);

export const isMobileAppAccesible = (deepLink: string) => {
  try {
    // We create a hidden iframe to check if the deep link can be opened
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // If the wallet is installed, this should work
    if (iframe.contentWindow) {
      iframe.contentWindow.location.href = deepLink;
    }

    // Remove the iframe after checking
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);

    return true;
  } catch {
    return false;
  }
};
