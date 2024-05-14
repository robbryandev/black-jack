export type EventList = "ping"

export function triggerEvent(event: EventList) {
  window.electron.ipcRenderer.send(event);
}