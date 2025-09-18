// Exporta todos os serviços de forma centralizada
export { AuthService } from "./auth-service"
export { UserService } from "./user-service"
export { StoreService } from "./store-service"

// Re-exporta tipos importantes
export type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/api"
export type { UserProfile, UpdateProfileRequest } from "./user-service"
export type { Store, Product, CreateProductRequest, UpdateStoreRequest } from "./store-service"
