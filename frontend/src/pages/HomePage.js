import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTextWidth, FaQuestionCircle, FaListOl, FaArrowRight, FaUsers, FaBrain, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  padding: ${props => props.theme.spacing.xxl} 0;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FeaturesSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: white;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.xxl} 0;
  border-radius: ${props => props.theme.borderRadius.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const StatItem = styled(motion.div)`
  & h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  & p {
    font-size: 1.125rem;
    opacity: 0.9;
  }
`;

const AboutSection = styled.section`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AboutText = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HomePage = () => {
  const features = [
    {
      icon: FaTextWidth,
      title: 'Sederhanakan Teks',
      description: 'Ubah artikel kompleks menjadi bahasa yang mudah dipahami dengan AI yang cerdas.',
      link: '/simplify',
      linkText: 'Coba Sekarang'
    },
    {
      icon: FaListOl,
      title: 'Panduan Step-by-Step',
      description: 'Dapatkan instruksi yang dipecah menjadi langkah-langkah kecil yang mudah diikuti.',
      link: '/steps',
      linkText: 'Lihat Panduan'
    },
    {
      icon: FaQuestionCircle,
      title: 'Tutor AI',
      description: 'Tanyakan apapun dan dapatkan penjelasan sederhana dengan contoh yang mudah dipahami.',
      link: '/tutor',
      linkText: 'Mulai Bertanya'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Teks Disederhanakan' },
    { number: '500+', label: 'Pengguna Terbantu' },
    { number: '95%', label: 'Tingkat Kepuasan' },
    { number: '24/7', label: 'Tersedia Selalu' }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI Tutor untuk{' '}
          <span style={{ color: '#4F46E5' }}>Aksesibilitas Kognitif</span>
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Membantu orang dengan disabilitas kognitif memahami teks kompleks 
          dengan menyederhanakan, merangkum, dan memberikan penjelasan step-by-step.
        </HeroSubtitle>
        
        <CTAButton
          to="/simplify"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mulai Sekarang <FaArrowRight />
        </CTAButton>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Fitur Utama</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <FeatureIcon>
                  <Icon />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <FeatureLink to={feature.link}>
                  {feature.linkText} <FaArrowRight />
                </FeatureLink>
              </FeatureCard>
            );
          })}
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </StatItem>
          ))}
        </StatsGrid>
      </StatsSection>

      <AboutSection>
        <AboutTitle>Tentang BuddyText</AboutTitle>
        <AboutText>
          BuddyText adalah AI tutor yang dirancang khusus untuk membantu orang dengan 
          disabilitas kognitif seperti disleksia, autism spectrum, atau kesulitan belajar. 
          Kami menggunakan teknologi LLaMA untuk menyederhanakan teks kompleks menjadi 
          bahasa yang mudah dipahami.
        </AboutText>
        <AboutText>
          Dengan fitur text simplification, step-by-step guidance, dan conversational tutor, 
          kami berkomitmen untuk membuat informasi lebih mudah diakses oleh semua orang.
        </AboutText>
      </AboutSection>
    </HomeContainer>
  );
};

export default HomePage;
