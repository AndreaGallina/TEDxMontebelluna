import {Component, OnInit} from '@angular/core';
import {NgxMasonryOptions} from 'ngx-masonry';
import {Lightbox, IAlbum} from 'ngx-lightbox';

const GALLERY_IMAGES_NUMBER = 151;
const IMAGES_PER_PAGE = 25;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true
  };
  public imagesLoaded: IAlbum[] = [];   // Array con le immagini presenti negli assets
  private imagesList: IAlbum[] = [];    // Array con le immagini da mostrare (utilizzato per il paging delle immagini)
  private page = 1;                     // Ultima pagina di immagini caricata dall'utente
  private totalPages = Math.ceil(GALLERY_IMAGES_NUMBER / IMAGES_PER_PAGE);

  constructor(private lightbox: Lightbox) {
  }

  ngOnInit() {
    this.loadGalleryImagesPaths();
  }

  private loadGalleryImagesPaths() {
    for (let i = 1; i <= GALLERY_IMAGES_NUMBER; i++) {
      const galleryImage: IAlbum = {
        src: 'assets/img/gallery/f_' + i + '.jpg',
        thumb: ''
      };
      this.imagesList.push(galleryImage);
    }
  }

  public loadMoreImages(event): void {
    if (this.page >= this.totalPages || (event && !event.visible)) {
      return;
    }

    const newImages = this.imagesList.slice((this.page - 1) * IMAGES_PER_PAGE, this.page * IMAGES_PER_PAGE);
    this.imagesLoaded = this.imagesLoaded.concat(newImages);

    this.page++;
  }

  openImageInLightbox(index: number) {
    this.lightbox.open(this.imagesList, index, { centerVertically: true, disableScrolling: true });
  }
}
