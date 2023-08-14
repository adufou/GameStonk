import { Controller } from '@nestjs/common';
import { BlueprintsService } from '@/blueprints/blueprints.service';

@Controller('blueprints')
export class BlueprintsController {
    constructor(private readonly blueprintsService: BlueprintsService) {}

    // @Post()
    //   create(@Body() createBlueprintDto: CreateBlueprintDto) {
    //       return this.blueprintsService.create(createBlueprintDto);
    //   }
    //
    // @Get()
    // findAll() {
    //     return this.blueprintsService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.blueprintsService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateBlueprintDto: UpdateBlueprintDto) {
    //     return this.blueprintsService.update(+id, updateBlueprintDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.blueprintsService.remove(+id);
    // }
}
