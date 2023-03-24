export const OPEN_VIEW = 'OPEN_VIEW'

export function openBook(id: number) {
  return {
    type: OPEN_VIEW,
    payload: { nextView: 'bookinfo', parameters: { id } }
  }
}

export function openView(viewName: string, parameters = {}) {
  return {
    type: OPEN_VIEW,
    payload: { nextView: viewName, parameters }
  }
}
