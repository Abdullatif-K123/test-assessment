import { Controller, Post, Body } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('api/geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Post()
  async getGeolocation(@Body() body: { address: string; email?: string }) {
    const { address, email } = body;
    const { latitude, longitude } =
      await this.geolocationService.getGeolocation(address, email);
    return { latitude, longitude };
  }
}
