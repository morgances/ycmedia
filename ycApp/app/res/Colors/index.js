const dark = {
  background: '#333',
  title: "#ddd",
  subTitle: "#ccc",
  text: "#ddd",
  containerbg: "#666",
  borderColor: '#000',
  primary: '#333',
  listBoxActive: '#aaa',
  textActive: '#fff',
  textInactive: '#ccc'
}

const light = {
  background: "#f2f3f5",
  title: "#333",
  text: "#333",
  subTitle: "#999",
  containerbg: "#fff",
  listBoxActive: "#00b9a2",
  primary: '#00b9a2',
  borderColor: '#f2f3f5',
  textActive: '#fff',
  textInactive: '#333'
}

function isDark(colorScheme) {
  if (colorScheme == "dark") {
    return dark
  }

  return light
}

export default isDark;