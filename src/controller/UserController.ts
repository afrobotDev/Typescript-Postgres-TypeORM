import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";

export class UserController {
  private get userRepository() {
    return AppDataSource.getRepository(User);
  }

  async all(_req: Request, _res: Response) {
    return this.userRepository.find();
  }

  async one(req: Request, res: Response) {
    const user = await this.userRepository.findOneBy({ id: Number(req.params.id) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    return user;
  }

  async save(req: Request, _res: Response) {
    const user = this.userRepository.create(req.body);
    await this.userRepository.save(user);
    return user;
  }

  async remove(req: Request, res: Response) {
    const user = await this.userRepository.findOneBy({ id: Number(req.params.id) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await this.userRepository.remove(user);
    return { message: "User deleted" };
  }
}
