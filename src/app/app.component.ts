import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

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

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
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
  isEditingSocial = false;
  qrCodeDataUrl: string = '';
  showQRCode = false;
  
  contact = {
    name: 'Your Name',
    title: 'Web Developer',
    email: 'youremail@example.com',
    phone: '(123) 456-7890',
    location: 'City, Country'
  };

  socialLinks: SocialLink[] = [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: 'fa-linkedin'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'fa-github'
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/yourhandle',
      icon: 'fa-twitter'
    }
  ];

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

  constructor() {
    this.generateQRCode();
  }

  async generateQRCode() {
    try {
      const qrData = {
        name: this.contact.name,
        title: this.contact.title,
        email: this.contact.email,
        phone: this.contact.phone,
        location: this.contact.location,
        social: this.socialLinks.map(link => ({
          platform: link.platform,
          url: link.url
        }))
      };
      
      this.qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  }

  toggleContactEdit() {
    this.isEditingContact = !this.isEditingContact;
  }

  toggleSocialEdit() {
    this.isEditingSocial = !this.isEditingSocial;
    if (!this.isEditingSocial) {
      this.generateQRCode();
    }
  }

  toggleQRCode() {
    this.showQRCode = !this.showQRCode;
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

  addSocialLink() {
    this.socialLinks.push({
      platform: 'New Platform',
      url: 'https://',
      icon: 'fa-link',
      isEditing: true
    });
  }

  deleteSocialLink(index: number) {
    this.socialLinks.splice(index, 1);
    this.generateQRCode();
  }

  async downloadPDF() {
    // Get the resume container element
    const element = document.querySelector('.resume-container') as HTMLElement;
    if (!element) return;

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false
    });

    // Calculate dimensions to maintain aspect ratio
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

    // Download the PDF
    pdf.save('resume.pdf');
  }
}
