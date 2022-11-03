import { Request, Response } from "express";
import User from '../models/user.model';


export const getUsers = async(req: Request, res: Response) => {

  const users = await User.findAll({
    where: {state: 1}
  });

  res.json({users})

}

export const getUser = async(req: Request, res: Response) => {
  
  const { id } = req.params;

  const user = await User.findOne({
    where: {id, state: 1}
  })
  
  if(!user){
    return res.status(404).json({
      msg: `user with id ${id} no exist`
    })
  }

  res.json({
    user
  })
  
}

export const postUser = async(req: Request, res: Response) => {

  const { body } = req;

  try {

    const existUser = await User.findOne({
      where: {
        email: body.email
      }
    });

    if(existUser){
      return res.status(400).json({
        msg: `There is already a user with the email: ${body.email}`
      })
    }

    const user = await User.create(body)

    res.status(201).json({
      ok: true,
      user
    })
    
  } catch (e: any ) {
    res.status(500).json({
      msg: 'contact the administrator.',
      error: e.errors[0].message
    })
  }

}

export const putUser = async(req: Request, res: Response) => {

  const { id } = req.params;
  const name = req.body.name;
  const email = req.body.email;

  try {
    const user = await User.findByPk(id);
    if( !user ){
      return res.status(404).json({
        msg: `There is no user with the ID: ${id}`
      })
    }
    
    await user.update({name, email});

    return res.json(user);

  } catch (e: any) {
      return res.status(500).json({
        msg: 'contact the administrator.',
        error: e.errors[0].message
      })
  }

}

export const deleteUser = async (req: Request, res: Response) => {

  const { id } = req.params;

  const user = await User.findByPk(id);
  if(!user){
    return res.status(404).json({
      msg: `There is no user with the ID: ${id}`
    })
  }

  await user.update({ state: false })

  // await user.destroy();

  res.json({
    msg: 'deleted user',
    user
  })

}