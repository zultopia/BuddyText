import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaListOl, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import { stepByStepService } from '../services/api';

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
  min-height: 120px;
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
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const TimeEstimate = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const StepsContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StepItem = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -12px;
  left: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
`;

const StepContent = styled.div`
  margin-top: ${props => props.theme.spacing.sm};
`;

const StepDescription = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StepExample = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
  padding-left: ${props => props.theme.spacing.md};
  border-left: 2px solid ${props => props.theme.colors.secondary};
`;

const OriginalInstruction = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.warning};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const OriginalTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const OriginalText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
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

const StepByStepPage = () => {
  const [instruction, setInstruction] = useState('');
  const [context, setContext] = useState('');
  const [userLevel, setUserLevel] = useState('beginner');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!instruction.trim()) {
      setError('Silakan masukkan instruksi yang akan dipecah menjadi langkah-langkah');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await stepByStepService.createGuide({
        instruction: instruction.trim(),
        context: context.trim() || null,
        user_level: userLevel
      });

      setResult(response);
    } catch (err) {
      setError('Terjadi kesalahan saat membuat panduan step-by-step. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>
        <FaListOl style={{ marginRight: '0.5rem', color: '#4F46E5' }} />
        Panduan Step-by-Step
      </PageTitle>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="instruction">Instruksi yang akan dipecah</Label>
            <TextArea
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Masukkan instruksi kompleks yang ingin dipecah menjadi langkah-langkah kecil. Contoh: 'Cara mengisi formulir pendaftaran online' atau 'Prosedur pembayaran tagihan listrik'"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="context">Konteks Tambahan (Opsional)</Label>
            <TextArea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Berikan konteks tambahan jika diperlukan..."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="level">Tingkat Pengalaman</Label>
            <Select
              id="level"
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value)}
            >
              <option value="beginner">Pemula</option>
              <option value="intermediate">Menengah</option>
              <option value="advanced">Lanjutan</option>
            </Select>
          </FormGroup>

          <Button
            type="submit"
            disabled={loading || !instruction.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <FaSpinner className="fa-spin" /> : <FaListOl />}
            {loading ? 'Membuat Panduan...' : 'Buat Panduan'}
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
              <ResultTitle>
                <FaCheckCircle style={{ color: '#10B981' }} />
                Panduan Step-by-Step
              </ResultTitle>
              {result.estimated_time && (
                <TimeEstimate>
                  <FaClock />
                  {result.estimated_time}
                </TimeEstimate>
              )}
            </ResultHeader>

            <OriginalInstruction>
              <OriginalTitle>Instruksi Asli:</OriginalTitle>
              <OriginalText>{result.original_instruction}</OriginalText>
            </OriginalInstruction>

            <StepsContainer>
              {result.steps.map((step, index) => (
                <StepItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StepNumber>{step.step_number}</StepNumber>
                  <StepContent>
                    <StepDescription>{step.description}</StepDescription>
                    {step.example && (
                      <StepExample>{step.example}</StepExample>
                    )}
                  </StepContent>
                </StepItem>
              ))}
            </StepsContainer>
          </ResultContainer>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default StepByStepPage;
