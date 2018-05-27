export function configureDi() {
  glob.sync('src/modules/**/*.ts')
    .filter(file => !file.match('__tests__'))
    .forEach(require)
}
