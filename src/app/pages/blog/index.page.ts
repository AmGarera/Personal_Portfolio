import { Component } from '@angular/core';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../../post-attributes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 style="text-align: center;">Blog Archive</h1>
    @for (post of posts;track post.attributes.slug) {
    <a [routerLink]="['/blog/', post.attributes.slug]" style="text-align: center;">
      <h2 class="post__title">{{ post.attributes.title }}</h2>
      <p class="post__desc">{{ post.attributes.description }}</p>
    </a>
    }
  `,
  styles: [
    `
      a {
        display: block;
        margin-bottom: 2rem;
      }

      .post__title,
      .post__desc {
        margin: 0;
        text-align: center;
      }
    `,
  ],
})
export default class HomeComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
