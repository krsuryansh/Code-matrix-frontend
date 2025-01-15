import React from 'react';
import './FeatureSection.css'; 
import feature1Img from '../Feature_img/feature1Img.png'; 
import feature2Img from '../Feature_img/feature2Img.png';
import feature3Img from '../Feature_img/feature3Img.png';
import feature4Img from '../Feature_img/feature4Img.png';
import feature5Img from '../Feature_img/feature5Img.png';
import feature6Img from '../Feature_img/feature6Img.png';

const FeatureSection = () => {
  const features = [
    {
      image: feature1Img,
      title: "Real-Time Collaboration",
      description: "Work together on coding projects seamlessly in real-time with team members across the globe.",
    },
    {
      image: feature2Img,
      title: "Project Management",
      description: "Organize your tasks, track progress, and manage your team efficiently with our tools.",
    },
    {
      image: feature3Img,
      title: "Interactive Challenges",
      description: "Engage in coding challenges to sharpen your skills and compete with peers.",
    },
    {
      image: feature4Img,
      title: "Community Support",
      description: "Join a community of developers to seek guidance, share knowledge, and grow together.",
    },
    {
      image: feature5Img,
      title: "Version Control Integration",
      description: "Integrate with Git for smooth version control and collaborative development.",
    },
    {
      image: feature6Img,
      title: "Secure Environment",
      description: "Enjoy a secure coding and collaboration platform, safeguarding your projects and data.",
    },
  ];

  return (
    <section className="feature-section">
      <div className="feature-header">
        <h2 className="feature-title">Our Features</h2>
        <p className="feature-description">
          Explore how Code Matrix empowers developers to collaborate, learn, and build together.
        </p>
      </div>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.image}  className="feature-icon" />
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;