export type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type WithoutId<T extends { id: string }> = Without<T, 'id'>
