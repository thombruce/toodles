export default defineAppConfig({
  name: 'Toodles',
  copyright: `Copyright © 2023 - ${new Date().getFullYear()} Thom Bruce`,
  gradient: true,
  directory: {
    extensions: /(?:\.(?:txt|todo|shop|list))$/i,
    exclude: /^\.\w+/i,
    filter: /^(?:(?:todo|done)\.txt|.+?\.(?:todo|shop|list))$/i
  }
})
