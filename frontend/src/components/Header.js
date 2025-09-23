import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaTextWidth, FaQuestionCircle, FaListOl, FaHeart } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-decoration: none;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
  }
`;

const NavIcon = styled.div`
  font-size: 1rem;
`;

const Tagline = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeartIcon = styled(FaHeart)`
  color: ${props => props.theme.colors.error};
  animation: heartbeat 1.5s ease-in-out infinite;
  
  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Beranda', icon: FaHome },
    { path: '/simplify', label: 'Sederhanakan', icon: FaTextWidth },
    { path: '/tutor', label: 'Tutor', icon: FaQuestionCircle },
    { path: '/steps', label: 'Panduan', icon: FaListOl }
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon>
            <FaTextWidth />
          </LogoIcon>
          BuddyText
        </Logo>
        
        <Nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <NavIcon>
                  <Icon />
                </NavIcon>
                {item.label}
              </NavLink>
            );
          })}
        </Nav>
        
        <Tagline>
          Dibuat dengan <HeartIcon /> untuk aksesibilitas kognitif
        </Tagline>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
