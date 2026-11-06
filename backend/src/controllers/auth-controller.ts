import { container } from "@/container";
import { AuthController as PresentationAuthController } from "@/presentation/controllers/auth-controller";

const instance = new PresentationAuthController(container.authService);

export class AuthController {
  static register = instance.register.bind(instance);
  static login = instance.login.bind(instance);
  static me = instance.me.bind(instance);
}

