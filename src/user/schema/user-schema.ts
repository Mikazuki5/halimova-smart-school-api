import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  fullname: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ minlength: 6 })
  password: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  religion: string;

  @Prop()
  address: string;

  @Prop()
  department: string;

  @Prop()
  isHeadSchool: boolean;

  @Prop()
  isHeadDepartment: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
