import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose'
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud'

// 定义一个数据传输对象，创建好这个类之后，用它来约束body，ts都要跟type类型
class createPostDto {
  @ApiModelProperty({ description: '标题', example: '标题1' })
  // 字段验证
  @IsNotEmpty({ message: '请填写标题' })
  title: string
  @ApiModelProperty({ description: '内容', example: '内容1' })
  content: string
}

@Crud({
  model: PostSchema,
  routes:{
    // find对应博客列表接口
    find:{
      decorators:[
        ApiOperation({title:'博客列表'})
      ]
    },
    create:{
      dto:createPostDto
    },
  }
})

// 资源前缀/posts
@Controller('posts')
@ApiUseTags('帖子')
export class PostsController {
  // InjectModel表示注入模型类，private限定了这个注入类只能在PostsController使用
  //换了crud接口readonly后面跟的是通用模型名model
  constructor(@InjectModel(PostSchema) private readonly model: ModelType<PostSchema>) { }
  
  
  // 然后用了通用接口下面的都注释调
  // // 表示用get方法到根目录
  // @Get()
  // @ApiOperation({ title: '显示博客列表' })
  // async index() {
  //   return await this.PostModel.find()
  // }

  // @Post()
  // @ApiOperation({ title: '创建博客' })
  // // 表示取到的body的数据必须是符合createPostDto传输对象的值
  // async create(@Body() createPostDto: createPostDto) {
  //   //也可以像express中req，res，但是没必要。直接用装饰器
  //   //装饰器是能用来取数据，不能单独用，必须要再跟一个变量，表示把数据给谁
  //   await this.PostModel.create(createPostDto)
  //   return {
  //     success: true
  //   }
  // }

  // @Put(':id')
  // @ApiOperation({ title: '编辑博客' })
  // async update(@Param('id') id: string, @Body() updatePostDto: createPostDto) {
  //   await this.PostModel.findByIdAndUpdate(id, updatePostDto)
  //   return
  // }

  // @Get(':id')
  // @ApiOperation({ title: '博客详情' })
  // // @Param表示获取所有的url参数
  // async detail(@Param('id') id: string) {
  //   return await this.PostModel.findById(id)
  // }

  // @Delete(':id')
  // @ApiOperation({ title: '博客删除' })
  // async remove(@Param('id') id: string) {
  //   await this.PostModel.findByIdAndDelete(id)
  //   return {
  //     success: true
  //   }
  // }


}
