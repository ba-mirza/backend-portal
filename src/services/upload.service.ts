import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService extends S3Client {
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private configService: ConfigService) {
    const region = configService.getOrThrow<string>('BUCKET_REGION');

    super({
      region,
      credentials: {
        accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_ID_KEY'),
        secretAccessKey: configService.getOrThrow<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.bucketName = configService.getOrThrow<string>('BUCKET_NAME');
    this.region = configService.getOrThrow<string>('BUCKET_REGION');
  }

  async uploadImageFile(fileName: string, file: Buffer) {
    try {
      await this.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: file,
          ContentType: this.getContentType(fileName),
          ACL: 'public-read',
        }),
      );

      console.log('Successfully uploaded image file');
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload image');
    }
  }

  private getContentType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'jpg':
        return 'image/jpeg';
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
  }
}
