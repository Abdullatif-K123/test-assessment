import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import axios from 'axios';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getGeolocation(
    address: string,
    email?: string,
  ): Promise<{ latitude: number; longitude: number }> {
    // Check if the address already exists in the database
    let existingAddress = await this.addressRepository.findOne({
      where: { address },
    });
    console.log(existingAddress);
    if (!existingAddress) {
      // If not, fetch geolocation from an external API (e.g., OpenCage)
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.OPENCAGE_API_KEY}`,
      );

      if (response.data.results.length > 0) {
        console.log(response.data.results[0].geometry);
        const { lat, lng } = response.data.results[0].geometry;

        // Save to database
        existingAddress = this.addressRepository.create({
          address,
          latitude: lat,
          longitude: lng,
          email,
        });
        await this.addressRepository.save(existingAddress);
      } else {
        throw new Error('Address not found');
      }
    }

    return {
      latitude: existingAddress.latitude,
      longitude: existingAddress.longitude,
    };
  }
}
