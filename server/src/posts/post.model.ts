import { prop } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger'

export class Post{
  // 加了ApiModelProperty，post就不光是模型，还是Dto,为适配crud接口
  @ApiModelProperty({ description: '标题', example: '标题1' })
  @prop()
  title:string

  @ApiModelProperty({ description: '内容', example: '内容1' })
  @prop()
  content:string
}

