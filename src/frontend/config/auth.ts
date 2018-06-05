import { TokenManager } from "../services/Auth/TokenManager";

export const tokenManager = new TokenManager(localStorage)
