declare global {
  interface GlobalWindow extends Window {
    [propsName: string]: any
  }
}

export {}