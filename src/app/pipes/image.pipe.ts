import { Pipe, PipeTransform } from '@angular/core';
import { SERVICE_URL } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: string = 'user'): any {

    let url = SERVICE_URL + '/img';

    if (!image ) {
      return url + '/usuarios/xxx';
    }

    if (image.indexOf('https') >= 0) {
      return image;
    }

    switch(type) {
      case 'user':
        url += '/usuarios/' + image;
        break;
      case 'hospitales':
        url += '/hospitales/' + image;
        break;
      case 'medico':
        url += '/medicos/' + image;
        break;
      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
