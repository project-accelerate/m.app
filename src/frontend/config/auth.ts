import { TokenManager } from "../services/Auth/TokenManager";

const storage = (typeof localStorage === "undefined") ? null : localStorage

export const tokenManager = new TokenManager({
  getItem: (key) => storage && storage.getItem(key) || null,
  setItem: (key, value) => storage && storage.setItem(key, value),
  removeItem: (key) => storage && storage.removeItem(key)
})
