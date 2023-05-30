import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  /* config slider */
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    vertical: true,
    dots: false,
  };
  posts: any[] = [
    {
      image:
        'https://staticg.sportskeeda.com/editor/2022/02/acf7d-16444269659011-1920.jpg',
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title: 'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập',
    },
    {
      image:
        'https://staticg.sportskeeda.com/editor/2022/02/acf7d-16444269659011-1920.jpg',
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title:
        'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập Hướng dẫn setup phòng cực chill dành cho người mới toàn tập',
    },
    {
      image:
        'https://staticg.sportskeeda.com/editor/2022/02/acf7d-16444269659011-1920.jpg',
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title: 'Hướng dẫn setup phòng cực chill dành cho người mới toàn tập',
    },
    {
      image:
        'https://staticg.sportskeeda.com/editor/2022/02/acf7d-16444269659011-1920.jpg',
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title: 'Hướng dẫn setup',
    },
    {
      image:
        'https://staticg.sportskeeda.com/editor/2022/02/acf7d-16444269659011-1920.jpg',
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title: 'Hướng dẫn setup',
    },
    {
      image:
        'https://staticg.sportskeeda.com/editor/2022/02/acf7d-16444269659011-1920.jpg',
      category: 'Kiến thức',
      date: 'Mar 23',
      author: 'Andiez Le',
      title: 'Hướng dẫn setup',
    },
  ];
}
