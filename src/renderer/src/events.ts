export function triggerEvent(event: string) {
  window.electron.ipcRenderer.send(event);
}