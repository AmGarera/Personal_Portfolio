
 import { Component } from '@angular/core';



@Component({
  standalone: true,
  imports: [],
  template: `
    <div class="about-section">
      <h1>About Me</h1>
      <p>Hello! I'm a freelance web developer with 7 years of experience, specializing in application development. I have a deep passion for coding and a constant thirst for learning new technologies.</p>
      <p>My expertise lies in Angular, .NET, and Node.JS. I have worked in both the finance and pharma industries, bringing a unique perspective to my projects. I thrive on the challenge of creating efficient, scalable, and user-friendly applications. I'm always on the lookout for new projects and collaborations, so feel free to reach out if you have an idea you'd like to discuss.</p>
    </div>

    <style>
    .about-section {
      padding: 50px;
      text-align: center;
      background-color: #474e5d;
      color: white;
      min-height: 100vh; /* This will make sure your body stretches to the bottom of the page */
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .about-section h1 {
      font-size: 30px;
      color: #fff;
    }

    .about-section p {
      font-size: 14px;
      color: #fff;
      margin: 20px 0;
    }
    </style>
  `,
})
export default class AboutPage {
}
