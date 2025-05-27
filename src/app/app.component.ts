import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  isEditing?: boolean;
}

interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Resume';
  isEditingContact = false;
  
  contact = {
    name: 'Your Name',
    title: 'Web Developer',
    email: 'youremail@example.com',
    phone: '(123) 456-7890',
    location: 'City, Country'
  };

  skills: string[] = ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'Git'];
  newSkill = '';

  experiences: Experience[] = [
    {
      title: 'Senior Web Developer',
      company: 'Tech Corp',
      period: '2020 - Present',
      description: 'Led development of multiple web applications using Angular and TypeScript.'
    },
    {
      title: 'Web Developer',
      company: 'Digital Solutions',
      period: '2018 - 2020',
      description: 'Developed responsive web applications and maintained existing projects.'
    }
  ];

  education: Education[] = [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Computer Science',
      period: '2014 - 2018',
      description: 'Focus on Software Engineering and Web Technologies'
    }
  ];

  toggleContactEdit() {
    this.isEditingContact = !this.isEditingContact;
  }

  addSkill() {
    if (this.newSkill.trim() && !this.skills.includes(this.newSkill.trim())) {
      this.skills.push(this.newSkill.trim());
      this.newSkill = '';
    }
  }

  removeSkill(skill: string) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  addExperience() {
    this.experiences.unshift({
      title: 'New Position',
      company: 'Company Name',
      period: 'Start - End',
      description: 'Description of your role',
      isEditing: true
    });
  }

  addEducation() {
    this.education.unshift({
      school: 'School Name',
      degree: 'Degree Name',
      period: 'Start - End',
      description: 'Description of your studies',
      isEditing: true
    });
  }

  toggleEdit(item: Experience | Education) {
    item.isEditing = !item.isEditing;
  }

  deleteExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  deleteEducation(index: number) {
    this.education.splice(index, 1);
  }
}
