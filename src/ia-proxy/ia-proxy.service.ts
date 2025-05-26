import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostprocessProxyService } from '../postprocess-proxy/postprocess-proxy.service';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class IaProxyService {
  private readonly queueServiceUrl = process.env.GATEWAY_QUEUE_SERVICE;
  private readonly iaServiceUrl = process.env.GATEWAY_IA_SERVICE;
  
  constructor(private readonly postprocessProxy: PostprocessProxyService) {}

  async predict(
    files: Express.Multer.File[],
    authHeader: string,
  ): Promise<any> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const fileIds: string[] = [];
    for (const file of files) {
      const res = await this.postprocessProxy.uploadFile({
        name: file.originalname,
      });
      fileIds.push(res.file_id.toString());
      console.log(`Uploaded ${file.originalname} => id ${res.file_id}`);
    }

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = fileIds[i];

      form.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      form.append('fileId', id);
    }

    const headers = form.getHeaders();

    try {
      const response = await axios.post(
        `${this.queueServiceUrl}/enqueue`,
        form,
        { headers },
      );
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data || err.message;
      throw new InternalServerErrorException(
        `Queue service error: ${JSON.stringify(msg)}`,
      );
    }
  }

  async semanticSearch(query: string): Promise<any[]> {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Query parameter is required');
    }

    try {
      const response = await axios.post(
        `${this.iaServiceUrl}/semantic-search/search`,
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data || err.message;
      const status = err.response?.status;
      
      if (status === 400) {
        throw new BadRequestException(`IA service error: ${JSON.stringify(msg)}`);
      }
      
      throw new InternalServerErrorException(
        `IA service error: ${JSON.stringify(msg)}`,
      );
    }
  }
}
