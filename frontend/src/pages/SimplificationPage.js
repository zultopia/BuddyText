import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTextWidth, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaCopy, FaVolumeUp } from 'react-icons/fa';
import { simplificationService } from '../services/api';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} 0;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
`;

const CheckboxLabel = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ResultContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ResultContent = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultText = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled(motion.div)`
  background: ${props => props.theme.colors.error};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
`;

const SimplificationPage = () => {
  const [text, setText] = useState('');
  const [targetLevel, setTargetLevel] = useState('simple');
  const [includeExamples, setIncludeExamples] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Silakan masukkan teks yang akan disederhanakan');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await simplificationService.simplifyText({
        text: text.trim(),
        target_level: targetLevel,
        include_examples: includeExamples
      });

      setResult(response);
    } catch (err) {
      setError('Terjadi kesalahan saat menyederhanakan teks. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <PageContainer>
      <PageTitle>
        <FaTextWidth style={{ marginRight: '0.5rem', color: '#4F46E5' }} />
        Sederhanakan Teks
      </PageTitle>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="text">Teks yang akan disederhanakan</Label>
            <TextArea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan teks kompleks yang ingin Anda sederhanakan. Contoh: 'Pemerintah mengeluarkan peraturan mengenai subsidi energi yang berlaku mulai triwulan kedua.'"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="level">Tingkat Kesederhanaan</Label>
            <Select
              id="level"
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
            >
              <option value="simple">Sangat Sederhana</option>
              <option value="intermediate">Sedang</option>
              <option value="advanced">Lanjutan</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="examples"
                checked={includeExamples}
                onChange={(e) => setIncludeExamples(e.target.checked)}
              />
              <CheckboxLabel htmlFor="examples">
                Sertakan contoh penjelasan
              </CheckboxLabel>
            </CheckboxContainer>
          </FormGroup>

          <Button
            type="submit"
            disabled={loading || !text.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <FaSpinner className="fa-spin" /> : <FaTextWidth />}
            {loading ? 'Menyederhanakan...' : 'Sederhanakan Teks'}
          </Button>
        </form>
      </FormContainer>

      <AnimatePresence>
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FaExclamationTriangle />
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: '#4F46E5' }} />
          </LoadingSpinner>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <ResultContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ResultHeader>
              <FaCheckCircle style={{ color: '#10B981' }} />
              <ResultTitle>Hasil Penyederhanaan</ResultTitle>
            </ResultHeader>

            <ResultContent>
              <ResultText>{result.simplified_text}</ResultText>
            </ResultContent>

            <StatsGrid>
              <StatCard>
                <StatValue>{result.word_count_reduction}</StatValue>
                <StatLabel>Kata Berkurang</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{result.processing_time.toFixed(2)}s</StatValue>
                <StatLabel>Waktu Proses</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{result.simplification_level}</StatValue>
                <StatLabel>Tingkat Kesederhanaan</StatLabel>
              </StatCard>
            </StatsGrid>

            <ActionButtons>
              <ActionButton
                onClick={() => copyToClipboard(result.simplified_text)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCopy />
                Salin Teks
              </ActionButton>
              <ActionButton
                onClick={() => speakText(result.simplified_text)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaVolumeUp />
                Dengarkan
              </ActionButton>
            </ActionButtons>
          </ResultContainer>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default SimplificationPage;
