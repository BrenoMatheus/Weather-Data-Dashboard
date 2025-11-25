import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedException("Missing API Key");
    }

    if (apiKey !== process.env.INTERNAL_API_KEY) {
      throw new UnauthorizedException("Invalid API Key");
    }

    return true;
  }
}
