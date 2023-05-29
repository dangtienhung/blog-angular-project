import { Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent {
  featureLists: any[] = [
    {
      id: 1,
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title: 'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập',
    },
    {
      id: 2,
      category: 'Kiến thức 1',
      date: 'Mar 23 2',
      author: 'Andiez Le Hưng',
      title:
        'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập ahihi',
    },
    {
      id: 3,
      category: 'Kiến thức 1',
      date: 'Mar 23 2',
      author: 'Andiez Le Hưng',
      title:
        'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập ahihi',
    },
    {
      id: 4,
      category: 'Kiến thức 1',
      date: 'Mar 23 2',
      author: 'Andiez Le Hưng',
      title:
        'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập ahihi',
    },
  ];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
}
