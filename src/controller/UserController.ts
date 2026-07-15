import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  async all(_req: Request, _res: Response) {
    return userRepository.find();
  }

  async one(req: Request, res: Response) {
    const user = await userRepository.findOneBy({ id: Number(req.params.id) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    return user;
  }

  async save(req: Request, _res: Response) {
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    return user;
  }

  async remove(req: Request, res: Response) {
    const user = await userRepository.findOneBy({ id: Number(req.params.id) });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await userRepository.remove(user);
    return { message: "User deleted" };
  }
}
